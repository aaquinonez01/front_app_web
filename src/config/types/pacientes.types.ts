export interface PacienteData {
  data: Paciente[];
  meta: Meta;
}

export interface Paciente {
  id: string;
  legalGuardianId: string;
  firstname: string;
  lastname: string;
  birthdate: Date;
  legalGuardian: string;
  dni: string;
  disability: string[];
  gender: string;
  relationshipRepresentativePatient: string;
  healthInsurance: string;
  typeTherapyRequired: string[];
  currentMedications: string[];
  allergies: string[];
  historyTreatmentsReceived: string[];
  observations: string;
}

export interface Meta {
  page: number;
  limitPerPage: number;
  totalPages: number;
}
