const NotFound = () => (
  <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200">
    <h1 className="text-6xl font-extrabold text-gray-800 mb-4 animate-pulse">
      404
    </h1>
    <p className="text-2xl font-semibold text-gray-600 mb-6">
      Oops! Page Not Found
    </p>
    <a
      href="/"
      className="px-6 py-3 text-lg font-medium text-white bg-blue-600 rounded-full hover:bg-blue-500 transition-colors"
    >
      Go to Homepage
    </a>
  </div>
);

export default NotFound;
