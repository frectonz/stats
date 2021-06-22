import { makeStore } from "../store";

export enum Screen {
  MAIN,
  EACH_INPUT,
  EACH_OUTPUT,
  CLASS_INPUT,
  CLASS_OUTPUT,
  HIDDEN,
}

interface Layout {
  screen: Screen;
}

interface ChangeScreenAction {
  type: "CHANGE_SCREEN";
  payload: Screen;
}

const reducer: (state: Layout, action: ChangeScreenAction) => Layout = (
  state,
  action
) => {
  switch (action.type) {
    case "CHANGE_SCREEN":
      return { ...state, screen: action.payload };
    default:
      return state;
  }
};

export const [LayoutProvider, useLayoutDispatch, useLayoutStore] = makeStore<
  Layout,
  ChangeScreenAction
>(reducer, {
  screen: Screen.MAIN,
});
