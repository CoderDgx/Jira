import { useCallback, useReducer } from "react";

const UNDO = "UNDO";
const REDO = "REDO";
const SET = "SET";
const RESET = "RESET";

type State<T> = {
  past: T[];
  present: T;
  future: T[];
};

type Action<T> = {
  newPresent?: T;
  type: typeof UNDO | typeof REDO | typeof SET | typeof RESET;
};
const undoReducer = <T>(state: State<T>, action: Action<T>) => {
  const { past, present, future } = state;
  const { newPresent, type } = action;

  switch (type) {
    case UNDO: {
      if (past.length === 0) return state;

      const previous = past[past.length - 1];
      const newPast = past.slice(0, past.length - 1);

      return {
        past: newPast,
        present: previous,
        future: [present, ...future],
      };
    }
    case REDO: {
      if (future.length === 0) return state;

      const next = future[0];
      const newFuture = future.slice(1);

      return {
        past: [...past, present],
        present: next,
        future: newFuture,
      };
    }
    case SET: {
      if (newPresent === present) return state;
      return {
        past: [...past, present],
        present: newPresent,
        future: [],
      };
    }
    case RESET: {
      return {
        past: [],
        present: newPresent,
        future: [],
      };
    }
  }
};

export const useUndo = <T>(initialPresent: T) => {
  const [state, dispatch] = useReducer(undoReducer, {
    past: [],
    present: initialPresent,
    future: [],
  } as State<T>);

  // const [state, setState] = useState<{
  //   past: T[];
  //   present: T;
  //   future: T[];
  // }>({
  //   past: [],
  //   present: initialPresent,
  //   future: [],
  // });

  const canUndo = state.past.length !== 0;
  const canRedo = state.future.length !== 0;

  const undo = useCallback(() => dispatch({ type: UNDO }), []);
  // const undo = useCallback(() => {
  //   setState((currentState) => {
  //     const { past, present, future } = currentState;
  //     if (past.length === 0) return currentState;

  //     const previous = past[past.length - 1];
  //     const newPast = past.slice(0, past.length - 1);

  //     return {
  //       past: newPast,
  //       present: previous,
  //       future: [present, ...future],
  //     };
  //   });
  // }, []);

  const redo = useCallback(() => dispatch({ type: REDO }), []);
  // const redo = useCallback(() => {
  //   setState((currentState) => {
  //     const { past, present, future } = currentState;
  //     if (future.length === 0) return currentState;

  //     const next = future[0];
  //     const newFuture = future.slice(1);

  //     return {
  //       past: [...past, present],
  //       present: next,
  //       future: newFuture,
  //     };
  //   });
  // }, []);

  const set = useCallback(
    (newPresent: T) => dispatch({ type: SET, newPresent }),
    []
  );
  // const set = useCallback((newPresent: T) => {
  //   setState((currentState) => {
  //     const { past, present } = currentState;
  //     if (newPresent === present) return currentState;
  //     return {
  //       past: [...past, present],
  //       present: newPresent,
  //       future: [],
  //     };
  //   });
  // }, []);

  const reset = useCallback(
    (newPresent: T) => dispatch({ type: RESET, newPresent }),
    []
  );
  // const reset = useCallback((newPresent: T) => {
  //   setState(() => {
  //     return {
  //       past: [],
  //       present: newPresent,
  //       future: [],
  //     };
  //   });
  // }, []);

  return [state, { set, reset, undo, redo, canUndo, canRedo }] as const;
};
