import { useState } from "react";
import toast from "react-hot-toast";
import Axios from "axios";
import { useAuthContext } from "../context/AuthContext";

function UserSignup() {
  const [loading, setLoading] = useState(false);
  const {setAuthUser} = useAuthContext();

  const signup = async ({
    fullname,
    username,
    password,
    confirmPassword,
    gender,
  }) => {
    const success = handleInputErrors({
      fullname,
      username,
      password,
      confirmPassword,
      gender,
    });
    if (!success) return;
    setLoading(true);

    try {
      Axios.post("/api/auth/register", {
        username,
        fullname,
        password,
        confirmPassword,
        gender,
      })
        .then((res) => {
          localStorage.setItem("user-auth", JSON.stringify(res.data));
          setAuthUser(res.data);
        })
        .catch((err) => {
          setLoading(false);
          console.log(err);
        });
    } catch (error) {
      setLoading(false);
      toast.error(error.message);
    }
  };
  return { loading, signup };
}

export default UserSignup;

function handleInputErrors({
  fullname,
  username,
  password,
  confirmPassword,
  gender,
}) {
  if (!fullname || !username || !password || !confirmPassword || !gender) {
    toast.error("Please fill in all fields");
    return false;
  }

  if (password !== confirmPassword) {
    toast.error("Password didn't match");
    return false;
  }

  if (password.lenth <= 6) {
    toast.error("Password must be atlest 6 characters");
  }

  return true;
}
