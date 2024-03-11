import React, { useState } from "react";
import { Button, Modal, Space } from "antd";
import "./AdPurchase.css"; // Import custom CSS file for styling
const AdPurchase = () => {
  const [open, setOpen] = useState(false);

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = () => {
    setOpen(false); // Close the modal
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <>
      <Space>
        <Button
          onClick={showModal}
          className="rounded my-auto px-10 font-semibold text-white py-2 pb-8 
          no-hover border  2xl:py-4 2xl:pb-12 2xl:text-xl 2xl:w-[14rem]" // Add "no-hover" class to remove hover effect
        >
          Pre-Book
        </Button>
      </Space>
      <Modal
        open={open}
        title="Title"
        onOk={handleOk}
        onCancel={handleCancel}
        footer={(_, { OkBtn, CancelBtn }) => (
          <>
            <Button
              onClick={handleOk}
              className="rounded bg-black my-auto px-10 font-semibold text-white py-1 pb-3 
              rounded no-hover" // Add "no-hover" class to remove hover effect
            >
              Pre-Book
            </Button>
            <CancelBtn />
          </>
        )}
      >
        <div className="font-bold">
          <form className="space-y-6">
            <div className="">
              <label
                htmlFor="teamName"
                className="block font-medium text-black"
              >
                Name
              </label>
              <input
                type="text"
                id="teamName"
                name="teamName"
                placeholder="Enter your Name "
                className=" w-full rounded border border-black px-3 py-2 focus:outline-none"
              />
            </div>
            <div>
              <label
                htmlFor="teamName"
                className="block font-medium text-black"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your Email "
                className=" w-full rounded border border-black px-3 py-2 focus:outline-none"
              />
            </div>
            <div>
              <label htmlFor="Phone" className="block font-medium text-black">
                Phone number
              </label>
              <input
                type="text"
                id="teamName"
                name="teamName"
                placeholder="Enter your Phone Number  "
                className=" w-full rounded border border-black px-3 py-2 focus:outline-none"
              />
            </div>
            <div>
              <label
                htmlFor="teamName"
                className="block font-medium text-black"
              >
                Quantity
              </label>
              <input
                type="number"
                id="quantity"
                name="quantity"
                placeholder="Enter Quantity "
                className=" w-full 
                rounded border border-black px-3 py-2 focus:outline-none"
              />
            </div>
            <div>
              <label
                htmlFor="teamName"
                className="block font-medium text-black"
              >
                Address
              </label>
              <input
                type="add"
                id="add"
                placeholder="Enter your Address"
                name="add"
                className=" w-full rounded border border-black px-3 py-2 focus:outline-none"
              />
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
};

export default AdPurchase;
