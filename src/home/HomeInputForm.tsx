import { Field, Form } from "react-final-form";
import { useNavigate } from "react-router-dom";

type SubmissionParams = { displayName: string; sessionName: string };

export function HomeInputForm() {
  const navigate = useNavigate();
  function onSubmit({ displayName, sessionName }: SubmissionParams) {
    navigate("/session", {
      state: { displayName: displayName, sessionName: sessionName },
    });
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
                <Field name="displayName" placeholder="Anonymous">
                  {(props) => {
                    return (
                      <div className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                        <input className="bg-transparent dark:text-white"
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
                  className="flex flex-col text-left dark:text-white text-sm font-bold ml-0.5 duration-1000"
                >
                  Session name
                </label>
                <Field
                  name="sessionName"
                  component="input"
                  placeholder="My room"
                >
                  {(props) => {
                    return (
                      <div className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                        <input className="bg-transparent dark:text-white"
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
