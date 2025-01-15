import { Cita } from "@/config/types/cita.types";

export const diasSemana = [
  "Lunes",
  "Martes",
  "Miércoles",
  "Jueves",
  "Viernes",
  "Sábado",
  "Domingo",
];

export const horasDia = Array.from({ length: 12 }, (_, i) => i + 8); // 8:00 AM a 7:00 PM

export const citas: Cita[] = [
  {
    id: 1,
    titulo: "Terapia de Juan",
    fecha: new Date(2024, 9, 15, 10, 0),
    duracion: 60,
    hora: "10:00",
  },
  {
    id: 2,
    titulo: "Evaluación de María",
    fecha: new Date(2024, 9, 16, 14, 30),
    duracion: 90,
    hora: "14:30",
  },
  {
    id: 3,
    titulo: "Sesión grupal",
    fecha: new Date(2024, 9, 16, 14, 45),
    duracion: 120,
    hora: "11:00",
  },
];
