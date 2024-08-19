"use client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { ValidFieldNames } from "@/types";

const WAITLIST_API_URL = "/api/waitlist/";
const WaitlistSchema = z.object({
  email: z.string().min(2).max(50),
});
const fieldErrorMapping: Record<string, ValidFieldNames> = {
  email: "email",
};

type ErrorMessage = {
  message?: string;
  code?: string;
};

type FieldErrors = {
  [key: string]: ErrorMessage[] | undefined;
};

const WaitlistForm = () => {
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<FieldErrors | null>(null);
  const form = useForm<z.infer<typeof WaitlistSchema>>({
    resolver: zodResolver(WaitlistSchema),
    defaultValues: {
      email: "",
    },
  });
  const handleSubmit = async (values: z.infer<typeof WaitlistSchema>) => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    };
    const response = await fetch(WAITLIST_API_URL, requestOptions);
    const result = await response.json();

    if (response.ok) {
      setMessage("Thank you for joining");
      setErrors(null);
    } else {
      console.log("Encountered an error", result);
      setErrors(result);
    }
  };

  useEffect(() => {
    console.log("Error Found:", errors);
    if (errors) {
      const fieldWithError = Object.keys(fieldErrorMapping).find((field) =>
        errors.hasOwnProperty(field)
      );
      if (fieldWithError) {
        // Use the ValidFieldNames type to ensure the correct field names
        form.setError(fieldErrorMapping[fieldWithError], {
          type: "server",
          message: errors[fieldWithError]?.[0].message,
        });
      }
    }
  }, [errors, form]);

  return (
    <Form {...form}>
      <Card className="w-[350px]">
        <div className="text-green-400">{message}</div>
        <div className="text-red-400">
          {errors ? "There was an error with your request" : ""}
        </div>
        <CardHeader>
          <CardTitle>Create Your Waitlist</CardTitle>
          <CardDescription>Add user to waitlist</CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-8"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter email" {...field} />
                  </FormControl>
                  <FormDescription>Customer's email address</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="w-full bg-primary bg-green-400" type="submit">
              Add to Waitlist
            </Button>
          </form>
        </CardContent>
      </Card>
    </Form>
  );
};
export default WaitlistForm;
