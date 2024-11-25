import React, { useState } from "react";
import { FaCcVisa, FaCcMastercard, FaCcAmex, FaCcDiscover } from "react-icons/fa";
import { SiPhonepe, SiGooglepay } from "react-icons/si";
import { BsCreditCard2FrontFill } from "react-icons/bs";

const PaymentForm = () => {
  const [cardNumber, setCardNumber] = useState("");
  const [cardHolder, setCardHolder] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [paymentMode, setPaymentMode] = useState("card");

  const detectCardType = (number) => {
    if (/^4/.test(number)) return <FaCcVisa className="text-blue-600 text-3xl" />;
    if (/^5[1-5]/.test(number)) return <FaCcMastercard className="text-orange-500 text-3xl" />;
    if (/^3[47]/.test(number)) return <FaCcAmex className="text-green-500 text-3xl" />;
    if (/^6/.test(number)) return <FaCcDiscover className="text-red-500 text-3xl" />;
    return <BsCreditCard2FrontFill className="text-gray-500 text-3xl" />;
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Online Payment</h2>

      {/* Payment Mode Selection */}
      <div className="mb-6 flex justify-between items-center">
        <button
          className={`px-4 py-2 rounded-lg shadow ${
            paymentMode === "card" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-600"
          }`}
          onClick={() => setPaymentMode("card")}
        >
          Card
        </button>
        <button
          className={`px-4 py-2 rounded-lg shadow ${
            paymentMode === "upi" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-600"
          }`}
          onClick={() => setPaymentMode("upi")}
        >
          UPI
        </button>
        <button
          className={`px-4 py-2 rounded-lg shadow ${
            paymentMode === "wallet" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-600"
          }`}
          onClick={() => setPaymentMode("wallet")}
        >
          Wallet
        </button>
      </div>

      {/* Card Payment Form */}
      {paymentMode === "card" && (
        <div className="space-y-4">
          {/* Card Preview */}
          <div className="relative p-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg shadow-md text-white">
            <div className="flex justify-between items-center">
              <span className="font-semibold">{detectCardType(cardNumber)}</span>
              <span className="text-lg font-semibold">{expiry || "MM/YY"}</span>
            </div>
            <div className="mt-6 text-xl font-bold">{cardNumber || "•••• •••• •••• ••••"}</div>
            <div className="mt-4">{cardHolder || "Cardholder Name"}</div>
          </div>

          {/* Card Number */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Card Number</label>
            <input
              type="text"
              maxLength="16"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value.replace(/\D/, ""))}
              className="mt-1 block w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="1234 5678 9123 4567"
            />
          </div>

          {/* Cardholder Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Cardholder Name</label>
            <input
              type="text"
              value={cardHolder}
              onChange={(e) => setCardHolder(e.target.value)}
              className="mt-1 block w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="John Doe"
            />
          </div>

          {/* Expiry Date and CVV */}
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700">Expiry Date</label>
              <input
                type="text"
                maxLength="5"
                value={expiry}
                onChange={(e) =>
                  setExpiry(
                    e.target.value
                      .replace(/[^0-9/]/g, "")
                      .replace(/^(\d{2})(\d)/, "$1/$2")
                  )
                }
                className="mt-1 block w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder="MM/YY"
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700">CVV</label>
              <input
                type="password"
                maxLength="3"
                value={cvv}
                onChange={(e) => setCvv(e.target.value.replace(/\D/, ""))}
                className="mt-1 block w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder="123"
              />
            </div>
          </div>
        </div>
      )}

      {/* UPI Payment Form */}
      {paymentMode === "upi" && (
        <div>
          <label className="block text-sm font-medium text-gray-700">UPI ID</label>
          <input
            type="text"
            className="mt-1 block w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
            placeholder="example@upi"
          />
        </div>
      )}

      {/* Wallet Payment Options */}
      {paymentMode === "wallet" && (
        <div className="flex gap-4 justify-center mt-4">
          <button className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg shadow">
            <SiPhonepe className="text-xl" />
            PhonePe
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg shadow">
            <SiGooglepay className="text-xl" />
            Google Pay
          </button>
        </div>
      )}

      {/* Submit Button */}
      <button className="w-full mt-6 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700">
        Pay Now
      </button>
    </div>
  );
};

export default PaymentForm;
