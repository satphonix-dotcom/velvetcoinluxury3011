import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { processPayment } from '../../store/slices/paymentSlice';
import PaymentStatus from './payment/PaymentStatus';
import WalletInput from './payment/WalletInput';

const CryptoPayment = ({ orderId, amount }) => {
  const dispatch = useDispatch();
  const { loading, error, transactionHash, status } = useSelector(state => state.payment);
  const [walletAddress, setWalletAddress] = useState('');

  const handlePayment = async (e) => {
    e.preventDefault();
    
    try {
      await dispatch(processPayment({
        orderId,
        paymentDetails: {
          amount,
          currency: 'USDC',
          walletAddress
        }
      })).unwrap();
    } catch (error) {
      console.error('Payment failed:', error);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Pay with USDC</h2>
      
      <PaymentStatus 
        status={status}
        transactionHash={transactionHash}
        error={error}
      />

      {status !== 'completed' && (
        <form onSubmit={handlePayment}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Amount to Pay
            </label>
            <div className="text-2xl font-bold text-gray-900">
              {amount} USDC
            </div>
          </div>

          <WalletInput 
            value={walletAddress}
            onChange={setWalletAddress}
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-yellow-400 text-gray-900 py-2 px-4 rounded-md font-medium hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 disabled:opacity-50"
          >
            {loading ? 'Processing...' : 'Pay Now'}
          </button>
        </form>
      )}

      <div className="mt-4 text-sm text-gray-500">
        <p>Payment will be processed securely using the USDC smart contract.</p>
        <p className="mt-2">Make sure you have sufficient USDC in your wallet before proceeding.</p>
      </div>
    </div>
  );
};

export default CryptoPayment;