

import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <div className="w-full bg-white shadow mb-6">
      <div className="max-w-4xl mx-auto flex justify-between p-3">

        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "text-white bg-blue-500 px-3 py-1 rounded"
              : "text-blue-600 px-3 py-1 rounded hover:bg-blue-100"
          }
        >
          Dashboard
        </NavLink>

        <NavLink
          to="/create"
          className={({ isActive }) =>
            isActive
              ? "text-white bg-blue-500 px-3 py-1 rounded"
              : "text-blue-600 px-3 py-1 rounded hover:bg-blue-100"
          }
        >
          Create Quiz
        </NavLink>

        <NavLink
          to="/student"
          className={({ isActive }) =>
            isActive
              ? "text-white bg-blue-500 px-3 py-1 rounded"
              : "text-blue-600 px-3 py-1 rounded hover:bg-blue-100"
          }
        >
          Student
        </NavLink>

      </div>
    </div>
  );
}

export default Navbar;