'use client';


import { useAppDispatch, useAppSelector } from "@/app/redux";
import { setIsDarkMode, setIsSidebarCollapsed } from "@/state";
import { Bell, Menu, Moon, Settings, Sun } from "lucide-react"
import Link from "next/link";

const Navbar = () => {
    const dispatch = useAppDispatch();
    const isSidebarCollapsed = useAppSelector((state) => state.global.isSidebarCollapsed);
    const isDarkMode = useAppSelector((state) => state.global.isDarkMode);

    const toggleDarkMode = () => {
        dispatch(setIsDarkMode(!isDarkMode));
    }


    const toggleSidebar = () => {
        dispatch(setIsSidebarCollapsed(!isSidebarCollapsed))
    };

    return (
        <div
            className="flex justify-between items-center w-full mb-7"
        >
            {/* LEFT SIDE */}
            <div className="flex justify-between items-center gap-5">
                <button className="p-3 bg-gray-100 rounded-full hover:bg-blue-100"
                    onClick={toggleSidebar}
                >
                    <Menu className="w-4 h-4" />
                </button>

                <div className="relative">
                    <input type="search" placeholder="Search here.." className="pl-10 py-2 px-4 w-52 md:w-80 border-2 border-gray-300 bg-white rounded-lg focus:outline-none focus:border-blue-300" />
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Bell className="text-gray-500" size={20} />
                    </div>
                </div>
            </div>


            {/* RIGHT SIDE */}
            <div className="flex justify-between items-center gap-5">
                <div className="hidden md:flex justify-between items-center gap-5">
                    <div>
                        <button onClick={toggleDarkMode}>
                            {
                                isDarkMode ? (
                                    <Sun className="cursor-pointer text-gray-500" size={24} />
                                ) : (
                                    <Moon className="cursor-pointer text-gray-500" size={24} />
                                )
                            }
                        </button>
                    </div>
                    <div className="relative">
                        <Bell className="cursor-pointer text-gray-500" size={24} />
                        <span className="absolute -top-2 -right-2 inline-flex items-center justify-center px-[0.4rem] text-red-100 rounded-full bg-red-400">
                            3
                        </span>
                    </div>
                    <hr className="w-0 h-7 mx-3 border border-gray-300 border-l border-solid" />
                    <div className="flex items-center gap-3 cursor-pointer">
                        <div className="w-9 bg-purple-950 h-9 rounded-full text-white font-bold flex justify-center items-center">U</div>
                        <span className="font-semibold">Uzairrr</span>
                    </div>
                </div>
                <Link
                    href={'/settings'}
                >
                    <Settings className="cursor-pointer text-gray-500" size={24} />
                </Link>

            </div>















        </div>
    )
}

export default Navbar;