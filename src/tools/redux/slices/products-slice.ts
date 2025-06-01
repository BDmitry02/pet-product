import { createAsyncThunk, createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchGet } from "@/tools/funcs/fetch/fetch-func";
import { Product } from "@/tools/types/product";
import { WithIndexer } from "@/tools/types/general-types";

interface ProductsSlice {
    products: Product[];
    itemsPerPage: number;
    totalCount: number;
}

const initialState: ProductsSlice = {
    products: [],
    itemsPerPage: 12,
    totalCount: 12,
};

const productsSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        setProducts(state, action: PayloadAction<Product[]>) {
            state.products = action.payload;
        },
        setTotalCount(state, action: PayloadAction<number>) {
            state.totalCount = action.payload;
        },
        clearPagination(state) {
            state.itemsPerPage = 12;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllProducts.fulfilled, (state, action) => {
                state.products = action.payload.data;
                state.totalCount = action.payload.totalCount;
            })
            .addCase(getFilteredAndPaginatedProducts.fulfilled, (state, action) => {
                const { filteredAndPaginatedProducts, itemsPerPage } = action.payload;

                state.products = filteredAndPaginatedProducts.data;
                state.totalCount = filteredAndPaginatedProducts.totalCount;
                state.itemsPerPage = parseInt(itemsPerPage, 10);
            })
            .addCase(
                getPaginatedProduct.fulfilled,
                (
                    state,
                    action: PayloadAction<{
                        data: Product[];
                        totalCount: number;
                    }>,
                ) => {
                    const { data, totalCount } = action.payload;
                    state.products = data;
                    state.totalCount = totalCount;
                },
            );
    },
});

export const getAllProducts = createAsyncThunk("products/getAllProducts", async () => {
    const products = await fetchGet<Product[]>("http://localhost:3010/products");

    return products;
});

export const getFilteredAndPaginatedProducts = createAsyncThunk(
    "products/getFilteredAndPaginatedProducts",
    async (params: { itemsPerPage: string; tags: string[]; subscription: string; price: string }) => {
        const { itemsPerPage, tags, subscription, price } = params;

        const queryParams: WithIndexer<string | string[] | undefined> = {
            _limit: itemsPerPage,
            tags_like: tags.length > 0 ? tags : undefined,
            subscription: subscription || undefined,
            price_lte: price || undefined,
        };

        const filteredAndPaginatedProducts = await fetchGet<Product[]>(
            "http://localhost:3010/products",
            queryParams,
        );

        return { filteredAndPaginatedProducts, itemsPerPage };
    },
);

export const getPaginatedProduct = createAsyncThunk<
    { data: Product[]; totalCount: number },
    number,
    { state: { products: ProductsSlice } }
>("products/getPaginatedProduct", async (page: number, thunkAPI) => {
    const state = thunkAPI.getState();
    const itemsPerPage = state.products.itemsPerPage;

    const queryParams: WithIndexer<string | string[] | undefined> = {
        _page: String(page),
        _limit: String(itemsPerPage),
    };

    const paginatedProducts = await fetchGet<Product[]>("http://localhost:3010/products", queryParams);

    return paginatedProducts;
});

export const paginationSelector = createSelector(
    (state: { products: ProductsSlice }) => state.products.itemsPerPage,
    (state: { products: ProductsSlice }) => state.products.totalCount,
    (itemsPerPage, totalCount) => ({
        itemsPerPage,
        totalCount,
    }),
);

export const { setProducts, clearPagination, setTotalCount } = productsSlice.actions;
export default productsSlice.reducer;
