const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center min-h-screen dark:bg-gray-800 bg-gray-200">
      <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );
};

export default LoadingSpinner;