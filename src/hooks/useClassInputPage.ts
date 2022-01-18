import { makeStore } from "../store";

interface ClassInput {
  lowerLimits: number[];
  upperLimits: number[];
  frequencies: number[];
}

type Action =
  | {
      type: "SET_LOWER_LIMITS";
      payload: number[];
    }
  | {
      type: "SET_UPPER_LIMITS";
      payload: number[];
    }
  | {
      type: "SET_FREQUENCIES";
      payload: number[];
    };

const reducer: (state: ClassInput, action: Action) => ClassInput = (
  state,
  action
) => {
  switch (action.type) {
    case "SET_LOWER_LIMITS":
      return { ...state, lowerLimits: action.payload };
    case "SET_UPPER_LIMITS":
      return { ...state, upperLimits: action.payload };
    case "SET_FREQUENCIES":
      return { ...state, frequencies: action.payload };
    default:
      return state;
  }
};

export const [ClassInputProvider, useClassInputDispatch, useClassInputStore] =
  makeStore<ClassInput, Action>(reducer, {
    lowerLimits: [],
    upperLimits: [],
    frequencies: [],
  });
