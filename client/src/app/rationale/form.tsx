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
import { Input } from "@/components/ui/input";

// Define type for `isEdit` for better type safety

const SpecialtySchema = z.object({
  module: z.string().nonempty({ message: "Module is required" }),
  source: z.string().optional(),
  rationaleSummary: z.string().nonempty({ message: "Rationale Summary is required" }),
  rationaleText: z.string().nonempty({ message: "Rationale Text is required" }),
  groupId: z
    .string()
    .nonempty({ message: "Group ID is required" })
    .transform((val) => parseInt(val, 10)), // Ensure valid number
  sequence: z
    .string()
    .nonempty({ message: "Sequence is required" })
    .transform((val) => parseInt(val, 10)),
  enable: z.boolean(),
});

export function SpecialtyForm({
  isEdit,
  setSheetOpened,
}: {
  isEdit;
  setSheetOpened: (open: boolean) => void;
}) {
  const form = useForm<z.infer<typeof SpecialtySchema>>({
    resolver: zodResolver(SpecialtySchema),
    defaultValues: {
      module: isEdit?.module || "", // Default to empty string if not editing
      source: isEdit?.source || "",
      rationaleSummary: isEdit?.rationaleSummary || "",
      rationaleText: isEdit?.rationaleText || "",
      groupId: isEdit?.groupId?.toString() || "", // Ensure it's a string for the Input
      sequence: isEdit?.sequence?.toString() || "",
      enable: isEdit?.enable ?? true,
    },
  });

  async function onSubmit(data: z.infer<typeof SpecialtySchema>) {
    const postData = {
      ...data,
      groupId: parseInt(data.groupId),
      sequence: parseInt(data.sequence),
    };

    try {
      if (isEdit?.id) {
        await apiClient.put(`/rationale/${isEdit.id}`, postData);
        console.log("Editable data submitted:", postData);
      } else {
        await apiClient.post("/rationale", postData);
        console.log("New data submitted:", postData);
      }
      form.reset(); // Reset the form after submission
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
          name="module"
          render={({ field }) => (
            <FormItem className="flex flex-col mb-2">
              <FormLabel>Module</FormLabel>
              <FormControl>
                <Input type="text" placeholder="Medical Review" defaultValue={isEdit ? isEdit.module : field.value} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="source"
          render={({ field }) => (
            <FormItem className="flex flex-col mb-2">
              <FormLabel>Source</FormLabel>
              <FormControl>
                <Input type="text" placeholder="Source" defaultValue={isEdit ? isEdit.source : field.value} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="rationaleSummary"
          render={({ field }) => (
            <FormItem className="flex flex-col mb-2">
              <FormLabel>Rationale Summary</FormLabel>
              <FormControl>
                <Input type="text" placeholder="Rationale Summary" defaultValue={isEdit ? isEdit.rationaleSummary : field.value} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="rationaleText"
          render={({ field }) => (
            <FormItem className="flex flex-col mb-2">
              <FormLabel>Rationale Text</FormLabel>
              <FormControl>
                <Input type="text" placeholder="Rationale Text" defaultValue={isEdit ? isEdit.rationaleText : field.value} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="groupId"
          render={({ field }) => (
            <FormItem className="flex flex-col mb-2">
              <FormLabel>Group ID</FormLabel>
              <FormControl>
                <Input type="number" placeholder="Group ID" defaultValue={isEdit ? isEdit.groupId : field.value} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="sequence"
          render={({ field }) => (
            <FormItem className="flex flex-col mb-2">
              <FormLabel>Sequence</FormLabel>
              <FormControl>
                <Input type="number" placeholder="Sequence" defaultValue={isEdit ? isEdit.sequence : field.value} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="enable"
          render={({ field }) => (
            <FormItem className="flex flex-col mb-2">
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
