import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (filters = {}) => {
    const response = await axios.get('/api/products', { params: filters });
    return response.data;
  }
);

export const fetchAllProducts = createAsyncThunk(
  'products/fetchAllProducts',
  async () => {
    const response = await axios.get('/api/products/admin/all');
    return response.data;
  }
);

export const updateProductStatus = createAsyncThunk(
  'products/updateStatus',
  async ({ productId, status }) => {
    const response = await axios.put(`/api/products/admin/status/${productId}`, { status });
    return response.data;
  }
);

const initialState = {
  products: [],
  loading: false,
  error: null
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Products
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Fetch All Products (Admin)
      .addCase(fetchAllProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchAllProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Update Product Status
      .addCase(updateProductStatus.fulfilled, (state, action) => {
        const updatedProduct = action.payload;
        state.products = state.products.map(product =>
          product._id === updatedProduct._id ? updatedProduct : product
        );
      });
  }
});

export default productSlice.reducer;