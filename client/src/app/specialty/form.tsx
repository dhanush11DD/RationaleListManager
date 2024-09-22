"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
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

const SpecialtySchema = z.object({
  specialty_code: z.string().nonempty({ message: "Specialty code is required" }),
  rationale_id: z.string().nonempty({ message: "Rationale ID is required" }),
  enable: z.boolean(),
});

export function SpecialtyForm({ isEdit, setSheetOpened }: any) {
  const [rationaleData, setRationaleData] = useState([]);
  const [specialtyCodeData, setSpecialtyCodeData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [rationaleResult, specialtyCodeResult] = await Promise.all([
          apiClient.get("/rationale"),
          apiClient.get("/specialty-code"),
        ]);

        if (rationaleResult.data) setRationaleData(rationaleResult.data);
        if (specialtyCodeResult.data) setSpecialtyCodeData(specialtyCodeResult.data);
      } catch (error: any) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const form = useForm<z.infer<typeof SpecialtySchema>>({
    resolver: zodResolver(SpecialtySchema),
    defaultValues: {
      specialty_code: isEdit?.specialtyCodeId || "",
      rationale_id: isEdit?.rationaleId || "",
      enable: isEdit?.enable ?? true,
    },
  });

  const onSubmit = async (data: z.infer<typeof SpecialtySchema>) => {
    const postData = {
      enable: data.enable,
      rationaleId: parseInt(data.rationale_id),
      specialtyCodeId: parseInt(data.specialty_code),
    };

    try {
      if (isEdit) {
        await apiClient.put(`/specialty/${isEdit.id}`, postData);
        console.log("Editable data submitted:", postData);
      } else {
        await apiClient.post("/specialty", postData);
        console.log("New data submitted:", postData);
      }
      form.reset();
    } catch (error: any) {
      console.error("Error submitting data:", error);
    } finally {
      setSheetOpened(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 py-3">
        {/* Specialty Code Select Field */}
        <FormField
          control={form.control}
          name="specialty_code"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Specialty Code</FormLabel>
              <FormControl>
                <select
                  {...field}
                  value={isEdit ? isEdit.specialtyCodeId : field.value}
                  onChange={field.onChange}
                  className="form-select"
                >
                  <option value="">Select a Specialty Code</option>
                  {specialtyCodeData.map((item, i) => (
                    <option key={i} value={item.id}>
                      {item.code}
                    </option>
                  ))}
                </select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Rationale ID Select Field */}
        <FormField
          control={form.control}
          name="rationale_id"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Rationale ID</FormLabel>
              <FormControl>
                <select
                  {...field}
                  value={isEdit ? isEdit.rationaleId : field.value}
                  onChange={field.onChange}
                  className="form-select"
                >
                  <option value="">Select a Rationale ID</option>
                  {rationaleData.map((item, i) => (
                    <option key={i} value={item.id}>
                      {item.id}
                    </option>
                  ))}
                </select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Enable Switch */}
        <FormField
          control={form.control}
          name="enable"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Enable</FormLabel>
              <FormControl>
                <Switch checked={field.value} onCheckedChange={field.onChange} />
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
