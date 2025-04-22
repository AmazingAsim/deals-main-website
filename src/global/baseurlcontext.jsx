import { createContext,useContext } from "react";

export const BaseUrlContext = createContext();

export const useBaseUrl = () => useContext(BaseUrlContext);

export const BaseUrlProvider = ({ children }) => {
    const baseUrl = "https://dealsfromamerica.com";
    // const baseUrl = "http://localhost";
    return <BaseUrlContext.Provider value={baseUrl}>{children}</BaseUrlContext.Provider>;
}