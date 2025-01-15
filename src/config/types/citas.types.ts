export interface Appointments {
  data: Appointment[];
  meta: Meta;
}

export interface Appointment {
  id: string;
  date: string;
  appointmentTime: string;
  medicalInsurance: string;
  status: string;
  diagnosis: string;
  doctor: string;
  patient: string;
  specialtyTherapy: string;
}

export interface Meta {
  page: number;
  limitPerPage: number;
  totalPages: number;
}
