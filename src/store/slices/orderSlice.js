import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchOrders = createAsyncThunk(
  'orders/fetchOrders',
  async () => {
    const response = await axios.get('/api/orders');
    return response.data;
  }
);

export const fetchVendorOrders = createAsyncThunk(
  'orders/fetchVendorOrders',
  async () => {
    const response = await axios.get('/api/orders/vendor');
    return response.data;
  }
);

export const updateOrderStatus = createAsyncThunk(
  'orders/updateStatus',
  async ({ orderId, status }) => {
    const response = await axios.patch(`/api/orders/${orderId}/status`, { status });
    return response.data;
  }
);

const initialState = {
  orders: [],
  vendorOrders: [],
  loading: false,
  error: null
};

const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Orders
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Fetch Vendor Orders
      .addCase(fetchVendorOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchVendorOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.vendorOrders = action.payload;
      })
      .addCase(fetchVendorOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Update Order Status
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        const updatedOrder = action.payload;
        state.vendorOrders = state.vendorOrders.map(order =>
          order._id === updatedOrder._id ? updatedOrder : order
        );
      });
  }
});

export default orderSlice.reducer;