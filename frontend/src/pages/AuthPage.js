import { useEffect } from "react";
import axios from "axios";

const Auth = () => {
  useEffect(() => {
    const params = new URL(document.URL).searchParams;
    const code = params.get("code");

    const sendDataToBackend = async () => {
      try {
        await axios.post("http://localhost:8080/login", { code });
        console.log("Code sent to backend successfully!");
      } catch (error) {
        console.error("Failed to send code to backend:", error);
      }
    };

    if (code) {
      sendDataToBackend();
    }
  }, []);

  return null;
};

export default Auth;