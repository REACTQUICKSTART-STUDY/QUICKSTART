import { TimeFormatEnum, useClockTime } from "../hooks/useClockTime";

// Custom 적용
const App = () => {
  const currentTime = useClockTime(1000, TimeFormatEnum.HHmmssKOR)

  return (
    <>
      <h2>현재 시각</h2>
      <hr />
      <div>{currentTime}</div>
    </>
  )
}

export default App