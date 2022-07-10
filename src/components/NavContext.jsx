import React from 'react';
export const NavContext = React.createContext();

export function useNavContext() {
  return React.useContext(NavContext);
}

export function ContextProvider({ children }) {
  const [notesVisible, setNotesVisible] = React.useState(true);
  return (
    <NavContext.Provider value={{ notesVisible, setNotesVisible }}>
      {children}
    </NavContext.Provider>
  );
}
