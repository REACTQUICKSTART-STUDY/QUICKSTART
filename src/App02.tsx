import { ChangeEvent, useEffect, useState } from "react";

type Props = {};

const App02 = (props: Props) => {
  const [count, setCount] = useState<number>(0);
  const [name, setName] = useState<string>("아이유");

  useEffect(() => {
    console.log(`${name} 님이 ${count}번 클릭했습니다`);
  }, [count]);

  return (
    <div>
      이름 변경 :
      <input
        type="text"
        value={name}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
      />
      <hr />
      <button onClick={() => setCount(count + 1)}> 카운트 1증가 </button>
      <p>
        {name} 님이 {count} 번 클릭 하였습니다.
      </p>
    </div>
  );
};

export default App02;
