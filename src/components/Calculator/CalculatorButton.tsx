import { CalculatorButtonProps } from "./types";
import { cn } from "../../utils";

const CalculatorButton = (props: CalculatorButtonProps) => {
  const { actions, onClick } = props;
  return (
    <button
      className={cn(
        "w-20 h-20 text-xl rounded-lg mb-3 active:bg-slate-700 duration-300",
        actions === "=" && "h-[175px]  bg-slate-700 active:bg-transparent",
        actions === "0" &&
          "w-[175px] absolute bottom-3 bg-slate-700 active:bg-transparent"
      )}
      onClick={onClick}
    >
      {actions}
    </button>
  );
};

export default CalculatorButton;
