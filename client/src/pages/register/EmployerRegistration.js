import React, { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { FaChevronLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useRegisterMutation } from "../../features/auth/authApi";

const EmployerRegistration = () => {
  const [countries, setCountries] = useState([]);
  const { handleSubmit, register, control, reset } = useForm();
  const term = useWatch({ control, name: "term" });
  const navigate = useNavigate();
  const [registerCandidate, { isLoading }] = useRegisterMutation();

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then((res) => res.json())
      .then((data) => setCountries(data));
  }, []);

  useEffect(() => {
    if (isLoading) {
      reset();
    }
  }, [isLoading, reset]);

  const onSubmit = (data) => {
    console.log(data);
    registerCandidate({ ...data, role: "employee" });
  };

  const businessCategories = [
    "Sole proprietorship",
    "Partnership",
    "Limited Liability Partnership",
    "Limited Partnership",
    "Co-operative",
    "Corporation",
    "Non-profit organization",
    "Cleaning service",
    "Freelance Writing Business",
    "Amazon Kindle Publishing",
    "Daycare",
    "Pet Grooming",
    "Aerial Photography",
    "Build and Sell Themes Online",
    "Blogging",
  ];

  const numberOfEmployees = [
    "1 - 10",
    "10 - 20",
    "20 - 30",
    "30 - 40",
    "40 - 50",
    "50 - 60",
    "60 - 70",
    "70 - 80",
    "80 - 90",
    "90 - 100",
    "100 - Above",
  ];

  return (
    <div className="pt-14">
      <div
        onClick={() => navigate("/register")}
        className="cursor-pointer w-fit mt-5 flex items-center"
      >
        <FaChevronLeft />
        <p>back</p>
      </div>
      <div className="flex justify-center items-center overflow-auto p-10">
        <form
          className="bg-secondary/20 shadow-lg p-10 rounded-2xl flex flex-wrap gap-3 max-w-3xl justify-between"
          onSubmit={handleSubmit(onSubmit)}
        >
          <h1 className="w-full text-2xl text-primary mb-5">Employee</h1>
          <div className="flex flex-col w-full max-w-xs">
            <label className="mb-2" htmlFor="firstName">
              First Name
            </label>
            <input type="text" id="firstName" {...register("firstName")} />
          </div>
          <div className="flex flex-col w-full max-w-xs">
            <label className="mb-2" htmlFor="lastName">
              Last Name
            </label>
            <input type="text" id="lastName" {...register("lastName")} />
          </div>
          <div className="flex flex-col w-full max-w-xs">
            <label className="mb-2" htmlFor="email">
              Email
            </label>
            <input type="email" id="email" {...register("email")} />
          </div>
          <div className="flex flex-col w-full max-w-xs">
            <h1 className="mb-3">Gender</h1>
            <div className="flex gap-3">
              <div>
                <input
                  type="radio"
                  id="male"
                  {...register("gender")}
                  value="male"
                />
                <label className="ml-2 text-lg" for="male">
                  Male
                </label>
              </div>
              <div>
                <input
                  type="radio"
                  id="female"
                  {...register("gender")}
                  value="female"
                />
                <label className="ml-2 text-lg" for="female">
                  Female
                </label>
              </div>
              <div>
                <input
                  type="radio"
                  id="other"
                  {...register("gender")}
                  value="other"
                />
                <label className="ml-2 text-lg" for="other">
                  Other
                </label>
              </div>
            </div>
          </div>
          <hr className="w-full mt-2 bg-black" />
          <div className="flex flex-col w-full max-w-xs">
            <label className="mb-3" for="country">
              Country
            </label>
            <select {...register("country")} id="country">
              {countries
                .sort((a, b) => a?.name?.common?.localeCompare(b?.name?.common))
                .map(({ name }) => (
                  <option value={name.common}>{name.common}</option>
                ))}
            </select>
          </div>
          <div className="flex flex-col w-full max-w-xs">
            <label className="mb-2" htmlFor="address">
              Street Address
            </label>
            <input type="text" {...register("address")} id="address" />
          </div>
          <div className="flex flex-col w-full max-w-xs">
            <label className="mb-2" htmlFor="city">
              City
            </label>
            <input type="text" {...register("city")} id="city" />
          </div>
          <div className="flex flex-col w-full max-w-xs">
            <label className="mb-2" htmlFor="postcode">
              Postal Code
            </label>
            <input type="text" {...register("postcode")} id="postcode" />
          </div>

          <hr className="w-full mt-2 bg-black" />
          <div className="flex flex-col w-full max-w-xs">
            <label className="mb-3" for="businessType">
              Business Type
            </label>
            <select {...register("businessType")} id="businessType">
              {businessCategories.map((name) => (
                <option value={name}>{name}</option>
              ))}
            </select>
          </div>

          <div className="flex flex-col w-full max-w-xs">
            <label className="mb-3" for="numberEmployee">
              Number of employees
            </label>
            <select {...register("numberEmployee")} id="numberEmployee">
              {numberOfEmployees.map((name) => (
                <option value={name}>{name}</option>
              ))}
            </select>
          </div>

          <div className="flex flex-col w-full max-w-xs">
            <label className="mb-2" htmlFor="companyName">
              Company's Name
            </label>
            <input type="text" id="companyName" {...register("companyName")} />
          </div>
          
          <div className="flex flex-col w-full max-w-xs">
            <label className="mb-2" htmlFor="roleInCompany">
              Role in company
            </label>
            <input type="text" id="roleInCompany" {...register("roleInCompany")} />
          </div>

          <div className="flex justify-between items-center w-full mt-3">
            <div className="flex  w-full max-w-xs">
              <input
                className="mr-3"
                type="checkbox"
                {...register("term")}
                id="terms"
              />
              <label for="terms">I agree to terms and conditions</label>
            </div>
            <button disabled={!term} className="btn" type="submit">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmployerRegistration;