import { ClockState } from "./ClockState";

export class SessionState {
  constructor(public users: string[], public clock: ClockState) {}
}
