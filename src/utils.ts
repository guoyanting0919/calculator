import { type ClassValue, clsx } from "clsx";

import { twMerge } from "tailwind-merge";
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function toPostfix(expression: string): (number | string)[] {
  const result: (number | string)[] = [];
  const operators: string[] = [];
  const precedence: Record<string, number> = {
      '+': 1,
      '-': 1,
      '*': 2,
      '/': 2
  };

  expression = expression.replace(/\s+/g, '');

  // eslint-disable-next-line no-useless-escape
  const tokens = expression.split(/([\+\-\*\/\(\)])/);

  tokens.forEach(token => {
      if (!token) return;

      if (/\d/.test(token)) {
          result.push(parseFloat(token));
      } else if (token === '(') {
          operators.push(token);
      } else if (token === ')') {
          while (operators.length && operators[operators.length - 1] !== '(') {
              result.push(operators.pop()!);
          }
          operators.pop();
      } else {
          while (operators.length && precedence[operators[operators.length - 1]] >= precedence[token]) {
              result.push(operators.pop()!);
          }
          operators.push(token);
      }
  });

  while (operators.length) {
      result.push(operators.pop()!);
  }

  return result;
}

export function evaluatePostfix(postfix: (number | string)[]): number {
  console.log('postfix: ', postfix);
  const stack: number[] = [];

  postfix.forEach(token => {
      if (typeof token === 'number') {
          stack.push(token);
      } else {
          const b = stack.pop()!;
          const a = stack.pop()!;
          switch (token) {
              case '+':
                  stack.push(a + b);
                  break;
              case '-':
                  stack.push(a - b);
                  break;
              case '*':
                  stack.push(a * b);
                  break;
              case '/':
                  stack.push(a / b);
                  break;
          }
      }
  });

  return stack[0];
}