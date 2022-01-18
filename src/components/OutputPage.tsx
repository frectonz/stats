import { Class } from "../lib/entities";

import {
  Td,
  Th,
  Tr,
  Box,
  Stat,
  Thead,
  Table,
  Stack,
  Heading,
  ListItem,
  StatLabel,
  Container,
  Accordion,
  StatNumber,
  OrderedList,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  AccordionButton,
} from "@chakra-ui/react";

interface Props {
  data: {
    title: string;
    classes: Class[];

    mean: number;
    mode: number;
    median: number;
    range: number;
    variance: number;
    stdDeviation: number;

    deciles: number[];
    quartiles: number[];
    percentiles: number[];
  };
}

export function OutputPage(props: Props) {
  const data = props.data;

  return (
    <>
      <Box m={10}>
        <Heading>{data.title}</Heading>
      </Box>
      <ClassTable classes={data.classes} />
      <Container>
        <Stack spacing={5}>
          <Stat>
            <StatLabel>Mean</StatLabel>
            <StatNumber color="green.300">{data.mean}</StatNumber>
          </Stat>

          <Stat>
            <StatLabel>Mode</StatLabel>
            <StatNumber color="blue.300">{data.mode}</StatNumber>
          </Stat>

          <Stat>
            <StatLabel>Median</StatLabel>
            <StatNumber color="red.300">{data.median}</StatNumber>
          </Stat>

          <Stat>
            <StatLabel>Range</StatLabel>
            <StatNumber color="blackAlpha.300">{data.range}</StatNumber>
          </Stat>

          <Stat>
            <StatLabel>Variance</StatLabel>
            <StatNumber color="cyan.300">{data.variance}</StatNumber>
          </Stat>

          <Stat>
            <StatLabel>Standard Deviation</StatLabel>
            <StatNumber>{data.stdDeviation}</StatNumber>
          </Stat>
        </Stack>

        <Box my={5} mb={200}>
          <Accordion>
            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box flex="1" textAlign="left">
                    Quartiles
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel>
                <OrderedList>
                  {data.quartiles.map((q, i) => (
                    <ListItem key={i}>{q}</ListItem>
                  ))}
                </OrderedList>
              </AccordionPanel>
            </AccordionItem>

            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box flex="1" textAlign="left">
                    Deciles
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel>
                <OrderedList>
                  {data.deciles.map((q, i) => (
                    <ListItem key={i}>{q}</ListItem>
                  ))}
                </OrderedList>
              </AccordionPanel>
            </AccordionItem>

            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box flex="1" textAlign="left">
                    Percentiles
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel>
                <OrderedList>
                  {data.percentiles.map((q, i) => (
                    <ListItem key={i}>{q}</ListItem>
                  ))}
                </OrderedList>
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        </Box>
      </Container>
    </>
  );
}

function ClassTable({ classes }: { classes: Class[] }) {
  return (
    <Box m={10}>
      <Table size="md" fontSize="0.8rem">
        <Thead>
          <Tr>
            <Th textAlign="center">Limits</Th>
            <Th textAlign="center">Boundaries</Th>
            <Th textAlign="center">Midpoint</Th>
            <Th textAlign="center">Frequency</Th>
            <Th textAlign="center">Cumulative Frequency</Th>
            <Th textAlign="center">Correction Factor</Th>
          </Tr>
        </Thead>
        {classes.map((c) => (
          <Tr>
            <Td textAlign="center">
              {c.lowerLimit} - {c.upperLimit}
            </Td>
            <Td textAlign="center">
              {c.lowerBound} {" < x <= "} {c.upperBound}
            </Td>
            <Td textAlign="center">{c.classMidpoint}</Td>
            <Td textAlign="center">{c.frequency}</Td>
            <Td textAlign="center">{c.cumulativeFrequency}</Td>
            <Td textAlign="center">{c.correctionFactor}</Td>
          </Tr>
        ))}
      </Table>
    </Box>
  );
}
