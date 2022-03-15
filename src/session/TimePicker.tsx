import { defaultTimeOptions } from "utils";
import { TimePickerOption } from "./TimePickerOption";

export function TimePicker() {
  document.title = "Pomodoro Together";
  return (
    <div className="w-full h-screen m-auto flex">
      <div className="w-fit m-auto grid grid-cols-4">
        {defaultTimeOptions.map((secs, i) => {
          return <TimePickerOption key={i} seconds={secs} />;
        })}
      </div>
    </div>
  );
}
