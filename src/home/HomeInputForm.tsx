import { useState } from "react";
import { useCookies } from "react-cookie";
import { Field, Form } from "react-final-form";
import { useLocation, useNavigate } from "react-router-dom";
import useStayAwake from "use-stay-awake";

type SubmissionParams = { displayName: string; sessionName: string };

export function HomeInputForm() {
  const navigate = useNavigate();
  const [cookies, setCookies] = useCookies(["displayName", "sessionName"]);
  const device = useStayAwake();

  function onSubmit({ displayName, sessionName }: SubmissionParams) {
    setCookies("displayName", displayName, {secure: true, path: "/", sameSite: 'none'});
    navigate(`/session/${sessionName}`);
    device.preventSleeping();
  }


  return (
    <Form
      onSubmit={onSubmit}
      render={({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <div>
            <div className="inline-block">
              <div className="mt-4">
                <label
                  htmlFor="displayName"
                  className="flex flex-col text-left dark:text-white text-gray-700 text-sm font-bold ml-0.5"
                >
                  Display Name
                </label>
                <Field
                  name="displayName"
                  placeholder="Anonymous"
                  initialValue={cookies.displayName || ""}
                >
                  {(props) => {
                    return (
                      <div className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                        <input
                          className="bg-transparent dark:text-white"
                          {...props.input}
                          placeholder={props.placeholder}
                        />
                      </div>
                    );
                  }}
                </Field>
              </div>
              <div className="mt-4 mb-4">
                <label
                  htmlFor="sessionName"
                  className="flex flex-col text-left dark:text-white text-sm font-bold ml-0.5"
                >
                  Session name
                </label>
                <Field
                  name="sessionName"
                  component="input"
                  placeholder="My room"
                  initialValue={cookies.sessionName}
                >
                  {(props) => {
                    return (
                      <div className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                        <input
                          className="bg-transparent dark:text-white"
                          {...props.input}
                          placeholder={props.placeholder}
                        />
                      </div>
                    );
                  }}
                </Field>
              </div>
            </div>
          </div>
          <button
            className="border-2 border-solid rounded-md text-2xl cursor-pointer border-blue-200 px-2 py-1 dark:text-white"
            type="submit"
          >
            Create or Join room
          </button>
        </form>
      )}
    />
  );
}
