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
  modifier_list: z.string().nonempty({ message: "Specialty code is required" }),
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
      modifier_list: isEdit?.modifier_list || "",
      rationale_id: isEdit?.rationale_id || "",
    },
  });

  async function onSubmit(data: z.infer<typeof SpecialtySchema>) {
    if (isEdit) {
      // PUT method for editing
      const postData = {
        rationaleId : parseInt(data.rationale_id ),
        modifierList : data.modifier_list
      }
      await apiClient.put(`/modifier/${isEdit.id}`, postData);
      console.log("Editable data submitted:", postData);
      setSheetOpened(false)
    } else {
      // POST method for new data
      const postData = {
        rationaleId : parseInt(data.rationale_id ),
        modifierList : data.modifier_list
      }
      await apiClient.post("/modifier", postData);
      console.log("New data submitted:", postData);
      setSheetOpened(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 py-3">
      <FormField
          control={form.control}
          name="modifier_list"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Modifier List</FormLabel>
              <FormControl>
                <Input placeholder="modifier_list" {...field} />
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
