import { z } from "zod";

export const ageSchema = z.number().nonnegative();

export const scenarioSchema = z.object({
  name: z.string(),
  price: z.number(),
  dp: z.number(),
  tenor: z.number(),
  interest: z.number(),
});
//dengan zod, langsung bisa bikin types interface nya otomatis
export type Scenario = z.infer<typeof scenarioSchema>;

export const simulationSchema = z.object({
  income: z.number(),
  expense: z.number(),
  simulationName: z.string(),
  category: z.string(),
  scenarios: z.array(scenarioSchema)
});
export type SimulationType = z.infer<typeof simulationSchema>

export const updateSimulationSchema = z.object({
  simulationName: z.string().min(1),
});

export type UpdateSimulationType = z.infer<
  typeof updateSimulationSchema
>;