import { defaultTimeOptions } from "utils";
import { CustomTimePickerOption } from "./CustomTimePickerOption";
import { TimePickerOption } from "./TimePickerOption";

export function TimePicker() {
  document.title = "Pomodoro Together";
  return (
    <div className="w-full h-screen overflow-y-scroll m-auto flex">
      <div className="w-fit m-auto my-20 sm:my-auto grid grid-cols-2 sm:grid-cols-4 gap-2">
        {defaultTimeOptions.map((secs, i) => {
          return <TimePickerOption key={i} seconds={secs} />;
        })}
        // <CustomTimePickerOption />
      </div>
    </div>
  );
}
