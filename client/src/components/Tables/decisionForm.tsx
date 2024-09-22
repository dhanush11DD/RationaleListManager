"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import apiClient from "@/apiClient/apiClient"
import { Input } from "@/components/ui/input"

const SpecialtySchema = z.object({
  decision: z.string().nonempty({ message: "Sercice code from is required" })
});

export function SpecialtyForm({ isEdit,setSheetOpened }: any) {
  

  const form = useForm<z.infer<typeof SpecialtySchema>>({
    resolver: zodResolver(SpecialtySchema),
    defaultValues: {
      decision: isEdit?.decision || "",
    },
  });

  async function onSubmit(data: z.infer<typeof SpecialtySchema>) {
    if (isEdit) {
      // PUT method for editing
      const postData = {
        decision : data.decision,
      }
      await apiClient.put(`/decision-list/${isEdit.id}`, postData);
      console.log("Editable data submitted:", postData);
      setSheetOpened(false)
    } else {
      // POST method for new data
      const postData = {
        decision : data.decision
      }
      await apiClient.post("/decision-list", postData);
      console.log("New data submitted:", postData);
      setSheetOpened(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 py-3">
      <FormField
          control={form.control}
          name="decision"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Decision</FormLabel>
              <FormControl>
                <Input type="text" placeholder="Decision" {...field} />
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
