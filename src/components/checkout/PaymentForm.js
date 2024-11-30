import React from 'react';

const PaymentForm = ({ onSubmit }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Payment Information</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Payment Method
          </label>
          <div className="space-y-2">
            <div className="flex items-center">
              <input
                id="crypto"
                name="paymentMethod"
                type="radio"
                defaultChecked
                className="h-4 w-4 text-yellow-400 focus:ring-yellow-500 border-gray-300"
              />
              <label htmlFor="crypto" className="ml-3 block text-sm font-medium text-gray-700">
                Cryptocurrency (USDC)
              </label>
            </div>
            <div className="flex items-center">
              <input
                id="wallet"
                name="paymentMethod"
                type="radio"
                className="h-4 w-4 text-yellow-400 focus:ring-yellow-500 border-gray-300"
              />
              <label htmlFor="wallet" className="ml-3 block text-sm font-medium text-gray-700">
                Crypto Wallet
              </label>
            </div>
          </div>
        </div>

        <div className="pt-4">
          <p className="text-sm text-gray-500">
            Your payment information is securely processed. We never store your crypto wallet details.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaymentForm;