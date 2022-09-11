import React, {useState, useRef} from "react";

// Press ctrl + space to see all the props that an component needs
interface Person {
    firstName: string
    lastName: string
}

interface Props {
  text: string;
  ok?: boolean;
  i?: number;
  fn?: (bob:string) => string
  person: Person
}

const TextField: React.FC<Props> = () => {
    const [count, setCount] = useState<number | null>(5);
    const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div>
      <input ref={inputRef} />
    </div>
  );
};

export {TextField}
