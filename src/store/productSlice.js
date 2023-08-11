import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BASE_URL } from "../utils/apiURL";
import { STATUS } from "../utils/status";

const initialState = {
    products: [],
    productsStatus: STATUS.IDLE,
    productSingle: [],
    productSingleStatus: STATUS.IDLE
}

const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchAsyncProducts.pending, (state, action) => {
            state.productsStatus = STATUS.LOADING;
        })

        .addCase(fetchAsyncProducts.fulfilled, (state, action) => {
            state.products = action.payload;
            state.productsStatus = STATUS.SUCCEEDED;
        })
        
        .addCase(fetchAsyncProducts.rejected, (state, action) => {
            state.productsStatus = STATUS.FAILED
        })

        .addCase(fetchAsyncProductSingle.pending, (state, action) => {
            state.productSingleStatus = STATUS.LOADING;
        })

        .addCase(fetchAsyncProductSingle.fulfilled, (state, action) => {
            state.productSingle = action.payload;
            state.productSingleStatus = STATUS.SUCCEEDED;
        })

        .addCase(fetchAsyncProductSingle.rejected, (state, action) => {
            state.productSingleStatus = STATUS.FAILED;
        })
    }
});

// for getting the products list with limited numbers
export const fetchAsyncProducts = createAsyncThunk('products/fetch', async(limit) => {
    const response = await fetch(`${BASE_URL}products?limit=${limit}`);
    const data = await response.json();
    return data.products;
});

// getting the single product data also
export const fetchAsyncProductSingle = createAsyncThunk('product-single/fetch', async(id) => {
    const response = await fetch(`${BASE_URL}products/${id}`);
    const data = await response.json();
    return data;
});


export const getAllProducts = (state) => state.product.products;
export const getAllProductsStatus = (state) => state.product.productsStatus;
export const getProductSingle = (state) => state.product.productSingle;
export const getSingleProductStatus = (state) => state.product.productSingleStatus;
export default productSlice.reducer;