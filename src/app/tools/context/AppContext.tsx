"use client";

import {
  Dispatch,
  FocusEvent,
  ReactNode,
  SetStateAction,
  createContext,
  useState,
} from "react";

export interface AppContextType {
  statusItens: string[];
  setStatusItens: Dispatch<SetStateAction<string[]>>;
  tecnicosItens: string[];
  setTecnicosItens: Dispatch<SetStateAction<string[]>>;
}

export const AppContext = createContext<AppContextType>({
  statusItens: [],
  setStatusItens: () => {},
  tecnicosItens: [],
  setTecnicosItens: () => {},
});

const AppContextProvider = ({ children }: { children: ReactNode }) => {
  const [statusItens, setStatusItens] = useState<string[]>([
    "Orçamento",
    "Orçado",
    "Autorizado",
    "Iniciado",
    "Finalizado",
    "Cancelado",
    "Aguardando",
    "Concluido",
    "Entregue",
  ]);

  const [tecnicosItens, setTecnicosItens] = useState<string[]>([
    "Lucas",
    "Vladmir",
    "Cleber",
    "Magnus",
    "outro",
  ]);
  const contextValue = {
    statusItens,
    setStatusItens,
    tecnicosItens,
    setTecnicosItens,
  };
  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};
export default AppContextProvider;
