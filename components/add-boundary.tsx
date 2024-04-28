"use client";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { BoundaryProps } from "./boundary";
import { Button } from "./ui/button";
import { Dialog, DialogClose, DialogContent, DialogTrigger } from "./ui/dialog";
import { Input } from "./ui/input";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Slider } from "./ui/slider";

const VIBRANT_COLORS = [
  "#000000", // Vivid Orange
  "#FFC300", // Vivid Yellow
  "#FF5733", // Vivid Red
  "#FF006E", // Vivid Pink
  "#00A86B", // Vivid Green
  "#0E6EB8", // Vivid Blue
  "#AF47FF", // Vivid Purple
  "#FF33A1", // Vivid Magenta
  "#FF7F50", // Coral
  "#40E0D0", // Turquoise
  "#FFD700", // Gold
  "#9370DB", // Medium Purple
];

type Props = {
  changeTopBoundary: (boundary: BoundaryProps) => void;
};

const FormSchema = z.object({
  name: z.string(),
  color: z.string(),
  radius: z.number().min(80).max(400).default(80),
});

export const AddBoundary = ({ changeTopBoundary }: Props) => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      color: "#000000",
      radius: 80,
    },
  });

  function handleSubmit(data: z.infer<typeof FormSchema>) {
    const boundary = {
      name: data.name,
      color: data.color,
      radius: data.radius,
    };

    changeTopBoundary(boundary);
    localStorage.setItem("boundary", JSON.stringify(boundary));
    console.log(boundary);
    form.reset();
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default" className="button2">
          Yeni Sınır Ekle
        </Button>
      </DialogTrigger>
      <DialogContent className="w-max p-6 z-[99999]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel className="text-2xl font-semibold leading-none tracking-tight">Başlık</FormLabel>
                  <FormControl>
                    <Input type="text" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="color"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel className="text-2xl font-semibold leading-none tracking-tight">Renk</FormLabel>

                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="grid grid-flow-col grid-rows-2 space-y-2"
                    >
                      {VIBRANT_COLORS.map((color) => (
                        <FormItem key={color} className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value={color} />
                          </FormControl>
                          <FormLabel className="font-normal">
                            <div
                              className="border rounded-sm shadow-sm aspect-square size-8 p-0.5"
                              style={{
                                backgroundColor: color,
                              }}
                            ></div>
                          </FormLabel>
                        </FormItem>
                      ))}
                    </RadioGroup>
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="radius"
              render={({ field: { value, onChange } }) => (
                <FormItem className="space-y-3">
                  <FormLabel className="text-2xl font-semibold leading-none tracking-tight">
                    Genişlik - {value}
                  </FormLabel>
                  <FormControl>
                    <Slider
                      min={80}
                      max={400}
                      step={1}
                      defaultValue={[value]}
                      onValueChange={(vals) => {
                        onChange(vals[0]);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogClose asChild>
              <Button type="submit">Oluştur</Button>
            </DialogClose>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
