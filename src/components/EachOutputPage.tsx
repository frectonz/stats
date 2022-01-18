import { OutputPage } from "./OutputPage";
import { useOutput } from "../hooks/useOutputPage";

export default function EachOutputPage() {
  const { data } = useOutput();

  return (
    <OutputPage
      data={{
        title: "Each Output",
        ...data,
      }}
    />
  );
}
