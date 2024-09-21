"use client";

import { DataTable } from "@/components/DataTable";
import { ColumnDef } from "@tanstack/react-table";
import React, { useState,useEffect } from "react";
import PageTitle from "@/components/PageTitle";
import { cn } from "@/lib/utils";
import apiClient from "@/apiClient/apiClient";
import {ProcedureColumn} from "@/constants/TableColumns";

type Props = {};
type Procedure = {
  id: number;
  serviceCodeFrom: number;
  serviceCodeTo: number;
  serviceCodeList: number;
  rationaleId: number;
  createdAt: string;
  updatedAt: string;
};

const columns: ColumnDef<Procedure>[] = ProcedureColumn;

export default function OrdersPage({}: Props) {

  const [procedureData , setProcedureData] = useState([])

  useEffect(() => { 
    const fetchProcedureData = async ()=>{
      try{
      const result = await apiClient.get('/procedure')
            if(result.data){      
              console.log(result.data)
              setProcedureData(result.data)
            }
      }catch(error:any){
          throw error;
      }
       
    }

    fetchProcedureData()

  }, [])
  

  return (
    <div className="flex flex-col gap-5  w-full">
        <PageTitle title="Rationale Procedure" />
        <DataTable columns={columns} data={procedureData} />
    </div>
  );
}
