import React, { useState, useEffect } from 'react';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import axios from "axios";

function Order() {
  const [address, setaAddress] = useState([]);
  const [cartData, setCartData] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);

  const totalPrice = cartData.reduce((acc, cur) => acc + (cur.quantity * cur.productId.price), 0);
  const deliveryFee = 0;

  const handleClick = async () => {
    let products = cartData.map((ele) => {
      return { quantity: ele.quantity, product: ele.productId._id, price: ele.productId.price };
    });

    let shippingAddreess = address.filter((ele) => ele._id == selectedAddress);
    if (shippingAddreess.length === 0) {
      alert("Please select a shipping address");
      return;
    }

    try {
      let response = await axios.post(
        "http://localhost:8080/order/place-order",
        {
          orderItems: products,
          shippingAddress: shippingAddreess[0],
          totalAmount: totalPrice,
        },
        {
          withCredentials: true,
        }
      );

      if (response.status === 201) {
        console.log(response.data.message);
        alert("Order placed successfully");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response = await axios.get("http://localhost:8080/product/cart", {
          withCredentials: true,
        });

        if (response.status === 200) {
          setCartData(response.data.message.cart);
          setaAddress(response.data.message.address);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex flex-col md:flex-row gap-4 p-4 max-w-4xl mx-auto">
      {/* Address Section */}
      <div className="w-full md:w-1/2 p-4 border rounded-lg overflow-auto max-h-64">
        <h2 className="text-lg font-semibold mb-2">Select Address</h2>
        <div className="space-y-2">
          {address.map((addr) => (
            <div
              key={addr._id}
              className={`p-2 border rounded-lg cursor-pointer ${selectedAddress === addr._id ? 'border-blue-500 bg-amber-50' : 'border-gray-300'}`}
              onClick={() => setSelectedAddress(addr._id)}
            >
              <p className="font-semibold">{addr.city}</p>
              <p className="text-sm">{addr.address}, {addr.pincode}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Cart Section */}
      <div className="w-full md:w-1/2 p-4 border rounded-lg">
        <h2 className="text-lg font-semibold mb-2">Your Cart</h2>
        <div className="overflow-auto max-h-64 space-y-2">
          {cartData.map((item) => (
            <div key={item.id} className="p-2 border-b flex justify-between">
              <span>{item.name} (x{item.quantity})</span>
              <span>₹{item.productId.price * item.quantity}</span>
            </div>
          ))}
        </div>
        <div className="mt-4">
          <p className="font-semibold">Total: ₹{totalPrice}</p>
          <p className="text-sm text-gray-600">Delivery Fee: ₹{deliveryFee}</p>
          <p className="font-semibold mt-2">Grand Total: ₹{totalPrice + deliveryFee}</p>
        </div>

        <button
          disabled={!selectedAddress}
          onClick={handleClick}
          className={`w-full text-white p-2 rounded-lg mt-4 
          ${!selectedAddress ? 'bg-blue-300 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'}`}
        >
          Cash on Delivery
        </button>

        {/* PayPal Section */}
        <PayPalScriptProvider options={{ "client-id": import.meta.env.VITE_PAYPAL_CLIENT_ID }}>
          <div className="mt-4">
            <PayPalButtons
              style={{ layout: "vertical" }}
              disabled={!selectedAddress}
              createOrder={(data, actions) => {
                return actions.order.create({
                  purchase_units: [{ amount: { value: totalPrice.toFixed(2) } }],
                });
              }}
              onApprove={async (data, actions) => {
                return actions.order.capture().then(async (details) => {
                  alert(`Transaction completed by ${details.payer.name.given_name}`);
                  await handleClick();
                });
              }}
            />
          </div>
        </PayPalScriptProvider>
      </div>
    </div>
  );
}

export default Order;
