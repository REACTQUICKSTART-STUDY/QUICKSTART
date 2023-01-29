import { ChangeEvent, useEffect, useState } from "react";

const App04 = () => {
  const [count, setCount] = useState<number>(0);
  const [name, setName] = useState<string>("체리");

  useEffect(() => {
    console.log(`이름: ${name}`);
  }, [name]);
  useEffect(() => {
    console.log(`카운트 ${count}`);
  }, [count]);
  return (
    <div>
      이름 변경:{" "}
      <input
        type="text"
        value={name}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
      />
      <hr />
      <button onClick={() => setCount(count + 1)}>count +</button>
      <p>
        {name} 님이 {count}번 클릭 했습니다.
      </p>
    </div>
  );
};

export default App04;
