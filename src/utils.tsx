export function secondsToTimeString(seconds: number): string {
  const minutes = ~~(seconds / 60);
  seconds = seconds % 60;
  return ('0' + minutes).slice(-2) + ':' + ('0' + seconds).slice(-2);
}

export function secondsToMinutes(seconds: number): number {
  return Math.floor(seconds / 60);
}

export function getDateSeconds() : number {
  return (Date.now()) / 1000
}


export enum PomodoroState {
  WORKING, // Main timer
  WORKING_PAUSED, // Timer is paused
  BREAK, // Break timer
  BREAK_PAUSED, // Break timer paused
  DONE, // Timer has finished, initial state
}

export const defaultTimeOptions: number[] = [
  60 * 60,
  50 * 60,
  45 * 60,
  30 * 60,
  25 * 60,
  10 * 60,
  5 * 60,
  1 * 60
];
