"use client";

import { MailIcon, PersonStandingIcon, Telescope } from "lucide-react";
import { useState } from "react";
import { PatternFormat } from "react-number-format";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { patientsTable } from "@/db/schema";

import UpsertPatientForm from "./upsert-patient-form";

interface PatientCardProps {
  patient: typeof patientsTable.$inferSelect;
}

const PatientCard = ({ patient }: PatientCardProps) => {
  const [dialogCardIsOpen, setDialogCardIsOpen] = useState(false);
  const patientsInitials = patient.name
    .split(" ")
    .map((name) => name[0])
    .join("");
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Avatar className="h-10 w-10">
            <AvatarFallback>{patientsInitials}</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="text-sm font-medium">{patient.name}</h3>
            <p className="text-muted-foreground text-sm">{patient.sex}</p>
          </div>
        </div>
      </CardHeader>
      <Separator />
      <CardContent className="flex flex-col gap-2">
        <Badge variant="outline">
          <MailIcon className="mr-1" />
          {patient.email}
        </Badge>
        <Badge variant="outline">
          <Telescope className="mr-1" />
          <PatternFormat
            format="(##) #####-####"
            placeholder="(11) 99999-9999"
            value={patient.phoneNumber}
          />
        </Badge>
        <Badge variant="outline">
          <PersonStandingIcon className="mr-1" />
          {patient.sex}
        </Badge>
      </CardContent>
      <Separator />
      <CardFooter>
        <Dialog open={dialogCardIsOpen} onOpenChange={setDialogCardIsOpen}>
          <DialogTrigger asChild>
            <Button className="w-full">Ver detalhes</Button>
          </DialogTrigger>
          <UpsertPatientForm
            patient={{
              ...patient,
            }}
            onSuccess={() => setDialogCardIsOpen(false)}
            isOpen={dialogCardIsOpen}
          />
        </Dialog>
      </CardFooter>
    </Card>
  );
};

export default PatientCard;
