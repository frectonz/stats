import { useNumOfInputsStore } from "../hooks/useNumberOfInputs";
import { useEachInputDispatch } from "../hooks/useEachInputPage";
import { useLayoutDispatch, Screen } from "../hooks/useLayout";

import {
  Box,
  Stack,
  Button,
  Heading,
  Divider,
  Container,
  NumberInput,
  NumberInputField,
} from "@chakra-ui/react";
import { useRef } from "react";

export default function EachInputPage() {
  const dispatch = useEachInputDispatch();
  const layoutDispatch = useLayoutDispatch();
  const { numberOfInputs } = useNumOfInputsStore();

  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = () => {
    const formData = new FormData(formRef.current as HTMLFormElement);
    const inputs = [] as number[];

    for (let i = 0; i < numberOfInputs; i++) {
      inputs.push(parseInt(formData.get(String(i)) as string));
    }

    dispatch({
      type: "SET_INPUTS",
      payload: inputs,
    });

    const numberOfClasses = formData.get("numberOfClasses") as unknown;

    dispatch({
      type: "SET_NUM_OF_CLASSES",
      payload: numberOfClasses as number,
    });

    layoutDispatch({
      type: "CHANGE_SCREEN",
      payload: Screen.EACH_OUTPUT,
    });
  };

  return (
    <Container>
      <form ref={formRef} onSubmit={handleSubmit}>
        <Box my={5}>
          <Heading>Each Input</Heading>
        </Box>

        <Box my={5}>
          <NumberInput isRequired={true}>
            <NumberInputField
              required
              name="numberOfClasses"
              placeholder="Number of classes"
            />
          </NumberInput>
        </Box>

        <Divider my={5} />

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
    <NumberInput isRequired>
      <NumberInputField name={name} placeholder={String(parseInt(name) + 1)} />
    </NumberInput>
  );
}
