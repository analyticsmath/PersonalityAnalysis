import React, { createContext, useContext, useState, useMemo, useCallback } from 'react';

export const SCENE_PHASES = {
  ESTABLISH: 'establish',
  INHABIT: 'inhabit',
  TRANSFORM: 'transform',
  HANDOFF: 'handoff',
  SETTLE: 'settle',
};

const SceneDirectorContext = createContext({
  sceneId: 'default',
  phase: SCENE_PHASES.ESTABLISH,
  progress: 0,
  headerTheme: 'dark',
  activeMediaId: 'a01',
  updateSceneState: () => {},
});

export const useSceneDirector = () => useContext(SceneDirectorContext);

/**
 * SceneDirector
 * Exposes single source of truth for:
 * - Scene Phase: establish -> inhabit -> transform -> handoff -> settle
 * - Normalized scene progress: 0.0 to 1.0
 * - Header theme: 'dark' | 'light'
 * - Active media ID: e.g. 'a01', 'a02', 'b01', etc.
 */
export const SceneDirector = ({
  initialSceneId = 'hero',
  initialHeaderTheme = 'dark',
  initialMediaId = 'a01',
  children,
}) => {
  const [sceneState, setSceneState] = useState({
    sceneId: initialSceneId,
    phase: SCENE_PHASES.ESTABLISH,
    progress: 0,
    headerTheme: initialHeaderTheme,
    activeMediaId: initialMediaId,
  });

  const updateSceneState = useCallback((partial) => {
    setSceneState((prev) => {
      // Avoid re-renders if state hasn't changed
      let changed = false;
      for (const key of Object.keys(partial)) {
        if (prev[key] !== partial[key]) {
          changed = true;
          break;
        }
      }
      if (!changed) return prev;
      return { ...prev, ...partial };
    });
  }, []);

  const value = useMemo(() => ({
    ...sceneState,
    updateSceneState,
  }), [sceneState, updateSceneState]);

  return (
    <SceneDirectorContext.Provider value={value}>
      {children}
    </SceneDirectorContext.Provider>
  );
};

export default SceneDirector;
