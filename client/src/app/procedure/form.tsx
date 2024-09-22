"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import apiClient from "@/apiClient/apiClient";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";

const SpecialtySchema = z.object({
  service_from: z.string().nonempty({ message: "Service code from is required" }),
  service_to: z.string().nonempty({ message: "Service code to is required" }),
  service_list: z.string().nonempty({ message: "Service code list is required" }),
  rationale_id: z.string().nonempty({ message: "Rationale ID is required" }),
});

export function SpecialtyForm({ isEdit, setSheetOpened }: any) {
  const [rationaleData, setRationaleData] = useState([]);

  useEffect(() => {
    const fetchRationaleData = async () => {
      try {
        const rationaleResult = await apiClient.get("/rationale");
        if (rationaleResult.data) {
          setRationaleData(rationaleResult.data);
        }
      } catch (error) {
        console.error("Error fetching rationale data:", error);
      }
    };

    fetchRationaleData();
  }, []);

  const form = useForm<z.infer<typeof SpecialtySchema>>({
    resolver: zodResolver(SpecialtySchema),
    defaultValues: {
      service_from: isEdit?.service_from || "",
      service_to: isEdit?.service_to || "",
      service_list: isEdit?.service_list || "",
      rationale_id: isEdit?.rationale_id || "",
    },
  });

  async function onSubmit(data: z.infer<typeof SpecialtySchema>) {
    const postData = {
      rationaleId: parseInt(data.rationale_id),
      serviceCodeFrom: parseInt(data.service_from),
      serviceCodeTo: parseInt(data.service_to),
      serviceCodeList: parseInt(data.service_list),
    };

    try {
      if (isEdit) {
        await apiClient.put(`/procedure/${isEdit.id}`, postData);
        console.log("Editable data submitted:", postData);
      } else {
        await apiClient.post("/procedure", postData);
        console.log("New data submitted:", postData);
      }
      setSheetOpened(false);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 py-3">
        <FormField
          control={form.control}
          name="service_from"
          render={({ field }) => (
            <FormItem className="flex flex-col mb-2">
              <FormLabel>Service Code From</FormLabel>
              <FormControl>
                <Input type="text" placeholder="Service Code From" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="service_to"
          render={({ field }) => (
            <FormItem className="flex flex-col mb-2">
              <FormLabel>Service Code To</FormLabel>
              <FormControl>
                <Input type="text" placeholder="Service Code To" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="service_list"
          render={({ field }) => (
            <FormItem className="flex flex-col mb-2">
              <FormLabel>Service Code List</FormLabel>
              <FormControl>
                <Input type="text" placeholder="Service Code List" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="rationale_id"
          render={({ field }) => (
            <FormItem className="flex flex-col mb-2">
              <FormLabel>Rationale ID</FormLabel>
              <FormControl>
                <select {...field} className="form-select">
                  <option value="">Select a Rationale ID</option>
                  {rationaleData.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.id}
                    </option>
                  ))}
                </select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
