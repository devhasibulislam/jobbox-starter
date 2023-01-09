import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const JobCard = ({ jobData }) => {
  const navigate = useNavigate();
  const {
    _id,
    position,
    companyName,
    location,
    employmentType,
    applicants,
    status,
  } = jobData || {};
  const {
    user: { role },
  } = useSelector((state) => state.auth);

  return (
    <div
      key={_id}
      className="border border-gray-300 shadow-xl p-5 rounded-2xl text-primary"
    >
      <div className="flex justify-between  text-primary">
        <div>
          <p className="text-xl">{position}</p>
          <small className="text-primary/70 ">
            by{" "}
            <span className="font-semibold hover:text-primary cursor-pointer hover:underline transition-all">
              {companyName}
            </span>
          </small>
        </div>
        <p>{location}</p>
      </div>
      <div className="flex justify-between items-center mt-5">
        <p className="flex gap-x-4">
          <span>{employmentType}</span>
          {role === "employer" && <span>Applicants: {applicants?.length}</span>}
          <span>Status: {status}</span>
        </p>
        <button className="btn" onClick={() => navigate(`/job-details/${_id}`)}>
          Details
        </button>
      </div>
    </div>
  );
};

export default JobCard;
