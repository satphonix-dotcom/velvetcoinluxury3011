import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const processPayment = createAsyncThunk(
  'payment/processPayment',
  async ({ orderId, paymentDetails }) => {
    const response = await axios.post('/api/payments/process', {
      orderId,
      paymentDetails
    });
    return response.data;
  }
);

const initialState = {
  loading: false,
  error: null,
  transactionHash: null,
  status: 'idle'
};

const paymentSlice = createSlice({
  name: 'payment',
  initialState,
  reducers: {
    resetPayment: (state) => {
      state.loading = false;
      state.error = null;
      state.transactionHash = null;
      state.status = 'idle';
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(processPayment.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.status = 'processing';
      })
      .addCase(processPayment.fulfilled, (state, action) => {
        state.loading = false;
        state.transactionHash = action.payload.transactionHash;
        state.status = 'completed';
      })
      .addCase(processPayment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        state.status = 'failed';
      });
  }
});

export const { resetPayment } = paymentSlice.actions;
export default paymentSlice.reducer;