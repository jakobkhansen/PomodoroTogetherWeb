import { defaultTimeOptions } from "utils";
import { TimePickerOption } from "./TimePickerOption";

export function TimePicker() {
  return (
    <div className="w-1/3 m-auto h-screen flex flex-row justify-center content-center flex-wrap">
      {defaultTimeOptions.map((secs, i) => {
        return <TimePickerOption key={i} seconds={secs} />;
      })}
    </div>
  );
}
