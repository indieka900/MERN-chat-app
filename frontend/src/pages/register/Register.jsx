import GenderCheckBox from "./GenderCheckBox";
import { useState } from "react";
import { Link } from "react-router-dom";
import UserSignup from "../../hooks/userSignup.js";

function Register() {
  const [formFields, setFormFields] = useState({
    username: "",
    fullname: "",
    password: "",
    confirmPassword: "",
    gender: "",
  });

  const { loading, signup } = UserSignup();

  const handleCheckBoxChange = (gender) => {
    setFormFields({ ...formFields, gender });
  };

  const handleSubmit = async (e) => {
    //setLoading(true);
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
        <form>
          <div>
            <label htmlFor="username" className="label p-2">
              <span className="text-base label-text">Username</span>
            </label>
            <input
              type="text"
              placeholder="Enter Username"
              className="w-full input input-bordered h-10"
              value={formFields.username}
              onChange={(e) =>
                setFormFields((current) => ({
                  ...current,
                  username: e.target.value,
                }))
              }
            />
          </div>
          <div>
            <label htmlFor="fullname" className="label p-2">
              <span className="text-base label-text">Full Name</span>
            </label>
            <input
              type="text"
              placeholder="Enter Full Name"
              className="w-full input input-bordered h-10"
              value={formFields.fullname}
              onChange={(e) =>
                setFormFields((current) => ({
                  ...current,
                  fullname: e.target.value,
                }))
              }
            />
          </div>
          <div>
            <label htmlFor="password" className="label p-2">
              <span className="text-base label-text">Password</span>
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              className="w-full input input-bordered h-10"
              value={formFields.password}
              onChange={(e) =>
                setFormFields((current) => ({
                  ...current,
                  password: e.target.value,
                }))
              }
            />
          </div>
          <div>
            <label htmlFor="confirm-password" className="label p-2">
              <span className="text-base label-text">Confirm Password</span>
            </label>
            <input
              type="password"
              id="confirm-password"
              placeholder="Confirm Password"
              className="w-full input input-bordered h-10"
              value={formFields.confirmPassword}
              onChange={(e) =>
                setFormFields((current) => ({
                  ...current,
                  confirmPassword: e.target.value,
                }))
              }
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
              className="btn btn-block btn-sm mt-2"
              disabled={loading}
              onClick={handleSubmit}
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
