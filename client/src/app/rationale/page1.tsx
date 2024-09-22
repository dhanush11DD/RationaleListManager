"use client";

import { DataTable } from "@/components/DataTable";
import { ColumnDef } from "@tanstack/react-table";
import React, { useState,useEffect } from "react";
import PageTitle from "@/components/PageTitle";
import { cn } from "@/lib/utils";
import apiClient from "@/apiClient/apiClient";
import { RationaleColumns } from "@/constants/TableColumns";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"


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
  createdAt: string; 
  updatedAt: string; 
};


const columns: ColumnDef<Rationale>[] = RationaleColumns 

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

  const FormSchema = z.object({
    username: z.string().min(2, {
      message: "Username must be at least 2 characters.",
    }),
  })

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: "",
    },
  })

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    })
  }
  
  

  return (
    <div className="flex flex-col gap-5  w-full">
      <Sheet>
        <div className="flex w-full justify-between">
          <PageTitle title="Rationale" />
          <SheetTrigger asChild>
            <Button className="">New Rationale</Button>
          </SheetTrigger>
          
        </div>
        <DataTable columns={[... columns ,  ]} data={rationaleData} />
      
      <SheetContent className="min-w-full bg-transparent border-0 p-0 m-0">
        <div className="max-w-[400px] bg-white h-full ml-auto p-3">
        <SheetHeader>
          <SheetTitle>Edit profile</SheetTitle>
          <SheetDescription>
            Make changes to your profile here. Click save when you're done.
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4">
        <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button type="submit">Save changes</Button>
          </SheetClose>
        </SheetFooter>
        </div>

      </SheetContent>
    </Sheet>
    </div>
  );
}
