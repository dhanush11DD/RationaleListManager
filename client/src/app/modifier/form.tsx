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
  modifier_list: z.string().nonempty({ message: "Modifier list is required" }),
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
      modifier_list: isEdit?.modifierList || "",
      rationale_id: isEdit?.rationaleId || "",
    },
  });

  useEffect(() => {
    if (isEdit) {
      form.reset({
        modifier_list: isEdit?.modifierList,
        rationale_id: isEdit?.rationaleId.toString(),
      });
      console.log(form.formState.defaultValues)
    } else {
      form.reset({
        modifier_list: "",
        rationale_id:  "",
      });
    }
  }, [isEdit]);

  async function onSubmit(data: z.infer<typeof SpecialtySchema>) {
    const postData = {
      rationaleId: parseInt(data.rationale_id),
      modifierList: data.modifier_list,
    };

    try {
      if (isEdit) {
        await apiClient.put(`/modifier/${isEdit.id}`, postData);
        console.log("Editable data submitted:", postData);
        isEdit = null
      } else {
        await apiClient.post("/modifier", postData);
        console.log("New data submitted:", postData);
      }
      form.reset(
        {
          modifier_list:  "",
          rationale_id:  "",
        }
      )
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
          name="modifier_list"
          render={({ field }) => (
            <FormItem className="flex flex-col mb-2">
              <FormLabel>Modifier List</FormLabel>
              <FormControl>
                <Input type="text" placeholder="Modifier List" {...field} />
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
                <select
                  {...field}
                  className="form-select"
                >
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
