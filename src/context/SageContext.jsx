import { createContext, useContext, useState } from "react";

const SageContext = createContext();

export const SageProvider = ({ children }) => {
  const [isConnected, setIsConnected] = useState(false);

  return (
    <SageContext.Provider value={{ isConnected, setIsConnected }}>
      {children}
    </SageContext.Provider>
  );
};

export const useSage = () => useContext(SageContext);
