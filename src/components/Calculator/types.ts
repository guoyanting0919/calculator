

export type  CalculatorButtonProps = {
  actions?: string,
  onClick?: () => void
}

export type CalculatorResultProps = {
  value?: string
}

 export type CalculatorResultTypes = {
  calcValue: string;
 }

 export type CalculatorAction = 
  | { type: "+" }
  | { type: "-" }
  | { type: "*" }
  | { type: "/" }
  | { type: "=" }
  | { type: "." }
  | { type: "c" }
  | { type: "DEL" }
  | { type: 0 }
  | { type: 1 }
  | { type: 2 }
  | { type: 3 }
  | { type: 4 }
  | { type: 5 }
  | { type: 6 }
  | { type: 7 }
  | { type: 8 }
  | { type: 9 };
