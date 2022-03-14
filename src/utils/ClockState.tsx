
import { PomodoroState } from "utils";

export class ClockState {
  constructor(
    public timestamp: number,
    public timeLeft: number,
    public state: PomodoroState,
    public timeOffset: number
  ) {}
}
