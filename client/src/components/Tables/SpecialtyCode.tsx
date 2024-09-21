"use client";

import { DataTable } from "@/components/DataTable";
import { ColumnDef } from "@tanstack/react-table";
import React, { useState,useEffect } from "react";
import PageTitle from "@/components/PageTitle";
import { cn } from "@/lib/utils";
import apiClient from "@/apiClient/apiClient";
import { RationaleColumns, SpecialtyCodeColumns } from "@/constants/TableColumns";

type Props = {};
type SpecialtyCode = {
  id: number;
  code:string;
};

const columns: ColumnDef<SpecialtyCode>[] = SpecialtyCodeColumns;

export default function SpecialtyCodePage({}: Props) {

  const [specialtyCodeData , setSpecialtyCodeData] = useState([])

  useEffect(() => { 
    const fetchSpecialtyCodeData = async ()=>{
      try{
      const result = await apiClient.get('/specialty-code')
            if(result.data){      
              console.log(result.data)
              setSpecialtyCodeData(result.data)
            }
      }catch(error:any){
          throw error;
      }
       
    }

    fetchSpecialtyCodeData()

  }, [])
  

  return (
    <div className="flex flex-col gap-5  w-full">
        <PageTitle title="Specialty Code" />
        <DataTable columns={columns} data={specialtyCodeData} />
    </div>
  );
}
