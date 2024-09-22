"use client";

import { DataTable } from "@/components/DataTable";
import { ColumnDef } from "@tanstack/react-table";
import React, { useState,useEffect } from "react";
import PageTitle from "@/components/PageTitle";
import { cn } from "@/lib/utils";
import apiClient from "@/apiClient/apiClient";
import { modifierColumn } from "@/constants/TableColumns";

type Props = {};
type Modifier = {
  id: number;
  modifierList: string;
  rationaleId: number;
  createdAt: string;
  updatedAt: string;
};

const columns: ColumnDef<Modifier>[] = modifierColumn;

export default function OrdersPage({}: Props) {

  const [modifierData , setModifierData] = useState([])

  useEffect(() => { 
    const fetchModifierData = async ()=>{
      try{
      const result = await apiClient.get('/modifier')
            if(result.data){      
              console.log(result.data)
              setModifierData(result.data)
            }
      }catch(error:any){
          throw error;
      }
       
    }

    fetchModifierData()

  }, [])
   

  return (
    <div className="flex flex-col gap-5  w-full">
        <PageTitle title="Rationale Modifier" />
        <DataTable columns={columns} data={modifierData} />
    </div>
  );
}
