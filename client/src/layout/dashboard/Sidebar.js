import React from "react";
import { Link } from "react-router-dom";
import { FaChevronLeft } from "react-icons/fa";
import { useSelector } from "react-redux";

const Sidebar = () => {
  const { user } = useSelector((state) => state.auth);

  const employerRoutes = [
    {
      path: "add-job",
      name: "Add Job",
    },
  ];
  const candidateRoutes = [
    {
      path: "applied-jobs",
      name: "Applied Jobs",
    },
  ];

  return (
    <div className="bg-primary/10 col-span-2 h-screen sticky top-0">
      <ul className="flex flex-col gap-2 w-full h-full  p-3">
        <div className="flex justify-between items-center text-primary my-1">
          <Link to="/" className="flex items-center">
            <FaChevronLeft />
            <h1>Back</h1>
          </Link>
          <h1 className="text-xl">Dashboard</h1>
        </div>
        {user?.role === "employer" &&
          employerRoutes.map(({ path, name }) => (
            <li key={name}>
              <Link
                className="hover:bg-primary hover:text-white bg-primary/10 transition-all w-full block py-2 px-3 rounded-full"
                to={path}
              >
                {name}
              </Link>
            </li>
          ))}
        {user?.role === "candidate" &&
          candidateRoutes.map(({ path, name }) => (
            <li key={name}>
              <Link
                className="hover:bg-primary hover:text-white bg-primary/10 transition-all w-full block py-2 px-3 rounded-full"
                to={path}
              >
                {name}
              </Link>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Sidebar;
