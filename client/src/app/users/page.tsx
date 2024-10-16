'use client';
import { useGetUsersQuery } from "@/state/api"
import Header from "../(components)/header";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Loader from "../(components)/loader";
import PageTitle from "../(components)/pagetitle";


const columns: GridColDef[] = [
    { field: 'userId', headerName: 'ID', width: 200 },
    { field: 'name', headerName: 'User Name', width: 150 },
    { field: 'email', headerName: 'Email', width: 300 },
]


const Users = () => {
    const { data: users, isLoading, isError } = useGetUsersQuery();

    if (isLoading) {
        return <Loader />
    }
    if (isError || !users) {
        return <div className="text-center text-red-500 py-4" >Failed to fecth data x...</div>
    }

    return (
        <>
            <PageTitle title="Users - Inventory Management" />
            <div className="flex flex-col">
                <Header name='Users' />
                <DataGrid
                    rows={users}
                    columns={columns}
                    getRowId={(row) => row.userId}
                    checkboxSelection

                    className="bg-white shadow rounded-lg border border-gray-200 mt-5 !text-gray-700"
                />

            </div>
        </>
    )
}

export default Users