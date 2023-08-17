"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/app/tools/components/ui/button";
import { Checkbox } from "@/app/tools/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/app/tools/components/ui/dropdown-menu";
import { FaPlus, FaAngleUp } from "react-icons/fa";
import { FormData } from "@/app/tools/utils/@types";

export const columns: ColumnDef<FormData>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "nome",
    header: "Nome",
  },
  {
    accessorKey: "contato",
    header: "Contato",
  },
  {
    accessorKey: `topEqNome`,
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Equipamento
          <FaAngleUp className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "topEqModelo",
    header: "Modelo do Equipamento",
  },
  {
    accessorKey: "topEqTecnico",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Técnico
          <FaAngleUp className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "topEqStatus",
    header: "Status",
  },
  {
    accessorKey: "topEqValorTec",
    header: "Valor Técnico",
  },
  {
    accessorKey: "topEqValorCob",
    header: "Valor Total",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const payment = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <FaPlus />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(payment.id)}
            >
              Copy payment ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem>View payment details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
