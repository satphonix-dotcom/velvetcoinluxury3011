import React from 'react';

const PaymentStatus = ({ status, transactionHash, error }) => {
  if (status === 'completed') {
    return (
      <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
        <p className="font-medium">Payment Successful!</p>
        <p className="text-sm mt-1">Transaction Hash: {transactionHash}</p>
      </div>
    );
  }

  if (status === 'failed') {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        <p className="font-medium">Payment Failed</p>
        <p className="text-sm mt-1">{error}</p>
      </div>
    );
  }

  if (status === 'processing') {
    return (
      <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded">
        <p className="font-medium">Processing Payment...</p>
        <p className="text-sm mt-1">Please wait while we confirm your transaction.</p>
      </div>
    );
  }

  return null;
};

export default PaymentStatus;