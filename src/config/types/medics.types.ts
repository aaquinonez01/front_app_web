export interface Medics {
  data: Medic[];
  meta: Meta;
}

export interface Medic {
  id: string;
  firstname: string;
  lastname: string;
  dni: string;
  specialty: string;
  address: string;
  phone: string;
  userID: string;
  status: boolean;
  businessHours: BusinessHour[];
}

export interface BusinessHour {
  id: string;
  day: Day;
  start: End;
  end: End;
  available: boolean;
  medicId: string;
}

export enum Day {
  Jueves = "JUEVES",
  Lunes = "LUNES",
  Martes = "MARTES",
  Miercoles = "MIERCOLES",
  Viernes = "VIERNES",
}

export enum End {
  The0800 = "08:00",
  The0900 = "09:00",
  The1000 = "10:00",
  The1100 = "11:00",
  The1200 = "12:00",
  The1300 = "13:00",
  The1400 = "14:00",
  The1500 = "15:00",
  The1600 = "16:00",
  The1700 = "17:00",
}

export interface Meta {
  page: number;
  total: number;
  limitPerPage: number;
  totalPages: number;
}
