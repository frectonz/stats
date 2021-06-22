import {
  useNumOfInputsStore,
  useNumOfInputsDispatch,
} from "../hooks/useNumberOfInputs";
import { Screen, useLayoutDispatch } from "../hooks/useLayout";

import {
  Box,
  Grid,
  Button,
  Center,
  Heading,
  Container,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react";

export default function MainPage() {
  const layoutDispatch = useLayoutDispatch();
  const { numberOfInputs } = useNumOfInputsStore();
  const numOfInputsDispatch = useNumOfInputsDispatch();

  const setNumberOfInputs = (num: number) => {
    numOfInputsDispatch({
      type: "SET_NUM_OF_INPUTS",
      payload: num,
    });
  };

  const toEachPage = () =>
    layoutDispatch({
      type: "CHANGE_SCREEN",
      payload: Screen.EACH_INPUT,
    });

  const toClassPage = () =>
    layoutDispatch({
      type: "CHANGE_SCREEN",
      payload: Screen.CLASS_INPUT,
    });

  return (
    <Container>
      <Box my={5} justifyContent="center">
        <Heading>Stats</Heading>
      </Box>
      <NumberInput
        value={numberOfInputs || ""}
        isRequired
        onChange={(value) =>
          setNumberOfInputs(value === "" ? 0 : parseInt(value))
        }
      >
        <NumberInputField textAlign="center" />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>

      <Box my={10}>
        <Grid templateColumns="repeat(2, 1fr)">
          <Center>
            <Button onClick={() => numberOfInputs && toEachPage()}>Each</Button>
          </Center>
          <Center>
            <Button onClick={() => numberOfInputs && toClassPage()}>
              Class
            </Button>
          </Center>
        </Grid>
      </Box>
    </Container>
  );
}
