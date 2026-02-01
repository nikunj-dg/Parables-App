import { useError } from "../context/ErrorContext";

const ErrorModal = () => {
  const { error, clearError } = useError();

  if (!error) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 animate-fadeIn">
      <div className="bg-white rounded-xl shadow-xl p-6 w-96 animate-scaleIn">
        <h2 className="text-lg font-semibold text-red-600 mb-3">
          Error
        </h2>

        <p className="text-gray-700 mb-4">
          {error}
        </p>

        <button
          onClick={clearError}
          className="w-full bg-red-500 text-white rounded-md py-2 hover:bg-red-600 transition"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ErrorModal;
