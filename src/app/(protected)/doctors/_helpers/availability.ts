import "dayjs/locale/pt-br";

import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

import { doctorsTable } from "@/db/schema";

dayjs.extend(utc);

dayjs.locale("pt-br");

export const getAvailibity = (doctors: typeof doctorsTable.$inferSelect) => {
  const from = dayjs()
    .utc()
    .day(doctors.availableFromWeekDay)
    .set("hour", Number(doctors.availableFromTime.split(":")[0]))
    .set("minute", Number(doctors.availableFromTime.split(":")[1]))
    .set("second", Number(doctors.availableFromTime.split(":")[2] || 0))
    .local();

  const to = dayjs()
    .utc()
    .day(doctors.availableToWeekDay)
    .set("hour", Number(doctors.availableToTime.split(":")[0]))
    .set("minute", Number(doctors.availableToTime.split(":")[1]))
    .set("second", Number(doctors.availableToTime.split(":")[2] || 0))
    .local();

  return {
    from,
    to,
  };
};
