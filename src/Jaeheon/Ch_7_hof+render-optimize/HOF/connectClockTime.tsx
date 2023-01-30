import React, { useState, useEffect } from "react";
import DateAndTime from "date-and-time";

export enum TimeFormatEnum {
  HHmmss = "HH:mm:ss",
  HHmm = "HH:mm",
  HHmmKOR = "HH시 mm분",
  HHmmssKOR = "HH시 mm분 ss초",
}

export const connectClockTime = (
  TargetComponent: React.ComponentType<any>,
  timeFormat: TimeFormatEnum,
  interval: number
) => {
  return (props: any) => {
    const [currentTime, setCurrentTime] = useState<string>(
      DateAndTime.format(new Date(), timeFormat)
    );

    useEffect(() => {
      const handle: number = setInterval(() => {
        setCurrentTime(DateAndTime.format(new Date(), timeFormat));
      }, interval);

      return () => {
        clearInterval(handle);
      };
    }, []);

    return <TargetComponent {...props} currentTime={currentTime} />;
  };
};
