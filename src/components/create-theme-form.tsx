"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Image from "next/image";
import { generateScratchCardTheme, ScratchCardThemeOutput } from "@/ai/flows/generate-scratch-card-theme";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  themePrompt: z.string().min(10, {
    message: "Theme prompt must be at least 10 characters.",
  }),
});

export function CreateThemeForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<ScratchCardThemeOutput | null>(null);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      themePrompt: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setResult(null);
    try {
      const theme = await generateScratchCardTheme(values);
      setResult(theme);
    } catch (error) {
      console.error("Error generating theme:", error);
      toast({
        title: "Error",
        description: "Failed to generate theme. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="space-y-8">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="themePrompt"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg">Scratch Card Theme Prompt</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="e.g., A pirate treasure hunt on a tropical island"
                    className="resize-none"
                    rows={4}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Generating..." : "Generate Theme"}
          </Button>
        </form>
      </Form>

      {isLoading && (
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-1/2" />
            <Skeleton className="h-4 w-3/4" />
          </CardHeader>
          <CardContent>
            <Skeleton className="w-full aspect-video rounded-lg" />
          </CardContent>
        </Card>
      )}

      {result && (
        <Card>
          <CardHeader>
            <CardTitle>Generated Theme</CardTitle>
            <CardDescription>{result.themeDescription}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="aspect-video w-full relative overflow-hidden rounded-lg">
                <Image
                    src={result.imageUrl}
                    alt={result.themeDescription}
                    fill
                    className="object-cover"
                />
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
