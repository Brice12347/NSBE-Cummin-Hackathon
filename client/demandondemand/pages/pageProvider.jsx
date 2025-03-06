import { createContext, useState, useContext } from "react";

const PageContext = createContext();

export function PageProvider({ children }) {
  const [pageToLoad, setPageToLoad] = useState("dashboard");

  return (
    <PageContext.Provider value={{ pageToLoad, setPageToLoad }}>
      {children}
    </PageContext.Provider>
  );
}

export function usePage() {
  return useContext(PageContext);
}
