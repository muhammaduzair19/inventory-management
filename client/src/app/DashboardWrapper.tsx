'use client';

import React, { useEffect } from "react"
import Navbar from "./(components)/navbar/index"
import Sidebar from "./(components)/sidebar";
import StoreProvider, { useAppSelector } from "./redux";



const DashboardLayout = ({ children }: { children: React.ReactNode }) => {

    const isSidebarCollapsed = useAppSelector((state) => state.global.isSidebarCollapsed);
    const isDarkMode = useAppSelector((state) => state.global.isDarkMode);

    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add('dark')
        } else {
            document.documentElement.classList.add('light')
        }
    }, [isDarkMode])




    return (
        <div className={`${isDarkMode ? "dark" : "light"} flex w-full min-h-screen bg-gray-50 text-gray-900`}>
            <Sidebar />
            <main className={`flex flex-col w-full min-h-screen bg-gray-50 text-gray-900 ${isSidebarCollapsed ? "md:pl-24" : "md:pl-72"} py-7 px-9`}>
                <Navbar />
                {children}
            </main>
        </div>
    )
};



const DashboardWrapper = ({ children }: { children: React.ReactNode }) => {
    return (
        <StoreProvider>
            <DashboardLayout>
                {children}
            </DashboardLayout>
        </StoreProvider>
    )
}

export default DashboardWrapper
