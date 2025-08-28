const ErrorMessage = ({ message, onRetry }) => {
  return (
    <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
      <div className="flex items-center mb-4">
        <div className="text-3xl mr-3">❌</div>
        <div>
          <h3 className="text-lg font-semibold text-red-800">Oops! Something went wrong</h3>
          <p className="text-red-600 mt-1">{message}</p>
        </div>
      </div>
      
      {onRetry && (
        <button
          onClick={onRetry}
          className="w-full mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors duration-200"
        >
          Try Again
        </button>
      )}
    </div>
  );
};

export default ErrorMessage;
