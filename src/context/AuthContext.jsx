import { jwtDecode } from "jwt-decode";
import { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";

export let AuthContext = createContext(null);

//esm el variable+provider
export default function AuthContextProvider({ children }) {
  const [userData, setUserData] = useState(null);

  let requstHeaders = {
    Authorization: `Bearer ${localStorage.getItem("userToken")}`,
  };

  let baseUrl = "https://upskilling-egypt.com:443/api/v1";

  let saveuserData = () => {
    let encodedToken = localStorage.getItem("userToken");
    let decodedToken = jwtDecode(encodedToken);
    setUserData(decodedToken);
  };
  
  useEffect(() => {
    if (localStorage.getItem("userToken")) {
      saveuserData();
    }
  }, []);

  useEffect(() => {
    console.log("user", userData);
  }, [userData]);

  return (
    <AuthContext.Provider
      value={{ userData, setUserData, requstHeaders, baseUrl }}
    >
      {children}
    </AuthContext.Provider>
  );
}
