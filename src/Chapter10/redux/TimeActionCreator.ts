import { createAction, createAsyncThunk } from '@reduxjs/toolkit'

const timeout = 
  (delayTime: number) => new Promise((resolve) => setTimeout(resolve, delayTime))

// export const TIME_ACTION = {
//   CHANGE_TIME_REQUEST: 'changeTime' as const,
//   CHANGE_TIME_COMPLETED: 'changeTimeCompleted' as const,
// };

// export type TimeActionType = ReturnType<typeof TimeActionCreator.changeTime>;

const TimeActionCreator = {
  // changeTimeRequest: () => {
  //   return { type: TIME_ACTION.CHANGE_TIME_REQUEST };
  // },
  // changeTimeCompleted: ({ currentTime }: { currentTime: Date }) => {
  //   return {
  //     type: TIME_ACTION.CHANGE_TIME_COMPLETED,
  //     payload: { currentTime: currentTime },
  //   }
  // },
  asyncChangeTime: createAsyncThunk(
    'changeTime',
    async (undefined, thunkAPI) => {
      await timeout(2000)
      return { currentTime: new Date() }
    }
  ) 
  // {
    // 의도적 지연 시간 1초
    // return (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    //   dispatch(this.changeTimeRequest())
    //   setTimeout(() => {
    //     dispatch(this.changeTimeCompleted({ currentTime: new Date() }))
    //   }, 1000)
    // }
  // }
};

// export type TimeActionType = 
//   | ReturnType<typeof TimeActionCreator.changeTimeCompleted>
//   | ReturnType<typeof TimeActionCreator.changeTimeRequest>

export default TimeActionCreator;