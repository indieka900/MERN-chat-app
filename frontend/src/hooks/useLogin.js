import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();

  const login = async (username, password) => {
    const success = handleInputErrors(
      username,
      password,
    );
    if (!success) return;
    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      localStorage.setItem("user-auth", JSON.stringify(data));
      setAuthUser(data);
      if (data.error) {
        throw new Error(data.error);
      }
    } catch (error) {
      console.log(error);

      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, login };
};

function handleInputErrors(username, password) {
  if (!username || !password) {
    toast.error("Please fill in all fields");
    return false;
  }

  if (password.lenth <= 6) {
    toast.error("Password must be atlest 6 characters");
  }

  return true;
}

export default useLogin;
