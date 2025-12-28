import { getCart } from "@/actions/server/cart";
import { TbHorseToy } from "react-icons/tb";
import React from "react";
import { fontBangla } from "../layout";
import Link from "next/link";
import Cart from "@/components/home/Cart";

const CartPage = async () => {
  const cartItems = await getCart();
  const formattedItems = cartItems.map((item) => ({
    ...item,
    _id: item._id.toString(),
  }));

  return (
    <div>
      {/* title  */}
      <div className="flex justify-between items-center">
        <h2 className="text-4xl py-4 font-bold border-l-8 border-primary pl-8">
          My Cart
        </h2>
         <Link
          href={"my-order"}
          className="btn btn-primary btn-outline mt-4 mr-2 "
        >
          My Orders
        </Link>
      </div>
      {cartItems.length == 0 ? (
        <>
          <div className="text-center py-20 space-y-5">
            <h2 className={`${fontBangla.className} text-4xl font-bold`}>
              আপনি কার্টে কোন প্রোডাক্ট এড করেন নি
            </h2>
            <Link
              href={"/products"}
              className="btn btn-primary btn-lg btn-wide"
            >
              <TbHorseToy></TbHorseToy> পন্য দেখুন
            </Link>
          </div>
        </>
      ) : (
       
        <Cart cartItem={formattedItems}></Cart>
      )}
    </div>
  );
};

export default CartPage;