import { z } from "zod";

export const upsertAppointmentSchema = z.object({
  id: z.string().uuid().optional(),
  patientId: z.string().min(1, { message: "Paciente é obrigatório" }),
  doctorId: z.string().min(1, { message: "Médico é obrigatório" }),
  date: z.date({ message: "Data é obrigatória" }),
  time: z.string().min(1, { message: "Hora é obrigatória" }),
  appointmentPriceInCents: z
    .number()
    .int()
    .positive("Valor da consulta é obrigatório"),
});

export type UpsertAppointmentSchema = z.infer<typeof upsertAppointmentSchema>;
