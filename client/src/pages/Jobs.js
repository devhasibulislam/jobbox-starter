import React from "react";
import { useNavigate } from "react-router-dom";
import { useGetJobsQuery } from "../features/job/jobApi";

const Jobs = () => {
  const navigate = useNavigate();
  const { data } = useGetJobsQuery();

  return (
    <div className="pt-14">
      <h1>This is job page</h1>
      <div>
        {data?.data?.map(({ _id, companyName, position }) => (
          <div key={_id}>
            <h2>{companyName}</h2>
            <h2>{position}</h2>
            <button onClick={() => navigate(`/job-details/${_id}`)}>
              Job Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Jobs;
