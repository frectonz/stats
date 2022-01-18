import { makeStore } from "../store";

interface EachInput {
  inputs: number[];
  numberOfClasses: number;
}

type Action =
  | {
      type: "SET_INPUTS";
      payload: number[];
    }
  | {
      type: "SET_NUM_OF_CLASSES";
      payload: number;
    };

const reducer: (state: EachInput, action: Action) => EachInput = (
  state,
  action
) => {
  switch (action.type) {
    case "SET_INPUTS":
      return { ...state, inputs: action.payload };
    case "SET_NUM_OF_CLASSES":
      return { ...state, numberOfClasses: action.payload };
    default:
      return state;
  }
};

export const [EachInputProvider, useEachInputDispatch, useEachInputStore] =
  makeStore<EachInput, Action>(reducer, {
    inputs: [],
    numberOfClasses: 0,
  });
