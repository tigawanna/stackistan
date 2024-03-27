"use client";

import * as React from "react";
import { type ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/data-table/data-table";

// import {
//   filterableColumns,
//   getColumns,
//   searchableColumns,
// } from "./tasks-table-columns";

// import { TasksTableFloatingBar } from "./tasks-table-floating-bar";

import { useSuspenseQueries, useSuspenseQuery } from "@tanstack/react-query";
import { usePageContext } from "rakkasjs";
import { pbTryCatchWrapper } from "@/lib/pb/utils";
import { Switch } from "@/components/shadcn/ui/switch";
import { Label } from "@/components/shadcn/ui/label";
import { useDataTable } from "@/utils/hooks/tanstack-table/use-data-table";
import { CollectionName } from "@/lib/pb/client";
import { getColumns } from "./technologies-colum";

interface TasksTableProps {
  collction_name: CollectionName;
}

export function GenericTable({ collction_name }: TasksTableProps) {
  // Learn more about React.use here: https://react.dev/reference/react/use
  const {locals: { pb }} = usePageContext();
  const query = useSuspenseQuery({
    queryKey: ["tasks", collction_name],
    queryFn:()=> pbTryCatchWrapper(
      pb?.from(collction_name).getList(1, 20, { sort: "-created" }),
    )
  });

  //   const { data, pageCount } = React.use(tasksPromise);
    const data = query.data?.data?.items??[]
    const pageCount = query.data?.data?.totalPages??0

  // Memoize the columns so they don't re-render on every render
  const columns = React.useMemo<ColumnDef<typeof data[number], unknown>[]>(
    () => getColumns(),
    [],
  );

  const { table } = useDataTable({
    data,
    columns,
    pageCount,
    // searchableColumns,
    // filterableColumns,
  });

  // Toggling some data-table states for demo
  const id = React.useId();
  const [showAdvancedFilter, setShowAdvancedFilter] = React.useState(false);
  const [showFloatingBar, setShowFloatingBar] = React.useState(false);

  return (
    <div className="space-y-4 overflow-hidden">
      <div className="flex w-fit items-center justify-center space-x-4 overflow-x-auto rounded-md border p-4">
        <div className="flex items-center space-x-2">
          <Switch
            id={`show-advanced-filter-${id}`}
            checked={showAdvancedFilter}
            onCheckedChange={setShowAdvancedFilter}
          />
          <Label htmlFor={`show-advanced-filter-${id}`}>Advanced filter</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Switch
            id={`show-floating-bar-${id}`}
            checked={!!showFloatingBar}
            onCheckedChange={setShowFloatingBar}
          />
          <Label htmlFor={`show-floating-bar-${id}`}>Floating bar</Label>
        </div>
      </div>
      <DataTable
        table={table}
        columns={columns}
        // searchableColumns={searchableColumns}
        // filterableColumns={filterableColumns}
        advancedFilter={showAdvancedFilter}
        // floatingBar={
        //   showFloatingBar ? <TasksTableFloatingBar table={table} /> : null
        // }
        // deleteRowsAction={() =>
        //   deleteTasks({ rows: table.getFilteredSelectedRowModel().rows })
        // }
      />
    </div>
  );
}