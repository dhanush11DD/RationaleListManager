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
import { Input } from "@/components/ui/input";
import apiClient from "@/apiClient/apiClient";
import { useEffect, useState } from "react";

const SpecialtySchema = z.object({
  decision_text: z.string().nonempty({ message: "Decision text is required" }),
  decision_id: z.string().nonempty({ message: "Decision code is required" }),
  rationale_id: z.string().nonempty({ message: "Rationale ID is required" }),
});

export function SpecialtyForm({ isEdit, setSheetOpened }: any) {
  const [rationaleData, setRationaleData] = useState([]);
  const [decisionList, setDecisionListData] = useState([]);

  const form = useForm<z.infer<typeof SpecialtySchema>>({
    resolver: zodResolver(SpecialtySchema),
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const rationaleResult = await apiClient.get("/rationale");
        const decisionListResult = await apiClient.get("/decision-list");

        if (rationaleResult.data) setRationaleData(rationaleResult.data);
        if (decisionListResult.data) setDecisionListData(decisionListResult.data);
      } catch (error: any) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (isEdit) {
      form.reset({
        decision_text: isEdit.decision_text || "",
        decision_id: isEdit.decision_id || "",
        rationale_id: isEdit.rationale_id || "",
      });
    }
  }, [isEdit]);

  async function onSubmit(data: z.infer<typeof SpecialtySchema>) {
    const postData = {
      rationaleId: parseInt(data.rationale_id),
      decisionId: parseInt(data.decision_id),
      decisionText: data.decision_text,
    };

    try {
      if (isEdit) {
        await apiClient.put(`/decision/${isEdit.id}`, postData);
        console.log("Editable data submitted:", postData);
      } else {
        await apiClient.post("/decision", postData);
        console.log("New data submitted:", postData);
      }
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
          name="decision_text"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Decision Text</FormLabel>
              <FormControl>
                <Input placeholder="Decision Text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="decision_id"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Decision ID</FormLabel>
              <FormControl>
                <select {...field}>
                  <option value="">Select a Decision ID</option>
                  {decisionList.map((item: any) => (
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
        <FormField
          control={form.control}
          name="rationale_id"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Rationale ID</FormLabel>
              <FormControl>
                <select {...field}>
                  <option value="">Select a Rationale ID</option>
                  {rationaleData.map((item: any) => (
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
