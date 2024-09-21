"use client";

import { DataTable } from "@/components/DataTable";
import { ColumnDef } from "@tanstack/react-table";
import React, { useState,useEffect } from "react";
import PageTitle from "@/components/PageTitle";
import { cn } from "@/lib/utils";
import apiClient from "@/apiClient/apiClient";
import { RationaleColumns, SpecialtyColumns } from "@/constants/TableColumns";

type Props = {};

type Specialty = {
  id: number;
  enable: boolean;
  specialtyCodeId: number;
  rationaleId: number;
  createdAt: string;
  updatedAt: string;
};


const columns: ColumnDef<Specialty>[] = SpecialtyColumns;

export default function OrdersPage({}: Props) {

  const [specialtyData , setSpecialtyData] = useState([])

  useEffect(() => { 
    const fetchRationaleData = async ()=>{
      try{
      const result = await apiClient.get('/specialty')
            if(result.data){      
              console.log(result.data)
              setSpecialtyData(result.data)
            }
      }catch(error:any){
          throw error;
      }
       
    }

    fetchRationaleData()

  }, [])
  

  return (
    <div className="flex flex-col gap-5  w-full">
        <PageTitle title="Rationale Specialty" />
        <DataTable columns={columns} data={specialtyData} />
    </div>
  );
}
