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
import { Input } from "@/components/ui/input";
import { useState } from "react";

const SpecialtySchema = z.object({
  decision: z.string().nonempty({ message: "Decision is required" }),
});

export function SpecialtyForm({ isEdit, setSheetOpened }: any) {
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof SpecialtySchema>>({
    resolver: zodResolver(SpecialtySchema),
    defaultValues: {
      decision: isEdit?.decision || "",
    },
  });

  async function onSubmit(data: z.infer<typeof SpecialtySchema>) {
    setLoading(true);
    const postData = {
      decision: data.decision,
    };

    try {
      if (isEdit) {
        // PUT method for editing
        await apiClient.put(`/decision-list/${isEdit.id}`, postData);
        console.log("Editable data submitted:", postData);
      } else {
        // POST method for new data
        await apiClient.post("/decision-list", postData);
        console.log("New data submitted:", postData);
      }
      setSheetOpened(false);
    } catch (error) {
      console.error("Error submitting form:", error);
      // Optionally, handle error feedback for the user
    } finally {
      setLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 py-3">
        <FormField
          control={form.control}
          name="decision"
          render={({ field }) => (
            <FormItem className="flex flex-col mb-2">
              <FormLabel>Decision</FormLabel>
              <FormControl>
                <Input type="text" placeholder="Decision" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={loading}>
          {loading ? "Submitting..." : "Submit"}
        </Button>
      </form>
    </Form>
  );
}
