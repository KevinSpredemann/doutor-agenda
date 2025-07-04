import { z } from "zod";

export const upsertPatientSchema = z.object({
  id: z.string().uuid().optional(),
  name: z.string().trim().min(1, "Nome é obrigatório"),
  email: z.string().email("Email inválido"),
  phoneNumber: z.string().trim().min(1, "Telefone é obrigatório"),
  sex: z.enum(["male", "female"], {
    errorMap: () => ({ message: "Sexo é obrigatório" }),
  }),
});

export type UpsertPatientSchema = z.infer<typeof upsertPatientSchema>;
