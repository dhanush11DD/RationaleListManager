"use client";

import { DataTable } from "@/components/DataTable";
import { ColumnDef } from "@tanstack/react-table";
import React, { useState,useEffect } from "react";
import PageTitle from "@/components/PageTitle";
import { cn } from "@/lib/utils";
import apiClient from "@/apiClient/apiClient";
import { RationaleColumns, SpecialtyColumns } from "@/constants/TableColumns";
import OffCanvas from "@/components/OffCanvas";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react"
import { SpecialtyForm } from "./form";

type Props = {};

type Specialty = {
  id: number;
  enable: boolean;
  specialtyCodeId: number;
  rationaleId: number;
  createdAt: string;
  updatedAt: string;
};


export default function OrdersPage({}: Props) {

  const [specialtyData , setSpecialtyData] = useState([])
  const [sheetOpened,setSheetOpened] = useState(false)
  const [isEdit,setIsEdit] = useState(null)
  const [isDelete,setIsDelete] = useState(false)

  const clickEditBtn = (row) =>{
    setSheetOpened(true)
    setIsEdit(row)
  }

  const clickDeleteBtn = async (row) =>{
    try{
      console.log("delete triggered")
      const result = await apiClient.delete(`/specialty/${row.id}`)
      setIsDelete(!isDelete)
      console.log("delete end")
    }catch(e){
        throw e;
    }
  }

  const actionBtn =   {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const selectedRow = row.original
  
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(selectedRow?.id)}
            >
              Copy Id
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={()=>clickEditBtn(selectedRow)}>Edit</DropdownMenuItem>
            <DropdownMenuItem onClick={()=>clickDeleteBtn(selectedRow)}>Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  }

  const columns: ColumnDef<Specialty>[] = [...SpecialtyColumns , actionBtn];

  useEffect(() => { 
    const fetchRationaleData = async ()=>{
      try{
      const result = await apiClient.get('/specialty')
            if(result.data){      
              setSpecialtyData(result.data)
            }
      }catch(error:any){
          throw error;
      }
    }
    fetchRationaleData()

  }, [sheetOpened,isDelete])
  

  return (
    <div className="flex flex-col gap-5  w-full">
        
        <div className="flex w-full justify-between">
            <PageTitle title="Rationale Specialty" />
            <Button onClick={()=>setSheetOpened(true)} className="">New Rationale</Button>
        </div>
        <DataTable columns={columns} data={specialtyData} />
        <OffCanvas isOpened={sheetOpened} setIsOpened={setSheetOpened}>
          <SpecialtyForm isEdit={isEdit} setSheetOpened={setSheetOpened} />
        </OffCanvas>
    </div>
  );
}
