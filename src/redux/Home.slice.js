import {AxiosInterceptor, LoadingStatus} from '../helpers';
import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from '@reduxjs/toolkit';

const PROFILE_FEATURE_KEY = 'test';

const profileAdapter = createEntityAdapter();

const initialProfileState = profileAdapter.getInitialState({
  productLoadingStatus: LoadingStatus.NOT_LOADED,
  productList: null,
  productError: null,
  categorieLoadingStatus: LoadingStatus.NOT_LOADED,
  categorieList: null,
  categorieError: null,
  getCartLoadingStatus: LoadingStatus.NOT_LOADED,
  allCartList: null,
  allCartError: null,
  searchProLoadingStatus: LoadingStatus.NOT_LOADED,
  singleLoadingStatus: LoadingStatus.NOT_LOADED,
  filteredProduct: null,
  getSingleProduct: null,
});

/**
 * Get Product list  Action
 */

export const getProductAction = createAsyncThunk(
  'test/getProductAction',
  async (params, thunkAPI) => {
    try {
      // Api for getting products
      const result = await AxiosInterceptor({
        url: 'products',
        method: 'GET',
        data: params,
      });
      return result;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response ? error.response?.data : error.data,
      );
    }
  },
);

export const searchProductAction = createAsyncThunk(
  'test/searchProductAction',
  async (params, thunkAPI) => {
    try {
      // Api for getting products
      const result = await AxiosInterceptor({
        url: 'https://dummyjson.com/products/search',
        method: 'GET',
        params: params,
      });
      return result;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response ? error.response?.data : error.data,
      );
    }
  },
);
export const getCategoriAction = createAsyncThunk(
  'test/getCategoriAction',
  async (params, thunkAPI) => {
    try {
      // Api for getting categories
      const result = await AxiosInterceptor({
        url: 'https://dummyjson.com/products/categories',
        method: 'GET',
      });
      return result;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response ? error.response?.data : error.data,
      );
    }
  },
);

// GET CART DATA

export const getCartDataAction = createAsyncThunk(
  'test/getCartDataAction',
  async (params, thunkAPI) => {
    console.log(params, 'paramsvv');
    try {
      // Api for getting categories
      const result = await AxiosInterceptor({
        url: 'https://dummyjson.com/products/category/' + params?.categorieName,
        method: 'GET',
        params: params,
      });
      return result;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response ? error.response?.data : error.data,
      );
    }
  },
);

// GET A SINGLE PRODUCT

export const getSingleProductAction = createAsyncThunk(
  'test/getSingleProductAction',
  async (params, thunkAPI) => {
    console.log(params, 'paramsvv');
    try {
      // Api for getting categories
      const result = await AxiosInterceptor({
        url: 'https://dummyjson.com/products/' + params?.id,
        method: 'GET',
        params: params,
      });
      return result;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response ? error.response?.data : error.data,
      );
    }
  },
);

/**
 * Slice for all reducres
 */
const homeSlice = createSlice({
  name: PROFILE_FEATURE_KEY,
  initialState: initialProfileState,
  reducers: {
    add: profileAdapter.addOne,
    remove: profileAdapter.removeOne,
    resetAuthState: (state, action) => {
      return {
        ...state,
      };
    },
    resetCartData: (state, action) => {
      return {
        ...state,
        getCartLoadingStatus: LoadingStatus.LOADING,
      };
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getProductAction.pending, state => {
        state.productError = null;
        state.productLoadingStatus = LoadingStatus.LOADING;
      })
      .addCase(getProductAction.fulfilled, (state, action) => {
        state.productLoadingStatus = LoadingStatus.LOADED;
        state.productList = action.payload;
      })
      .addCase(getProductAction.rejected, (state, action) => {
        state.productLoadingStatus = LoadingStatus.FAILED;
        state.productError = action.payload || action.error.message;
      })
      .addCase(getCategoriAction.pending, state => {
        state.categorieError = null;
        state.categorieLoadingStatus = LoadingStatus.LOADING;
      })
      .addCase(getCategoriAction.fulfilled, (state, action) => {
        state.categorieLoadingStatus = LoadingStatus.LOADED;
        state.categorieList = action.payload;
      })
      .addCase(getCategoriAction.rejected, (state, action) => {
        state.categorieLoadingStatus = LoadingStatus.FAILED;
        state.categorieError = action.payload || action.error.message;
      })
      .addCase(getCartDataAction.pending, state => {
        state.allCartError = null;
        state.getCartLoadingStatus = LoadingStatus.LOADING;
      })
      .addCase(getCartDataAction.fulfilled, (state, action) => {
        state.getCartLoadingStatus = LoadingStatus.LOADED;
        state.allCartList = action.payload;
      })
      .addCase(getCartDataAction.rejected, (state, action) => {
        state.getCartLoadingStatus = LoadingStatus.FAILED;
        state.allCartError = action.payload || action.error.message;
      })
      .addCase(searchProductAction.pending, state => {
        state.searchProLoadingStatus = LoadingStatus.LOADING;
      })
      .addCase(searchProductAction.fulfilled, (state, action) => {
        state.searchProLoadingStatus = LoadingStatus.LOADED;
        state.filteredProduct = action;
      })
      .addCase(searchProductAction.rejected, (state, action) => {
        state.searchProLoadingStatus = LoadingStatus.FAILED;
      })
      .addCase(getSingleProductAction.pending, state => {
        state.singleLoadingStatus = LoadingStatus.LOADING;
      })
      .addCase(getSingleProductAction.fulfilled, (state, action) => {
        state.singleLoadingStatus = LoadingStatus.LOADED;
        state.getSingleProduct = action.payload;
      })
      .addCase(getSingleProductAction.rejected, (state, action) => {
        state.singleLoadingStatus = LoadingStatus.FAILED;
      });
  },
});

/*
 * Export reducer for store configuration.
 */
export const homeReducer = homeSlice.reducer;

export const homeActions = homeSlice.actions;
