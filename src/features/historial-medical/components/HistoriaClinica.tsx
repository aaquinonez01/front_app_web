import { useHistorialStore } from "../store/historialStore";
import LoadingSpinner from "../../../shared/components/Loading";
export const HistoriaClinica = () => {
  const historiaClinica = useHistorialStore((state) => state.historiaClinica);
  const loading = useHistorialStore((state) => state.loading);

  return (
    <section className="w-full  bg-white py-3 rounded-lg">
      <div className="bg-white py-4 rounded-lg shadow-lg w-full max-w-3xl mx-auto h-[calc(100vh-200px)] overflow-y-auto">
        <h2 className="text-center text-2xl font-bold text-blue-700 mb-6 border-b pb-4">
          Historia Clínica
        </h2>
        {loading && <LoadingSpinner />}
        {historiaClinica !== null && !loading ? (
          <div className="space-y-6">
            {/* Ficha de Identificación */}
            <div className="border p-6 rounded-lg bg-gray-50">
              <h3 className="text-xl font-semibold mb-4 text-gray-700">
                Ficha de Identificación
              </h3>
              <div className="flex flex-wrap gap-4">
                <p className="flex-1">
                  <strong>Nombre completo:</strong>{" "}
                  {historiaClinica.hc.nombreCompleto}
                </p>
                <p>
                  <strong>Iniciales:</strong>{" "}
                  {`${historiaClinica.patient.firstname[0]}${historiaClinica.patient.lastname[0]}`}
                </p>
                <p>
                  <strong>Sexo:</strong> {historiaClinica.patient.gender}
                </p>
                <p>
                  <strong>DNI:</strong> {historiaClinica.patient.dni}
                </p>
                <p>
                  <strong>Fecha de nacimiento:</strong>{" "}
                  {new Date(
                    historiaClinica.patient.birthdate
                  ).toLocaleDateString()}
                </p>
                <p>
                  <strong>Fecha de creación:</strong>{" "}
                  {new Date(
                    historiaClinica.hc.fechaCreacion
                  ).toLocaleDateString()}
                </p>
              </div>
            </div>

            {/* Datos Generales */}
            <div className="border p-6 rounded-lg bg-gray-50">
              <h3 className="text-xl font-semibold mb-4 text-gray-700">
                Datos Generales
              </h3>
              <div className="flex flex-col gap-2">
                <p>
                  <strong>Domicilio:</strong> {historiaClinica.hc.direccion}
                </p>
                <p>
                  <strong>Relación con el representante:</strong>{" "}
                  {historiaClinica.patient.relationshipRepresentativePatient}
                </p>
                <p>
                  <strong>Teléfono:</strong> {historiaClinica.hc.telefono}
                </p>
                <p>
                  <strong>Institución:</strong> {historiaClinica.hc.institucion}
                </p>
                <p>
                  <strong>Curso:</strong> {historiaClinica.hc.curso}
                </p>
              </div>
            </div>

            {/* Información Médica */}
            <div className="border p-6 rounded-lg bg-gray-50">
              <h3 className="text-xl font-semibold mb-4 text-gray-700">
                Información Médica
              </h3>
              <div className="flex flex-col gap-2">
                <p>
                  <strong>Motivo de consulta:</strong>{" "}
                  {historiaClinica.hc.motivoConsulta}
                </p>
                <p>
                  <strong>Impresión diagnóstica:</strong>{" "}
                  {historiaClinica.hc.impresionDiagnostica}
                </p>
                <p>
                  <strong>Antecedentes familiares:</strong>{" "}
                  {historiaClinica.hc.antecedenteFamiliares}
                </p>
                <p>
                  <strong>Medicación actual:</strong>{" "}
                  {historiaClinica.patient.currentMedications.join(", ")}
                </p>
                <p>
                  <strong>Alergias:</strong>{" "}
                  {historiaClinica.patient.allergies.join(", ")}
                </p>
                <p>
                  <strong>Observaciones:</strong>{" "}
                  {historiaClinica.hc.observaciones}
                </p>
              </div>
            </div>

            {/* Intervenciones */}
            <div className="border p-6 rounded-lg bg-gray-50">
              <h3 className="text-xl font-semibold mb-4 text-gray-700">
                Intervenciones
              </h3>
              <div className="flex flex-col gap-2">
                <p>
                  <strong>Áreas de intervención:</strong>{" "}
                  {historiaClinica.hc.areasIntervecion}
                </p>
                <p>
                  <strong>Pruebas aplicadas:</strong>{" "}
                  {historiaClinica.hc.pruebasAplicadas}
                </p>
                <p>
                  <strong>Remisión:</strong> {historiaClinica.hc.remision}
                </p>
              </div>
            </div>
          </div>
        ) : (
          <h3 className="text-center text-gray-700">
            Realice una Busqueda para obtener la Historia Clinica del Paciente.
          </h3>
        )}
      </div>
    </section>
  );
};
