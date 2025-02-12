import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useEffect, useState } from "react";
import { Virtuoso } from "react-virtuoso";
import { Table, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";

export type User = {
  id: string;
  name: string;
  email: string;
  role: "Admin" | "User";
};

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "role",
    header: "Role",
  },
];

const generateData = (start: number, end: number): User[] => {
  return Array.from({ length: end - start }, (_, index) => ({
    id: (start + index + 1).toString(),
    name: `User ${start + index + 1}`,
    email: `user${start + index + 1}@example.com`,
    role: (start + index) % 2 === 0 ? "Admin" : "User",
  }));
};

const VirtualizedTable = () => {
  const [data, setData] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);

  const loadMore = () => {
    if (loading) return;
    setLoading(true);
    setTimeout(() => {
      const newData = generateData(page * 100, (page + 1) * 100);
      setData((prevData) => [...prevData, ...newData]);
      setPage((prevPage) => prevPage + 1);
      setLoading(false);
    }, 1000);
  };

  useEffect(() => {
    loadMore();
  }, []);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="rounded-md border overflow-hidden">
      <Table className="w-full">
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id} className="flex items-center">
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id} className="w-full">
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
      </Table>

      <div className="h-[400px] overflow-auto">
        <Virtuoso
          data={data}
          endReached={loadMore}
          itemContent={(index, item) => (
            <TableRow key={item.id} className="flex items-center">
              <TableCell className="w-full">{item.id}</TableCell>
              <TableCell className="w-full">{item.name}</TableCell>
              <TableCell className="w-full">{item.email}</TableCell>
              <TableCell className="w-full">{item.role}</TableCell>
            </TableRow>
          )}
        />
        {loading && <div className="text-center py-2">Loading...</div>}
      </div>
    </div>
  );
};

export default VirtualizedTable;
