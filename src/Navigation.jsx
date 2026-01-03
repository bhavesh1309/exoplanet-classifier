import { NavLink } from "react-router-dom";

export default function Navigation() {
  return (
    <nav className="bg-indigo-900 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <div className="text-2xl">🪐</div>
            <span className="text-xl font-bold">Exoplanet Classifier</span>
          </div>
          <div className="flex space-x-1">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `px-4 py-2 rounded-md transition-colors ${
                  isActive
                    ? "bg-indigo-700"
                    : "text-indigo-200 hover:bg-indigo-800"
                }`
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/predict"
              className={({ isActive }) =>
                `px-4 py-2 rounded-md transition-colors ${
                  isActive
                    ? "bg-indigo-700"
                    : "text-indigo-200 hover:bg-indigo-800"
                }`
              }
            >
              Classify
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
}