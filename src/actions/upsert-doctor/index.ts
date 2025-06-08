"use server";

import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";

import { db } from "@/db";
import { doctorsTable } from "@/db/schema";
import { auth } from "@/lib/auth";
import { actionClient } from "@/lib/next-safe-action";

import { upsertDoctorSchema } from "./schema";

dayjs.extend(utc);

export const upsertDoctor = actionClient
  .schema(upsertDoctorSchema)
  .action(async ({ parsedInput }) => {
    const availableFromTime = parsedInput.availableFromTime;
    const availableToTime = parsedInput.availableToTime;

    const AvailableFromTimeUTC = dayjs()
      .set("hour", parseInt(availableFromTime.split(":")[0]))
      .set("minute", parseInt(availableFromTime.split(":")[1]))
      .set("second", parseInt(availableFromTime.split(":")[2]))
      .utc();
    const AvailableToTimeUTC = dayjs()
      .set("hour", parseInt(availableToTime.split(":")[0]))
      .set("minute", parseInt(availableToTime.split(":")[1]))
      .set("second", parseInt(availableToTime.split(":")[2]))
      .utc();
    const session = await auth.api.getSession({
      headers: await headers(),
    });
    if (!session?.user) {
      throw new Error("Usuário não autenticado");
    }
    if (!session?.user.clinic?.id) {
      throw new Error("Usuário não tem cliníca");
    }
    await db
      .insert(doctorsTable)
      .values({
        ...parsedInput,
        id: parsedInput.id,
        clinicId: session?.user?.clinic?.id,
        availableFromTime: AvailableFromTimeUTC.format("HH:mm:ss"),
        availableToTime: AvailableToTimeUTC.format("HH:mm:ss"),
      })
      .onConflictDoUpdate({
        target: [doctorsTable.id],
        set: {
          ...parsedInput,
          availableFromTime: AvailableFromTimeUTC.format("HH:mm:ss"),
          availableToTime: AvailableToTimeUTC.format("HH:mm:ss"),
        },
      });
    revalidatePath("/doctors");
  });
