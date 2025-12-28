"use client";
import { useState } from "react";
import { updateOrderAddress } from "@/actions/server/Order";
import Swal from "sweetalert2";

const EditAddressModal = ({ orderId, address: defaultAddress }) => {
  const [open, setOpen] = useState(false);
  const [address, setAddress] = useState(defaultAddress);
  const [loading, setLoading] = useState(false);

  const handleUpdate = async () => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to update your delivery address?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Update",
    });

    if (!confirm.isConfirmed) return;

    setLoading(true);

    const res = await updateOrderAddress({
      orderId,
      address,
    });

    setLoading(false);

    if (res?.success) {
      await Swal.fire({
        title: "Updated!",
        text: "Address Updated Successfully ✔️",
        icon: "success",
      });

      window.location.reload();
    } else {
      Swal.fire({
        title: "Failed!",
        text: "Something went wrong",
        icon: "error",
      });
    }
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="bg-primary text-white px-3 py-1 rounded mt-2"
      >
        Edit Address
      </button>

      {open && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg w-[400px]">
            <h2 className="text-xl font-bold mb-3">
              Edit Delivery Address
            </h2>

            <textarea
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              rows={4}
              className="w-full border p-2 rounded"
            />

            <div className="flex justify-end gap-3 mt-4">
              <button
                onClick={() => setOpen(false)}
                className="px-3 py-1 border rounded"
              >
                Cancel
              </button>

              <button
                onClick={handleUpdate}
                disabled={loading}
                className="bg-primary text-white px-4 py-1 rounded"
              >
                {loading ? "Updating..." : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EditAddressModal;
