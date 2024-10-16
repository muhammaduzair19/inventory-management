import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface Products {
    productId: string;
    name: string;
    price: number;
    rating?: number;
    stockQuantity: number;
}
export interface NewProduct {
    name: string;
    price: number;
    rating?: number;
    stockQuantity: number;
}
export interface SalesSummary {
    salesSummaryId: string;
    totalValue: number;
    changePercentage?: number;
    date: string;
}


export interface PurchaseSummary {
    purchaseSummaryId: string;
    totalPurchased: number;
    changePercentage?: number;
    date: string;
}


export interface ExpenseSummary {
    expenseSummaryId: string;
    totalExpenses: number;
    date: string;
}

export interface ExpenseByCategorySummary {
    expenseByCategorySummary: string;
    category: string;
    amount: string;
    date: string;
}


export interface DashboardMetrics {
    popularProducts: Products[];
    saleSummary: SalesSummary[];
    purchaseSummary: PurchaseSummary[];
    expenseSummary: ExpenseSummary[];
    expenseByCategorySummary: ExpenseByCategorySummary[];
}

export interface User {
    userId: string,
    name: string,
    email: string
}




export const api = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8000' }),
    reducerPath: 'api',
    tagTypes: ["DashboardMetrics", "Products", "Users", "Expenses"],
    endpoints: (build) => ({
        getDashbaordMetrics: build.query<DashboardMetrics, void>({
            query: () => "/dashboard",
            providesTags: ["DashboardMetrics"]
        }),
        getProducts: build.query<Products[], string | void>({
            query: (search) => ({
                url: "/products",
                params: search ? { search } : {}
            }),
            providesTags: ["Products"]
        }),
        createProduct: build.mutation<Products, NewProduct>({
            query: (newProduct) => ({
                url: '/products',
                method: 'POST',
                body: newProduct,
            }),
            invalidatesTags: ['Products']
        }),
        getUsers: build.query<User[], void>({
            query: () => '/users',
            providesTags: ['Users']
        }),
        getExpenses: build.query<ExpenseByCategorySummary[], void>({
            query: () => '/expenses',
            providesTags: ['Expenses']
        }),
    }),
})



export const { useGetDashbaordMetricsQuery, useGetProductsQuery, useCreateProductMutation, useGetUsersQuery, useGetExpensesQuery } = api