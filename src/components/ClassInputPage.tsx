import { useNumOfInputsStore } from "../hooks/useNumberOfInputs";
import { useClassInputDispatch } from "../hooks/useClassInputPage";
import { useLayoutDispatch, Screen } from "../hooks/useLayout";

import {
  Box,
  Grid,
  Stack,
  Button,
  Heading,
  Container,
  NumberInput,
  NumberInputField,
} from "@chakra-ui/react";
import { useRef } from "react";

export default function ClassInputPage() {
  const { numberOfInputs } = useNumOfInputsStore();
  const dispatch = useClassInputDispatch();
  const layoutDispatch = useLayoutDispatch();

  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = () => {
    const formData = new FormData(formRef.current as HTMLFormElement);

    const lowerInputs = [] as number[];
    const upperInputs = [] as number[];
    const frequencies = [] as number[];

    for (let i = 0; i < numberOfInputs; i++) {
      lowerInputs.push(parseInt(formData.get(`${String(i)}-lower`) as string));
      upperInputs.push(parseInt(formData.get(`${String(i)}-upper`) as string));
      frequencies.push(
        parseInt(formData.get(`${String(i)}-frequency`) as string)
      );
    }

    dispatch({
      type: "SET_LOWER_LIMITS",
      payload: lowerInputs,
    });

    dispatch({
      type: "SET_UPPER_LIMITS",
      payload: upperInputs,
    });

    dispatch({
      type: "SET_FREQUENCIES",
      payload: frequencies,
    });

    layoutDispatch({
      type: "CHANGE_SCREEN",
      payload: Screen.CLASS_OUTPUT,
    });
  };

  return (
    <Container>
      <form ref={formRef} onSubmit={handleSubmit}>
        <Box my={5}>
          <Heading>Class Input</Heading>
        </Box>

        <Stack spacing={5}>
          {Array(numberOfInputs)
            .fill(0)
            .map((_, i) => (
              <InputBox key={i} name={String(i)} />
            ))}
        </Stack>

        <Button my={5} onClick={handleSubmit}>
          Calculate
        </Button>
      </form>
    </Container>
  );
}

function InputBox({ name }: { name: string }) {
  return (
    <Grid templateColumns="repeat(3, 1fr)" gap="1">
      <NumberInput isRequired>
        <NumberInputField
          name={`${name}-lower`}
          placeholder={`${parseInt(name) + 1} lower`}
        />
      </NumberInput>
      <NumberInput isRequired>
        <NumberInputField
          name={`${name}-upper`}
          placeholder={`${parseInt(name) + 1} upper`}
        />
      </NumberInput>
      <NumberInput isRequired>
        <NumberInputField
          name={`${name}-frequency`}
          placeholder={`${parseInt(name) + 1} frequency`}
        />
      </NumberInput>
    </Grid>
  );
}
