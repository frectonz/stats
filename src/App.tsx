import MainPage from "./components/MainPage";
import EachInputPage from "./components/EachInputPage";
import ClassInputPage from "./components/ClassInputPage";
import EachOutputPage from "./components/EachOutputPage";
import ClassOutputPage from "./components/ClassOutputPage";
import CalculatorDisplay from "./components/CalculatorDisplay";

import { useLayoutStore, Screen, useLayoutDispatch } from "./hooks/useLayout";
import { EachInputProvider } from "./hooks/useEachInputPage";
import { ClassInputProvider } from "./hooks/useClassInputPage";

import { ChakraProvider } from "@chakra-ui/react";

function App() {
  const { screen } = useLayoutStore();
  const dispatch = useLayoutDispatch();

  window.addEventListener("dblclick", () => {
    dispatch({
      type: "CHANGE_SCREEN",
      payload: screen === Screen.HIDDEN ? Screen.MAIN : Screen.HIDDEN,
    });
  });

  return (
    <>
      <ChakraProvider>
        <EachInputProvider>
          <ClassInputProvider>
            {screen === Screen.MAIN && <MainPage />}
            {screen === Screen.EACH_INPUT && <EachInputPage />}
            {screen === Screen.EACH_OUTPUT && <EachOutputPage />}
            {screen === Screen.CLASS_INPUT && <ClassInputPage />}
            {screen === Screen.CLASS_OUTPUT && <ClassOutputPage />}
            {screen === Screen.HIDDEN && <CalculatorDisplay />}
          </ClassInputProvider>
        </EachInputProvider>
      </ChakraProvider>
    </>
  );
}

export default App;
