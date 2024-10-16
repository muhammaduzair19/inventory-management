"use client";

import { CheckCircle, Package, Tag, TrendingDown, TrendingUp } from "lucide-react";
import CardExpenseSummary from "./card-expense-summary";
import CardPopularProduct from "./card-popular-product";
import CardPurchaseSummary from "./card-purchase-summary";
import CardSalesSummary from "./card-sales-summary";
import StatCard from "./stat-card";
import PageTitle from "../(components)/pagetitle";

const Dashboard = () => {
    return (
        <>
            <PageTitle title="Dashboard - Inventory Management" />
            <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 xl:overflow-auto gap-10 pb-4 custom-grid-rows">
                <CardPopularProduct />
                <CardSalesSummary />
                <CardPurchaseSummary />
                <CardExpenseSummary />

                <StatCard
                    title="Customer & Expenses"
                    primaryIcon={<Package className="text-blue-600 w-6 h-6" />}
                    dateRange="22-29 October 2024"
                    details={[
                        { title: 'Customer Growth', amount: '175.00', changePercentage: 131, IconComponent: TrendingUp },
                        { title: 'Expenses', amount: '15.00', changePercentage: -61, IconComponent: TrendingDown }
                    ]}
                />

                <StatCard
                    title="Dues & Pendings"
                    primaryIcon={<CheckCircle className="text-blue-600 w-6 h-6" />}
                    dateRange="22-29 October 2024"
                    details={[
                        { title: 'Dues', amount: '275.00', changePercentage: 121, IconComponent: TrendingUp },
                        { title: 'Pending Orders', amount: '148.00', changePercentage: -56, IconComponent: TrendingDown }
                    ]}
                />

                <StatCard
                    title="Sales & Discount"
                    primaryIcon={<Tag className="text-blue-600 w-6 h-6" />}
                    dateRange="22-29 October 2024"
                    details={[
                        { title: 'Sales', amount: '1005.00', changePercentage: 21, IconComponent: TrendingUp },
                        { title: 'Discount', amount: '215.00', changePercentage: -17, IconComponent: TrendingDown }
                    ]}
                />
            </div>
        </>
    )
}

export default Dashboard;