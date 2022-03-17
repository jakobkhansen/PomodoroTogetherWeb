import { defaultTimeOptions } from "utils";
import { TimePickerOption } from "./TimePickerOption";

export function TimePicker() {
  document.title = "Pomodoro Together";
  return (
    <div className="w-full h-screen m-auto flex">
      <div className="w-fit m-auto sm:grid-cols-2 md:grid-cols-4 gap-2">
        {defaultTimeOptions.map((secs, i) => {
          return <TimePickerOption key={i} seconds={secs} />;
        })}
      </div>
    </div>
  );
}
