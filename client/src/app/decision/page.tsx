"use client";

import { DataTable } from "@/components/DataTable";
import { ColumnDef } from "@tanstack/react-table";
import React, { useState,useEffect } from "react";
import PageTitle from "@/components/PageTitle";
import { cn } from "@/lib/utils";
import apiClient from "@/apiClient/apiClient";
import { decisionColumns, RationaleColumns } from "@/constants/TableColumns";

type Props = {};
type Decision = {
  id: number;
  decisionText: string;
  decisionId: number;
  rationaleId: number;
  createdAt: string;
  updatedAt: string;
};


const columns: ColumnDef<Decision>[] = decisionColumns;

export default function OrdersPage({}: Props) {

  const [decisionData , setDecisionData] = useState([])

  useEffect(() => { 
    const fetchDecisionData = async ()=>{
      try{
      const result = await apiClient.get('/decision')
            if(result.data){      
              console.log(result.data)
              setDecisionData(result.data)
            }
      }catch(error:any){
          throw error;
      }
       
    }

    fetchDecisionData()

  }, [])
  

  return (
    <div className="flex flex-col gap-5  w-full">
        <PageTitle title="Rationale Decision" />
        <DataTable columns={columns} data={decisionData} />
    </div>
  );
}
