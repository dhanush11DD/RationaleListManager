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

const SpecialtySchema = z.object({
  decision_id: z.string().nonempty({ message: "Decision code is required" }),
  rationale_id: z.string().nonempty({ message: "Rationale ID is required" }),
});

export function SpecialtyForm({ isEdit, setSheetOpened }: any) {
  const [rationaleData, setRationaleData] = useState([]);
  const [decisionList, setDecisionListData] = useState([]);

  const form = useForm<z.infer<typeof SpecialtySchema>>({
    resolver: zodResolver(SpecialtySchema),
    defaultValues: {
      decision_id: "",
      rationale_id: "",
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [rationaleResult, decisionListResult] = await Promise.all([
          apiClient.get("/rationale"),
          apiClient.get("/decision-list"),
        ]);

        if (rationaleResult.data) setRationaleData(rationaleResult.data);
        if (decisionListResult.data) setDecisionListData(decisionListResult.data);
      } catch (error: any) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Update form when `isEdit` changes
  useEffect(() => {
    if (isEdit) {
      form.reset({
        decision_id: isEdit.decisionId.toString(),
        rationale_id: isEdit.rationaleId.toString(),
      });
      console.log(form.formState.defaultValues);
    } else {
      form.reset({
        decision_id: "",
        rationale_id: "",
      });
    }
  }, [isEdit]);

  const onSubmit = async (data: z.infer<typeof SpecialtySchema>) => {
    const postData = {
      rationaleId: parseInt(data.rationale_id),
      decisionId: parseInt(data.decision_id),
    };

    try {
      if (isEdit) {
        await apiClient.put(`/decision/${isEdit.id}`, postData);
        console.log("Editable data submitted:", postData);
        isEdit = null;
      } else {
        await apiClient.post("/decision", postData);
        console.log("New data submitted:", postData);
      }

      form.reset({
        decision_id: "",
        rationale_id: "",
      }); // Reset form after successful submission

    } catch (error: any) {
      console.error("Error submitting data:", error);
    } finally {
      setSheetOpened(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 py-3">
        {/* Decision ID Select Field */}
        <FormField
          control={form.control}
          name="decision_id"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Decision ID</FormLabel>
              <FormControl>
                <select
                  {...field}
                  value={field.value}
                  onChange={field.onChange}
                  className="form-select"
                >
                  <option value="">Select a Decision ID</option>
                  {decisionList.map((item, i) => (
                    <option key={i} value={item.id}>
                      {item.decision}
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
                  value={field.value}
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

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
