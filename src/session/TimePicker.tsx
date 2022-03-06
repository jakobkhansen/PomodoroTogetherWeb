import { defaultTimeOptions } from "utils";
import { TimePickerOption } from "./TimePickerOption";

export function TimePicker() {
  return (
    <div>
      <div className="h-full flex-1 flex-row flex-wrap">
        {defaultTimeOptions.map((secs, i) => {
          return <TimePickerOption key={i} seconds={secs} />;
        })}
      </div>
    </div>
  );
}
