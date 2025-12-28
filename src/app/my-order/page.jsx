import { getOrder } from '@/actions/server/Order';
import EditAddressModal from '@/components/home/EditAddressModal';
import React from 'react';

const MyOrder = async () => {
  const orders = await getOrder();

  return (
  <div className="py-10">
    <h2 className="text-3xl md:text-4xl py-4 font-bold border-l-8 border-primary pl-6 md:pl-8">
      My Orders
    </h2>

    {!orders?.length && (
      <p className="text-gray-500 mt-4">You have no orders yet.</p>
    )}

    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mt-8">
      {orders?.map((order) => (
        <div
          key={order._id}
          className="border p-6 rounded-xl shadow-sm hover:shadow-lg transition bg-white"
        >
          {/* Header */}
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-500">
                Order Placed
              </p>
              <p className="text-[15px] font-medium">
                {new Date(order.createdAt).toLocaleString()}
              </p>
            </div>

            <span className="px-3 py-1 text-sm bg-primary text-white rounded-full">
              ORDER
            </span>
          </div>

          {/* Order ID */}
          <div className="mt-3">
            <p className="text-sm text-gray-600">
              Order ID:
            </p>
            <p className="font-semibold text-primary break-all">
              {order._id.toString()}
            </p>
          </div>

          {/* Customer Info */}
          <div className="mt-4 space-y-1 text-[15px]">
            <p><strong>Name:</strong> {order.name}</p>
            <p><strong>Email:</strong> {order.email}</p>
            <p><strong>Contact:</strong> {order.contact}</p>

            <div className="flex gap-2 items-center flex-wrap">
              <p className="flex-1">
                <strong>Address:</strong> {order.address}
              </p>

              <EditAddressModal
                orderId={order._id.toString()}
                address={order.address}
              />
            </div>

            {order?.instruction && (
              <p>
                <strong>Instruction:</strong> {order.instruction}
              </p>
            )}
          </div>

          {/* Price */}
          <p className="text-xl font-bold mt-4">
            Total: <span className="text-primary">{order.totalPrice}৳</span>
          </p>

          {/* Items */}
          <div className="mt-4">
            <h4 className="font-semibold">Ordered Products</h4>

            <div className="mt-2 space-y-1 text-[15px]">
              {order.items?.map((i, idx) => (
                <div
                  key={idx}
                  className="flex justify-between border-b py-1"
                >
                  <span>{i.title}</span>
                  <span className="font-medium">
                    {i.quantity}x — {i.price}৳
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>
      ))}
    </div>
  </div>
);
};
export default MyOrder;
