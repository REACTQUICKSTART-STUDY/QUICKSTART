import React, { useEffect, useState } from "react";
import DateAndTime from "date-and-time";

type ClockProps = {
  formatString: string;
};

const Clock = ({ formatString }: ClockProps) => {
  const [currentTime, setCurrentTime] = useState<Date>(new Date());

  useEffect(() => {
    console.log("Clock Mounted!!!");
    const handle = setInterval(() => {
      console.log("Tick Tok");
      setCurrentTime(new Date());
    }, 1000);

    return () => {
      console.log("Clock Unmounted!!!");
      clearInterval(handle);
    };
  }, []);

  return (
    <div style={{ border: "1px solid gray", padding: "5px", margin: "5px" }}>
      <h3>{DateAndTime.format(currentTime, formatString)}</h3>
    </div>
  );
};

export default Clock;
