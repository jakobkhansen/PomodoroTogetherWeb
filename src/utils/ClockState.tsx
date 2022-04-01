import { getDateSeconds, PomodoroState, secondsToTimeString } from "utils";

export class ClockState {
  constructor(
    public timestamp: number,
    public timeLeft: number,
    public state: PomodoroState,
    public timeOffset: number
  ) {}

  public secondsLeft() : number {
    return Math.floor(
      this.timeLeft - (getDateSeconds() - this.timeOffset - this.timestamp)
    );
  }

  public done() {
    return Math.floor(
      this.timeLeft - (getDateSeconds() - this.timeOffset - this.timestamp)
    ) <= 0;
  }

  public secondsToDisplay() {
    return secondsToTimeString(this.secondsLeft())
  }
}
