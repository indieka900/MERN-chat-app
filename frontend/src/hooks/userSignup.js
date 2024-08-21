import { useState } from "react";
import toast from "react-hot-toast";
import Axios from "axios";

function UserSignup() {
  const [loading, setLoading] = useState(false);

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
            if (res.error) throw new Error(res.error);
          console.log(res.status);
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
