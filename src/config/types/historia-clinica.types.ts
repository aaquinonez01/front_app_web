export interface HistoriaClinica {
  patient: Patient;
  hc: Hc;
}

export interface Hc {
  id: string;
  patientId: string;
  antecedenteFamiliares: string;
  areasIntervecion: string;
  cobertura: string;
  curso: string;
  desencadenantesMotivoConsulta: string;
  direccion: string;
  estructuraFamiliar: string;
  fechaCreacion: Date;
  fechaEvalucion: Date;
  fechaNacimiento: Date;
  impresionDiagnostica: string;
  institucion: string;
  motivoConsulta: string;
  nombreCompleto: string;
  observaciones: string;
  pruebasAplicadas: string;
  remision: string;
  responsable: string;
  telefono: string;
}

export interface Patient {
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
