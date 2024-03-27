import { ColumnDef } from "@tanstack/react-table";
import { StackistanTechnologiesResponse } from "Database";

export function getColumns(): ColumnDef<StackistanTechnologiesResponse>[] {
    return [
        {
            accessorKey: 'name',
            header: 'Name',
            cell: (info) => info.getValue(),
        },
        {
            accessorKey: 'description',
            header: 'Description',
            cell: (info) => info.getValue(),
        },
        {
            accessorKey: 'link',
            header: 'Link',
            cell: (info) => info.getValue(),
        },
        {
            accessorKey: 'logo',
            header: 'Logo',
            cell: (info) => info.getValue(),
        },
        {
            accessorKey: 'dependancies',
            header: 'Dependancies',
            cell: (info) => info.getValue(),
        },
    ]
    
}
