import { CalculatorResultProps } from "./types";

const CalculatorResult = (props: CalculatorResultProps) => {
  const { value = '0' } = props;
  return (
    <div className="w-full h-16 bg-black text-right p-4 flex items-center justify-end rounded-xl text-3xl">
      {value}
    </div>
  );
};

export default CalculatorResult;
