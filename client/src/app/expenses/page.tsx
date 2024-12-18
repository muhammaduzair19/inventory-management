'use client';

import { ExpenseByCategorySummary, useGetExpensesQuery } from "@/state/api";
import { useMemo, useState } from "react";
import Header from "../(components)/header";
import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import Loader from "../(components)/loader";
import PageTitle from "../(components)/pagetitle";


type AggregatedDataItem = {
    name: string,
    color?: string,
    amount: number
}
type AggregatedData = {
    [category: string]: AggregatedDataItem;
}



const Expenses = () => {
    const [activeIndex, setActiveIndex] = useState(0)
    const [selectedCategory, setSelectedCategory] = useState('All')
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')
    const { data: expensesData, isLoading, isError } = useGetExpensesQuery();
    const expenses = useMemo(() => expensesData ?? [], [expensesData]);

    const parseDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toISOString().split("T")[0];
    }

    const aggregateData: AggregatedDataItem[] = useMemo(() => {
        const filtered: AggregatedData = expenses.filter((data: ExpenseByCategorySummary) => {
            const matchesCategory = selectedCategory === 'All' || data.category === selectedCategory;
            const dataDate = parseDate(data.date);
            const matchesDate = !startDate || !endDate || (dataDate >= startDate && dataDate <= endDate);
            return matchesCategory && matchesDate
        }).reduce((acc: AggregatedData, data: ExpenseByCategorySummary) => {
            const amount = parseInt(data.amount);
            if (!acc[data.category]) {
                acc[data.category] = { name: data.category, amount: 0 };
                acc[data.category].color = `#${Math.floor(Math.random() * 16775).toString(6)}`;
                acc[data.category].amount += amount;
            }
            return acc;
        }, {})
        return Object.values(filtered);
    }, [expenses, selectedCategory, startDate, endDate])



    if (isLoading) {
        return <Loader />
    }
    if (isError || !expensesData) {
        return <div className="text-center text-red-500 py-4" >Failed to fecth data x...</div>
    }

    const className = {
        label: 'block text-sm text-gray-700',
        selectInput: 'mt-1 w-full block pl-3 pr-10 py-2 textbase border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md'
    }



    return (
        <>
            <PageTitle title="Expenses - Inventory Management" />
            <div>

                {/* HEADER  */}
                <div className="mb-5">
                    <Header name="Expenses" />
                    <p className="text-sm text-gray-500">
                        A visual representation of expeneses over the time
                    </p>
                </div>

                {/* FILTERS  */}
                <div className="flex flex-col md:flex-row justify-between gap-4">
                    <div className="w-full md:w-1/3 bg-white shadow rounded-lg p-6">
                        <h3 className="text-lg font-semibold mb-4">
                            Fiter by Category and Date
                        </h3>
                        <div className="space-y-4">
                            {/* CATEGORY  */}
                            <div>
                                <label htmlFor="category" className={className.label}>
                                    Category
                                </label>
                                <select
                                    name="category"
                                    id="category"
                                    className={className.selectInput}
                                    defaultValue={'All'}
                                    onChange={(e) => setSelectedCategory(e.target.value)}
                                >
                                    <option>All</option>
                                    <option>Office</option>
                                    <option>Professional</option>
                                    <option>Salaries</option>

                                </select>
                            </div>
                            {/* START DATE  */}
                            <div>
                                <label htmlFor="start-date" className={className.label}>
                                    Start Date
                                </label>
                                <input
                                    type="date"
                                    name="start-date"
                                    id="start-date"
                                    className={className.selectInput}
                                    onChange={(e) => setStartDate(e.target.value)}
                                />
                            </div>
                            {/* END DATE  */}
                            <div>
                                <label htmlFor="end-date" className={className.label}>
                                    End Date
                                </label>
                                <input
                                    type="date"
                                    name="end-date"
                                    id="end-date"
                                    className={className.selectInput}
                                    onChange={(e) => setEndDate(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                    <div className=" flex-grow bg-white p-4 rounded-lg md:p-6">
                        <ResponsiveContainer width={'100%'} height={400}>
                            <PieChart>
                                <Pie
                                    data={aggregateData}
                                    cx={'50%'}
                                    cy={'50%'}
                                    label
                                    outerRadius={150}
                                    fill="#888d48"
                                    dataKey={'amount'}
                                    onMouseEnter={(_, index) => setActiveIndex(index)}
                                >
                                    {aggregateData.map(
                                        (entry: AggregatedDataItem, index: number) => (
                                            <Cell
                                                key={`cell=${index}`}
                                                fill={index === activeIndex ? 'rgb(29,78,216)' : entry.color}
                                            />
                                        )
                                    )}
                                </Pie>
                                <Tooltip />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>


            </div>
        </>
    )
}

export default Expenses