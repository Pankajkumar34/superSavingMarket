const AppHeader = ({ title, subtitle }) => {
  return (
    <header className="bg-white  border-b dark:bg-gray-900 shadow px-6 py-4 flex items-center justify-between">
      {/* Left - Title */}
      <div>
        <h1 className="text-xl font-bold text-gray-900 dark:text-white">
          {title}
        </h1>
        {subtitle && (
          <p className="text-sm text-gray-500 dark:text-gray-400">{subtitle}</p>
        )}
      </div>

      {/* Right - Navigation & Profile */}
      <div className="flex items-center gap-6">
        {/* Navigation */}
        <nav className="hidden md:flex gap-4">
          <a href="/" className="text-gray-700 dark:text-gray-300 hover:underline">
            Home
          </a>
          <a href="/about" className="text-gray-700 dark:text-gray-300 hover:underline">
            About
          </a>
          <a href="/contact" className="text-gray-700 dark:text-gray-300 hover:underline">
            Contact
          </a>
        </nav>

        {/* Profile Avatar */}
        <div className="flex items-center gap-2">
          <img
            src="https://via.placeholder.com/40"
            alt="User Avatar"
            className="w-10 h-10 rounded-full border"
          />
          <span className="text-gray-700 dark:text-gray-300">John Doe</span>
        </div>
      </div>
    </header>
  );
};

export default AppHeader;
