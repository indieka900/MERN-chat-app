import GenderCheckBox from "./GenderCheckBox";
import { useState } from "react";
import { Link } from "react-router-dom";
import useSignup from "../../hooks/useSignup.js";

function Register() {
  const [formFields, setFormFields] = useState({
    username: "",
    fullname: "",
    password: "",
    confirmPassword: "",
    gender: "",
  });

  const { loading, signup } = useSignup();

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFormFields({
      ...formFields,
      [name]: value,
    });
  };

  const handleCheckBoxChange = (gender) => {
    setFormFields({ ...formFields, gender });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(formFields);
  };

  return (
    <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
      <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
        <h1 className="text-3xl font-semibold text-center text-gray-300">
          Register
          <span className="text-blue-500"> ChatApp</span>
        </h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username" className="label p-2">
              <span className="text-base label-text">Username</span>
            </label>
            <input
              type="text"
              name="username"
              placeholder="Enter Username"
              className="w-full input input-bordered h-10"
              value={formFields.username}
              onChange={handleOnChange}
            />
          </div>
          <div>
            <label htmlFor="fullname" className="label p-2">
              <span className="text-base label-text">Full Name</span>
            </label>
            <input
              type="text"
              name="fullname"
              placeholder="Enter Full Name"
              className="w-full input input-bordered h-10"
              value={formFields.fullname}
              onChange={handleOnChange}
            />
          </div>
          <div>
            <label htmlFor="password" className="label p-2">
              <span className="text-base label-text">Password</span>
            </label>
            <input
              type="password"
              name="password"
              placeholder="Enter Password"
              className="w-full input input-bordered h-10"
              value={formFields.password}
              onChange={handleOnChange}
            />
          </div>
          <div>
            <label htmlFor="confirmPassword" className="label p-2">
              <span className="text-base label-text">Confirm Password</span>
            </label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              className="w-full input input-bordered h-10"
              value={formFields.confirmPassword}
              onChange={handleOnChange}
            />
          </div>
          <GenderCheckBox
            onCheckboxChange={handleCheckBoxChange}
            selectedGender={formFields.gender}
          />
          <Link
            to={"/login"}
            className="text-sm hover:text-blue-500 mt-2 inline-block"
          >
            Already have an account?
          </Link>
          <div>
            <button
              type="submit"
              className="btn btn-block btn-sm mt-2"
              disabled={loading}
            >
              {loading ? (
                <span className="loading loading-spinner"></span>
              ) : (
                "Register"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
