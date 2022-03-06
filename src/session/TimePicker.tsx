import { defaultTimeOptions } from "utils";
import { TimePickerOption } from "./TimePickerOption";

export function TimePicker() {
  return (
    <div className="max-h-screen max-w-xl m-auto h-screen flex flex-row justify-around content-center flex-wrap">
      {defaultTimeOptions.map((secs, i) => {
        return <TimePickerOption key={i} seconds={secs} />;
      })}
    </div>
  );
}
