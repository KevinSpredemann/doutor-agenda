import z from "zod";

export const upsertDoctorSchema = z
  .object({
    id: z.string().uuid().optional(),
    name: z
      .string()
      .trim()
      .min(1, { message: "O nome do medico é obrigatório" }),
    specialty: z
      .string()
      .trim()
      .min(1, { message: "A especialidade do medico é obrigatório" }),
    appointmentPriceInCents: z
      .number()
      .min(1, { message: "O valor da consulta é obrigatório" }),
    availableFromWeekDay: z.number().min(0).max(6),
    availableToWeekDay: z.number().min(0).max(6),
    availableFromTime: z
      .string()
      .trim()
      .min(1, { message: "O horário de abertura é obrigatório" }),
    availableToTime: z
      .string()
      .trim()
      .min(1, { message: "O horário de fechamento é obrigatório" }),
  })
  .refine(
    (data) => {
      return data.availableFromTime < data.availableToTime;
    },
    {
      message:
        "O horário de fechamento deve ser maior que o horário de abertura",
      path: ["availableToTime"],
    },
  );

export type UpsertDoctorSchema = z.infer<typeof upsertDoctorSchema>;
