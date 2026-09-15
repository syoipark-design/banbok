import { createContext, useContext, useState } from 'react';

const TransferContext = createContext();

export function TransferProvider({ children }) {
  const [savedTransfers, setSavedTransfers] = useState([]);

  const addTransfer = (draft) => {
    setSavedTransfers(prev => [draft, ...prev]);
  };

  return (
    <TransferContext.Provider value={{ savedTransfers, addTransfer }}>
      {children}
    </TransferContext.Provider>
  );
}

export const useTransfers = () => useContext(TransferContext);
