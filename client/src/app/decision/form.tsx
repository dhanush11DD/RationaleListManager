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
import { Input } from "@/components/ui/input"
import apiClient from "@/apiClient/apiClient"
import { useEffect, useState } from "react"

const SpecialtySchema = z.object({
  decision_text : z.string().nonempty({ message: "decision text is required" }),
  decision_id: z.string().nonempty({ message: "decision code is required" }),
  rationale_id: z.string().nonempty({ message: "Rationale ID is required" })
});

export function SpecialtyForm({ isEdit,setSheetOpened }: any) {
  const [rationaleData, setRationaleData] = useState([]);
  const [decisionList, setDecisionListData] = useState([]);

  useEffect(() => {
    const fetchRationaleData = async () => {
      try {
        const rationaleResult = await apiClient.get("/rationale");
        const DecisionListResult = await apiClient.get("/decision-list");

        if (rationaleResult.data) {
          setRationaleData(rationaleResult.data);
        }
        if (DecisionListResult.data) {
          setDecisionListData(DecisionListResult.data);
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
      decision_text:isEdit?.decision_text || "",
      decision_id: isEdit?.decision_id || "",
      rationale_id: isEdit?.rationale_id || "",
    },
  });

  async function onSubmit(data: z.infer<typeof SpecialtySchema>) {
    if (isEdit) {
      // PUT method for editing
      const postData = {
        rationaleId : parseInt(data.rationale_id ),
        decisionId : parseInt(data.decision_id),
        decisionText : data.decision_text
      }
      await apiClient.put(`/decision/${isEdit.id}`, postData);
      console.log("Editable data submitted:", postData);
      setSheetOpened(false)
    } else {
      // POST method for new data
      console.log(data)
      const postData = {
        rationaleId : parseInt(data.rationale_id ),
        decisionId : parseInt(data.decision_id),
        decisionText : data.decision_text
      }
      await apiClient.post("/decision", postData);
      console.log("New data submitted:", postData);
      setSheetOpened(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 py-3">
      <FormField
          control={form.control}
          name="decision_text"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="decision_text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="decision_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Specialty Code</FormLabel>
              <Select
                onValueChange={field.onChange}
                value={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue
                      placeholder="Select a Decison Id"
                      // Reflect selected value in UI
                      defaultValue={field.value || "Select a Decison Id"}
                    >
                      {field.value
                        ? decisionList.find(
                            (item: any) => item.id === field.value
                          )?.id
                        : "Select a Decison Id"}
                    </SelectValue>
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {decisionList.map((item, i) => (
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
