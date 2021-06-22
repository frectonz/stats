import { makeStore } from "../store";

interface NumberOfInputsState {
  numberOfInputs: number;
}

type Action = {
  type: "SET_NUM_OF_INPUTS";
  payload: number;
};

const reducer: (
  state: NumberOfInputsState,
  action: Action
) => NumberOfInputsState = (state, action) => {
  switch (action.type) {
    case "SET_NUM_OF_INPUTS":
      return { ...state, numberOfInputs: action.payload };
    default:
      return state;
  }
};

export const [
  NumberOfInputsProvider,
  useNumOfInputsDispatch,
  useNumOfInputsStore,
] = makeStore<NumberOfInputsState, Action>(reducer, {
  numberOfInputs: 0,
});
