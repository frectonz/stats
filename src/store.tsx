import { createContext, useContext, useReducer } from "react";

export function makeStore<State, Action>(
  reducer: (state: State, action: Action) => State,
  initialState: State
): [
  ({ children }: { children: any }) => JSX.Element,
  () => React.Dispatch<Action>,
  () => State
] {
  const StoreContext = createContext(initialState);
  const DispatchContext = createContext<React.Dispatch<Action>>((value) => {});

  function StoreProvider({ children }: { children: JSX.Element }): JSX.Element {
    type Reducer = (state: State, action: Action) => State;
    const [store, dispatch] = useReducer<Reducer>(reducer, initialState);

    return (
      <StoreContext.Provider value={store}>
        <DispatchContext.Provider value={dispatch}>
          {children}
        </DispatchContext.Provider>
      </StoreContext.Provider>
    );
  }

  function useStore(): State {
    return useContext(StoreContext);
  }

  function useDispatch(): React.Dispatch<Action> {
    return useContext(DispatchContext);
  }

  return [StoreProvider, useDispatch, useStore];
}
