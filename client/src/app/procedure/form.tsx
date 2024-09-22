"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import apiClient from "@/apiClient/apiClient"
import { useEffect, useState } from "react"
import { Input } from "@/components/ui/input"

const SpecialtySchema = z.object({
  service_from: z.string().nonempty({ message: "Sercice code from is required" }),
  service_to: z.string().nonempty({ message: "Sercice code to is required" }),
  service_list: z.string().nonempty({ message: "Sercice code list is required" }),
  rationale_id: z.string().nonempty({ message: "Rationale ID is required" }),
});

export function SpecialtyForm({ isEdit,setSheetOpened }: any) {
  const [rationaleData, setRationaleData] = useState([]);

  useEffect(() => {
    const fetchRationaleData = async () => {
      try {
        const rationaleResult = await apiClient.get("/rationale");

        if (rationaleResult.data) {
          setRationaleData(rationaleResult.data);
        }
      } catch (error: any) {
        throw error;
      }
    };

    fetchRationaleData();
  }, []);

  const form = useForm<z.infer<typeof SpecialtySchema>>({
    resolver: zodResolver(SpecialtySchema),
    defaultValues: {
      service_from: isEdit?.service_from || 0,
      service_to: isEdit?.service_to || 0,
      service_list: isEdit?.service_list || 0,
      rationale_id: isEdit?.rationale_id || "",
    },
  });

  async function onSubmit(data: z.infer<typeof SpecialtySchema>) {
    if (isEdit) {
      // PUT method for editing
      const postData = {
        rationaleId : parseInt(data.rationale_id),
        serviceCodeFrom : parseInt(data.service_from),
        serviceCodeTo : parseInt(data.service_to),
        serviceCodeList : parseInt(data.service_list)
      }
      await apiClient.put(`/procedure/${isEdit.id}`, postData);
      console.log("Editable data submitted:", postData);
      setSheetOpened(false)
    } else {
      // POST method for new data
      const postData = {
        rationaleId : parseInt(data.rationale_id),
        serviceCodeFrom : parseInt(data.service_from),
        serviceCodeTo : parseInt(data.service_to),
        serviceCodeList : parseInt(data.service_list)
      }
      await apiClient.post("/procedure", postData);
      console.log("New data submitted:", postData);
      setSheetOpened(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 py-3">
      <FormField
          control={form.control}
          name="service_from"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Service Code From</FormLabel>
              <FormControl>
                <Input type="number" placeholder="service_from" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
          <FormField
          control={form.control}
          name="service_to"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Service Code From</FormLabel>
              <FormControl>
                <Input type="number" placeholder="service_to" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
              <FormField
          control={form.control}
          name="service_list"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Service Code List</FormLabel>
              <FormControl>
                <Input type="number" placeholder="service_list" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="rationale_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Rationale ID</FormLabel>
              <Select
                onValueChange={field.onChange}
                value={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue
                      placeholder="Select a Rationale ID"
                      defaultValue={field.value || "Select a Rationale ID"}
                    >
                      {field.value
                        ? rationaleData.find(
                            (item: any) => item.id === field.value
                          )?.id
                        : "Select a Rationale ID"}
                    </SelectValue>
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {rationaleData.map((item, i) => (
                    <SelectItem key={i} value={item?.id}>
                      {item?.id}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
