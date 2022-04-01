export function UserList({users} : {users : String[]}): JSX.Element {
  return <>{users.map((user) => <div className="dark:text-white">{user}</div>)}</>
}
