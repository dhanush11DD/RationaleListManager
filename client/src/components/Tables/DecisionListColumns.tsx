"use client";

import { DataTable } from "@/components/DataTable";
import { ColumnDef } from "@tanstack/react-table";
import React, { useState,useEffect } from "react";
import PageTitle from "@/components/PageTitle";
import { cn } from "@/lib/utils";
import apiClient from "@/apiClient/apiClient";
import { DecisionListColumns } from "@/constants/TableColumns";

type Props = {};
type DecisionList = {
  id: number;
  decision:string;
  createdAt: string;
  updatedAt: string;
};

const columns: ColumnDef<DecisionList>[] = DecisionListColumns;

export default function DecisionListPage({}: Props) {

  const [decisionListData , setDecisionListData] = useState([])

  useEffect(() => { 
    const fetchDecisionListData = async ()=>{
      try{
      const result = await apiClient.get('/decision-list')
            if(result.data){      
              console.log(result.data)
              setDecisionListData(result.data)
            }
      }catch(error:any){
          throw error;
      }
       
    }

    fetchDecisionListData()

  }, [])
  

  return (
    <div className="flex flex-col gap-5  w-full">
        <PageTitle title="Decision List " />
        <DataTable columns={columns} data={decisionListData} />
    </div>
  );
}
