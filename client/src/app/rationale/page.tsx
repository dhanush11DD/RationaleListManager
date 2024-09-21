"use client";

import { DataTable } from "@/components/DataTable";
import { ColumnDef } from "@tanstack/react-table";
import React, { useState,useEffect } from "react";
import PageTitle from "@/components/PageTitle";
import { cn } from "@/lib/utils";
import apiClient from "@/apiClient/apiClient";
import { RationaleColumns } from "@/constants/TableColumns";

type Props = {};
type Rationale = {
  id: number;
  module: string;
  source: string | null;
  rationaleSummary: string;
  rationaleText: string;
  enable: boolean;
  groupId: number;
  sequence: number;
  createdAt: string; // or Date if you plan to convert to a Date object
  updatedAt: string; // or Date if you plan to convert to a Date object
};

const columns: ColumnDef<Rationale>[] = RationaleColumns;

export default function RationalePage({}: Props) {

  const [rationaleData , setRationaleData] = useState([])

  useEffect(() => { 
    const fetchRationaleData = async ()=>{
      try{
      const result = await apiClient.get('/rationale')
            if(result.data){      
              console.log(result.data)
              setRationaleData(result.data)
            }
      }catch(error:any){
          throw error;
      }
       
    }

    fetchRationaleData()

  }, [])
  

  return (
    <div className="flex flex-col gap-5  w-full">
        <PageTitle title="Rationale" />
        <DataTable columns={columns} data={rationaleData} />
    </div>
  );
}
