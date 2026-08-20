import { z } from "zod";

export const scenarioSchema = z
  .object({
    name: z.string().min(1, "Nama skenario wajib diisi"),
    price: z.number().positive("Harga harus lebih dari 0"),
    dp: z.number().nonnegative("DP tidak boleh negatif"),
    tenor: z.number().positive("Tenor harus lebih dari 0"),
    interest: z.number().nonnegative("Bunga tidak boleh negatif"),
  })
  .refine((data) => data.dp <= data.price, {
    message: "DP tidak boleh lebih besar dari harga",
    path: ["dp"],
  });
//dengan zod, langsung bisa bikin types interface nya otomatis
export type Scenario = z.infer<typeof scenarioSchema>;

export const simulationSchema = z
  .object({
    income: z.number().positive("Penghasilan harus lebih dari 0"),
    expense: z.number().nonnegative("Pengeluaran tidak boleh negatif"),
    simulationName: z.string().min(1, "Nama simulasi wajib diisi"),
    category: z.string().min(1, "Kategori wajib diisi"),
    scenarios: z
      .array(scenarioSchema)
      .min(1, "Minimal satu skenario"),
  })
  .refine((data) => data.expense <= data.income, {
    message: "Pengeluaran tidak boleh lebih besar dari penghasilan",
    path: ["expense"],
  });
export type SimulationType = z.infer<typeof simulationSchema>

export const updateSimulationSchema = z.object({
  income: z.number(),
  expense: z.number(),
  simulationName: z.string().min(1),
  category: z.string().min(1),
  scenarios: z.array(scenarioSchema).min(1),
});
export type UpdateSimulationType = z.infer<typeof updateSimulationSchema>;