import { OutputPage } from "./OutputPage";
import { useClassOutput } from "../hooks/useOutputPage";

export default function EachOutputPage() {
  const { data } = useClassOutput();

  return (
    <OutputPage
      data={{
        title: "Class Output Page",
        ...data,
      }}
    />
  );
}
