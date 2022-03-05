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
                  className="flex flex-col text-left"
                >
                  Display Name
                </label>
                <Field
                  name="displayName"
                  component="input"
                  placeholder="Anonymous"
                />
              </div>
              <div className="mt-4 mb-4">
                <label
                  htmlFor="sessionName"
                  className="flex flex-col text-left"
                >
                  Session name
                </label>
                <Field
                  name="sessionName"
                  component="input"
                  placeholder="My room"
                />
              </div>
            </div>
          </div>
          <button
            className="border-2 border-solid rounded-md text-2xl cursor-pointer border-blue-200 px-2 py-1"
            type="submit"
          >
            Create or Join room
          </button>
        </form>
      )}
    />
  );
}
