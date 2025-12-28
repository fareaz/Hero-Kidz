"use server";

import { getServerSession } from "next-auth";
import { clearCart, getCart } from "./cart";
import { sendEmail } from "@/lib/sendEmail";
import { orderInvoiceTemplate } from "@/lib/orderInvoice";
import { ObjectId } from "mongodb";
import { adminOrderNotificationTemplate } from "@/lib/AdminInvoice";
import { collections, dbConnect } from "@/lib/dbConnect";
import { authOptions } from "@/lib/authOptions";

const orderCollection = dbConnect(collections.ORDER);

// 🔥 PRODUCT STOCK UPDATE FUNCTION
const updateProductStock = async (cart) => {
  const productCollection = dbConnect(collections.PRODUCTS);

  const operations = cart.map((item) => ({
    updateOne: {
      filter: { _id: new ObjectId(item.productId) },
      update: {
        $inc: {
          sold: item.quantity         // sold বাড়বে
        }
      }
    }
  }));

  if (operations.length > 0) {
    await productCollection.bulkWrite(operations);
  }
};


export const createOrder = async (payload) => {
  const { user } = (await getServerSession(authOptions)) || {};
  if (!user) return { success: false };

  const cart = await getCart();
  if (cart.length === 0) {
    return { success: false };
  }

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const newOrder = {
    createdAt: new Date().toISOString(),
    items: cart,
    ...payload,
    totalPrice,
  };

  const result = await orderCollection.insertOne(newOrder);

  if (Boolean(result.insertedId)) {

    // 🔥 ORDER হলে PRODUCT STOCK UPDATE হবে
    await updateProductStock(cart);

    await clearCart();
  }

  // ----------- CUSTOMER EMAIL -----------
  await sendEmail({
    to: user.email,
    subject: "🎉Your Order Invoice - Hero Kidz",
    html: orderInvoiceTemplate({
      orderId: result.insertedId.toString(),
      items: cart,
      totalPrice,
    }),
  });

  // ----------- ADMIN EMAIL -----------
  await sendEmail({
    to: "fareazuddin22@gmail.com",
    subject: "Congrates🔥. New Sell from Hero Kidz",
    html: adminOrderNotificationTemplate({
      orderId: result.insertedId.toString(),
      items: cart,
      totalPrice,
      address: payload.address,
      contact: payload.contact,
      name: user.name,
      email: user.email,
      instruction: payload?.instruction || "",
    }),
  });

  return {
    success: result.insertedId,
  };
};

export const getOrder = async () => {
     const { user } = (await getServerSession(authOptions)) || {};
  if (!user) return { success: false };
    const query = { email: user?.email };
    const orders = await orderCollection.find(query).sort({ createdAt: -1 }).toArray()
    return orders;
  
};
export const updateOrderAddress = async ({ orderId, address }) => {
  const { user } = (await getServerSession(authOptions)) || {};
  if (!user?.email) return { success: false, message: "Unauthorized" };

  const result = await orderCollection.updateOne(
    {
      _id: new ObjectId(orderId),
      email: user.email,   
    },
    {
      $set: { address },
    }
  );

  return {
    success: result.modifiedCount > 0,
  };
};