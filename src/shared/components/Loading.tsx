import "../styles/loading.css";

export default function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="relative w-24 h-24 mb-4">
        <img src="/logo.webp" alt="Cargando" className="" />
      </div>
      <div className="text-2xl font-bold text-gray-700">
        Cargando
        <span className="dots-animation">
          <span>.</span>
          <span>.</span>
          <span>.</span>
        </span>
      </div>
    </div>
  );
}
