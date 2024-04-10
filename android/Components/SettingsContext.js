import React, { createContext, useContext, useState } from 'react';

const SettingsContext = createContext();

export const useSettings = () => useContext(SettingsContext);

export const SettingsProvider = ({ children }) => {
  const [units, setUnits] = useState('metric'); // Default units

  return (
    <SettingsContext.Provider value={{ units, setUnits}}>
      {children}
    </SettingsContext.Provider>
  );
};
