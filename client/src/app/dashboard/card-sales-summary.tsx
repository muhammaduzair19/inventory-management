'use client';
import { useGetDashbaordMetricsQuery } from '@/state/api';
import { TrendingUp } from 'lucide-react';
import React, { useState } from 'react';
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import Loader from '../(components)/loader';

const CardSalesSummary = () => {
    const { data, isLoading, isError } = useGetDashbaordMetricsQuery();
    const salesData = data?.saleSummary || [];
    const [timeframe, setTimeframe] = useState('weekly');

    const totalValueSum = salesData.reduce((acc, curr) => acc + curr.totalValue, 0) || 0;

    const averageChangePercentage = salesData.reduce((acc, curr, _, array) => {
        return acc + curr.changePercentage! / array.length;
    }, 0) || 0;

    const highestValueData = salesData.reduce((acc, curr) => {
        return acc.totalValue > curr.totalValue ? acc : curr;
    }, salesData[0]) || {};

    const highestValueDate = highestValueData.date ? new Date(highestValueData.date).toLocaleDateString('en-US', {
        month: 'numeric',
        day: 'numeric',
        year: '2-digit'
    }) : 'N/A';

    if (isError) {
        return <Loader />
    }

    return (
        <div className='w-full row-span-3 xl:row-span-6 bg-white shadow-md rounded-2xl flex flex-col justify-between '>
            {

                isLoading ? (
                    <Loader />
                ) :
                    (
                        <>
                            {/* HEADER  */}
                            <div>
                                <h3 className='text-lg font-semibold px-7 pt-5 mb-2' >
                                    Sales Summary
                                </h3>
                                <hr />
                            </div>



                            {/* BODY  */}
                            <div>
                                <div className='flex justify-between items-center mb-3 px-7'>
                                    <div className='text-lg font-medium'>
                                        <p className='text-xs text-gray-400'>Value</p>
                                        <span className='text-2xl font-extrabold'>
                                            $
                                            {(totalValueSum / 1000000).toLocaleString('en', {
                                                maximumFractionDigits: 2,
                                            })}
                                            m
                                        </span>
                                        <span className='text-green-50 text-sm ml-2'>
                                            <TrendingUp className='inline w-4 h-4' />
                                            {averageChangePercentage.toFixed(2)}%
                                        </span>
                                    </div>
                                    <select
                                        className='shadow-sm border border-gray-300 bg-white p-2 rounded'
                                        value={timeframe}
                                        onChange={(e) => setTimeframe(e.target.value)}
                                    >
                                        <option value={'daily'}>Daily</option>
                                        <option value={'weekly'}>Weekly</option>
                                        <option value={'monthly'}>Monthly</option>
                                    </select>
                                </div>

                                {/* CHART  */}
                                <ResponsiveContainer width={"100%"} height={350} className={'px-7'}>
                                    <BarChart
                                        data={salesData}
                                        margin={{ top: 0, right: 0, left: -25, bottom: 0 }}
                                    >
                                        <CartesianGrid strokeDasharray={''} vertical={false} />
                                        <XAxis dataKey='date' tickFormatter={(value) => {
                                            const date = new Date(value);
                                            return `${date.getMonth() + 1}/${date.getDate()}`
                                        }} />
                                        <YAxis
                                            tickFormatter={(value) => {
                                                return `$${(value / 1000000).toFixed(0)}m`
                                            }}
                                            tick={{ fontSize: 12, dx: -1, dy: -1 }}
                                            tickLine={false}
                                            axisLine={false}
                                        />
                                        <Tooltip
                                            formatter={(value: number) => [
                                                `$${value.toLocaleString('en')}`,
                                            ]}
                                        />
                                        <Bar
                                            dataKey={'totalValue'}
                                            fill="#3182ce"
                                            barSize={10}
                                            radius={[10, 10, 0, 0]}
                                        />

                                    </BarChart>
                                </ResponsiveContainer>
                            </div>

                            {/* FOOTER  */}
                            <div>
                                <hr />
                                <div className='flex justify-between items-center mt-4 text-sm px-7 mb-2'>
                                    <p>{salesData.length || 0} days</p>
                                    <p className='text-sm'>Highest Sales Date: {' '}<span className='font-bold'>{highestValueDate}</span>
                                    </p>
                                </div>
                            </div>
                        </>
                    )
            }
        </div>
    )
}

export default CardSalesSummary