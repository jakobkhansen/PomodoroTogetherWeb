import { PomodoroState } from "utils";

type ClockProps = {
  timestamp: number;
  timeLeft: number;
  state: PomodoroState;
  timeOffset : number,
  onPress: (state: PomodoroState) => any;
  onFinished : () => any;
};

export function Clock(props : ClockProps) {
  return <></>
}

