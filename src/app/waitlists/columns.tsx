"use client";

import { ColumnDef } from "@tanstack/react-table";

type Waitlist = {
  id: string;
  email: string;
};

export const columns: ColumnDef<Waitlist>[] = [
  {
    header: "ID",
    accessorKey: "id",
    cell: ({ row }) => <p className="text-14-medium">{row.original.id}</p>,
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => <p className="text-14-medium">{row.original.email}</p>,
  },
];
