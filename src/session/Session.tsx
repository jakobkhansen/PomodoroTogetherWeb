import { useLocation, useSearchParams } from "react-router-dom"


export function Session() {
  let location = useLocation()
  const { displayName, sessionName } = location.state as any
  console.log(location)

  return <div>Session! {displayName} {sessionName}</div>
}
