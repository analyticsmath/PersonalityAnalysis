// frontend/src/components/public/imprint/ImprintSceneContext.jsx
import React, { createContext, useContext, useState } from 'react';

const ImprintSceneContext = createContext({
  headerTone: 'transparent', // 'transparent' | 'released' | 'dark'
  setHeaderTone: () => {},
  heroActive: true,
  setHeroActive: () => {},
});

export const ImprintSceneProvider = ({ children }) => {
  const [headerTone, setHeaderTone] = useState('transparent');
  const [heroActive, setHeroActive] = useState(true);

  return (
    <ImprintSceneContext.Provider
      value={{
        headerTone,
        setHeaderTone,
        heroActive,
        setHeroActive,
      }}
    >
      {children}
    </ImprintSceneContext.Provider>
  );
};

export const useImprintScene = () => useContext(ImprintSceneContext);
export default ImprintSceneContext;
