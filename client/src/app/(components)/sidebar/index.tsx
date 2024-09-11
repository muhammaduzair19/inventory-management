'use client';

import { useAppDispatch, useAppSelector } from "@/app/redux";
import { setIsSidebarCollapsed } from "@/state";
import { Archive, CircleDollarSign, Clipboard, Layout, LucideIcon, Menu, Settings, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Sidebar = () => {

    interface SidebarLinkProps {
        href: string;
        icon: LucideIcon,
        label: string,
        isCollapsed: boolean
    }

    const SidebarLink = ({
        href,
        icon: Icon,
        label,
        isCollapsed,
    }: SidebarLinkProps) => {
        const pathname = usePathname();
        const isActive = pathname === href || (pathname === '/' && href === '/dashboard');


        return (
            <Link href={href}>
                <div
                    className={`cursor-pointer flex items-center 
                        ${isCollapsed ? 'justify-center py-4' : 'justify-start px-8 py-4'}
                         hover:text-blue-500 hover:bg-blue-100 gap-3 transition-colors 
                         ${isActive ? 'bg-blue-200 text-white' : ''}`}
                >
                    <Icon className="w-6 h-6 !text-gray-700" />
                    <span className={`${isCollapsed ? 'hidden' : 'block'} font-medium text-gray-700`} >
                        {label}
                    </span>

                </div>
            </Link>
        )

    }








    const dispatch = useAppDispatch();
    const isSidebarCollapsed = useAppSelector((state) => state.global.isSidebarCollapsed);

    const toggleSidebar = () => {
        dispatch(setIsSidebarCollapsed(!isSidebarCollapsed))
    };

    const sidebarClassNames = `fixed flex flex-col ${isSidebarCollapsed ? 'w-0 md:w-16' : 'w-72 md:w-64'} bg-white transition-all duration-300 overflow-hidden h-full shadow-md z-40
`


    return (
        <div className={sidebarClassNames}>
            {/* TOP SECTION  */}
            <div
                className={`flex justify-between gap-3 md:justify-normal items-center pt-8 ${isSidebarCollapsed ? 'px-5' : 'px-8'}`}>
                <div>
                    LOGO
                </div>
                <h1 className={`${isSidebarCollapsed ? 'hidden' : 'block'} font-extrabold text-2xl`}>YOUSTOCK</h1>
                <button className="md:hidden p-3 bg-gray-100 rounded-full hover:bg-blue-100"
                    onClick={toggleSidebar}
                >
                    <Menu className="w-4 h-4" />
                </button>
            </div>


            {/* LINKS  */}
            <div className="mt-8 flex-grow">
                <SidebarLink
                    href="/dashboard"
                    icon={Layout}
                    isCollapsed={isSidebarCollapsed}
                    label="Dashboard"

                />
                <SidebarLink
                    href="/inventory"
                    icon={Archive}
                    isCollapsed={isSidebarCollapsed}
                    label="Inventory"

                />
                <SidebarLink
                    href="/products"
                    icon={Clipboard}
                    isCollapsed={isSidebarCollapsed}
                    label="Products"

                />
                <SidebarLink
                    href="/users"
                    icon={User}
                    isCollapsed={isSidebarCollapsed}
                    label="Users"

                />
                <SidebarLink
                    href="/settings"
                    icon={Settings}
                    isCollapsed={isSidebarCollapsed}
                    label="Settings"

                />
                <SidebarLink
                    href="/expenses"
                    icon={CircleDollarSign}
                    isCollapsed={isSidebarCollapsed}
                    label="Expenses"

                />
            </div>


            {/* FOOTER  */}
            <div
                className={`${isSidebarCollapsed ? 'hidden' : 'block'} mb-10`}
            >
                <p className="text-center text-xs text-gray-500">&copy; 2024 YOUSTOCK</p>
            </div>

        </div>
    )
}


export default Sidebar;