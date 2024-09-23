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
import { useEffect } from "react";

const SpecialtySchema = z.object({
  module: z.string().nonempty({ message: "Module is required" }),
  source: z.string().optional(),
  rationaleSummary: z.string().nonempty({ message: "Rationale Summary is required" }),
  rationaleText: z.string().nonempty({ message: "Rationale Text is required" }),
  groupId: z
    .string()
    .nonempty({ message: "Group ID is required" })
    .transform((val) => parseInt(val, 10)),
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
  isEdit: any; // Replace `any` with appropriate type if known
  setSheetOpened: (open: boolean) => void;
}) {
  const form = useForm<z.infer<typeof SpecialtySchema>>({
    resolver: zodResolver(SpecialtySchema),
    defaultValues: {
      module:  "",
      source: "",
      rationaleSummary:  "",
      rationaleText:  "",
      groupId:  "",
      sequence:  "",
      enable:  true,
    },
  });

  
  useEffect(() => {
    if (isEdit) {
      form.reset({
        module: isEdit?.module,
        source: isEdit?.source,
        rationaleSummary: isEdit?.rationaleSummary,
        rationaleText: isEdit?.rationaleText,
        groupId: isEdit?.groupId?.toString(),
        sequence: isEdit?.sequence?.toString(),
        enable: isEdit?.enable,
      });
      console.log(form.formState.defaultValues)
    } else {
      form.reset({
        module: "",
        source: "",
        rationaleSummary: "",
        rationaleText: "isEdit?.rationaleText",
        groupId: "",
        sequence: "",
        enable:  true,
      });
    }
  }, [isEdit]);

  // Handle form submission
  async function onSubmit(data: z.infer<typeof SpecialtySchema>) {
    const postData = {
      ...data,
      groupId: parseInt(data.groupId),
      sequence: parseInt(data.sequence),
    }

    try {
      if (isEdit?.id) {
        // Update existing record
        await apiClient.put(`/rationale/${isEdit.id}`, postData);
        console.log("Editable data submitted:", postData);
        isEdit = null
      } else {
        // Create new record
        await apiClient.post("/rationale", postData);
        console.log("New data submitted:", postData);
      }

      // Reset the form and close the sheet
      form.reset(
        {
          module:  "",
          source: "",
          rationaleSummary:  "",
          rationaleText:  "",
          groupId:  "",
          sequence:  "",
          enable:  true,
        }
      );
      setSheetOpened(false);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 py-3">
        {/* Module Field */}
        <FormField
          control={form.control}
          name="module"
          render={({ field }) => (
            <FormItem className="flex flex-col mb-2">
              <FormLabel>Module</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  onChange={field.onChange}
                  placeholder="Medical Review"
                  value={field.value}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Source Field */}
        <FormField
          control={form.control}
          name="source"
          render={({ field }) => (
            <FormItem className="flex flex-col mb-2">
              <FormLabel>Source</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  onChange={field.onChange}
                  placeholder="Source"
                  value={field.value}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Rationale Summary Field */}
        <FormField
          control={form.control}
          name="rationaleSummary"
          render={({ field }) => (
            <FormItem className="flex flex-col mb-2">
              <FormLabel>Rationale Summary</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  onChange={field.onChange}
                  placeholder="Rationale Summary"
                  value={field.value}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Rationale Text Field */}
        <FormField
          control={form.control}
          name="rationaleText"
          render={({ field }) => (
            <FormItem className="flex flex-col mb-2">
              <FormLabel>Rationale Text</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  onChange={field.onChange}
                  placeholder="Rationale Text"
                  value={field.value}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Group ID Field */}
        <FormField
          control={form.control}
          name="groupId"
          render={({ field }) => (
            <FormItem className="flex flex-col mb-2">
              <FormLabel>Group ID</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  onChange={field.onChange}
                  placeholder="Group ID"
                  value={field.value}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Sequence Field */}
        <FormField
          control={form.control}
          name="sequence"
          render={({ field }) => (
            <FormItem className="flex flex-col mb-2">
              <FormLabel>Sequence</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  onChange={field.onChange}
                  placeholder="Sequence"
                  value={field.value}
                />
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
            <FormItem className="flex flex-col mb-2">
              <FormLabel>Enable</FormLabel>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
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
