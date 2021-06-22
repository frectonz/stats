import Calculator from "awesome-react-calculator";

export default function CalculatorDisplay() {
  return (
    <div
      style={{
        width: "30rem",
        height: "40rem",
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, 20%)",
      }}
    >
      <Calculator />
    </div>
  );
}
