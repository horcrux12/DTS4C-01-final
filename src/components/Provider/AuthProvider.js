import { createContext, useEffect, useState } from "react";
import { listener } from "../../utils/firebase/listener";

export const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // set loading true
    listener((val) => {
      if (!val) {
        window.location.replace("/login");
      }
    });
  }, [user]);

  const onSetUser = (token) => {
    setUser(token);
  };

  return (
    <AuthContext.Provider value={{ user, setUser: onSetUser }}>
      {children}
    </AuthContext.Provider>
  );
};