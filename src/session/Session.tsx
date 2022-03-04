import { useSearchParams } from "react-router-dom"


export function Session() {
  let [searchParams, setSearchParams] = useSearchParams();
  const username = searchParams.get("username")
  const sessionId = searchParams.get("sessionId")
  return <div>Session!</div>
}
