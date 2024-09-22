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

const SpecialtySchema = z.object({
  code: z.string().nonempty({ message: "Specialty code is required" }),
});

export function SpecialtyForm({ isEdit, setSheetOpened }: any) {
  const form = useForm<z.infer<typeof SpecialtySchema>>({
    resolver: zodResolver(SpecialtySchema),
    defaultValues: {
      code: isEdit?.code || "",
    },
  });

  async function onSubmit(data: z.infer<typeof SpecialtySchema>) {
    const postData = {
      code: data.code,
    };

    try {
      if (isEdit) {
        // PUT method for editing
        await apiClient.put(`/specialty-code/${isEdit.id}`, postData);
        console.log("Editable data submitted:", postData);
      } else {
        // POST method for new data
        await apiClient.post("/specialty-code", postData);
        console.log("New data submitted:", postData);
      }
      setSheetOpened(false);
    } catch (error) {
      console.error("Error submitting form:", error);
      // Optionally handle error feedback for the user
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 py-3">
        <FormField
          control={form.control}
          name="code"
          render={({ field }) => (
            <FormItem className="flex flex-col mb-2">
              <FormLabel>Code</FormLabel>
              <FormControl>
                <Input type="text" placeholder="Specialty Code" {...field} />
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
