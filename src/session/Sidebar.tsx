import { slide as Menu } from "react-burger-menu";

var styles = {
  bmBurgerButton: {
    position: "fixed",
    width: "36px",
    height: "30px",
    right: "36px",
    top: "36px",
  },
  bmBurgerBars: {
    background: "#373a47",
  },
  bmBurgerBarsHover: {
    background: "#a90000",
  },
  bmCrossButton: {
    height: "24px",
    width: "24px",
  },
  bmCross: {
    background: "#bdc3c7",
  },
  bmMenuWrap: {
    position: "fixed",
    height: "100%",
  },
  bmMenu: {
    background: "#373a47",
    padding: "2.5em 1.5em 0",
    fontSize: "1.15em",
  },
  bmMorphShape: {
    fill: "#373a47",
  },
  bmItemList: {
    color: "#b8b7ad",
    padding: "0.8em",
    margin:"auto"
  },
  bmItem: {
    display: "flex",
  },
  bmOverlay: {
    background: "rgba(0, 0, 0, 0)",
  },
};

export function Sidebar({ users }: { users: string[] }) {
  return (
    <div>
      <Menu
        right
        itemListElement="div"
        styles={styles}
        outerContainerId={"outer-container"}
        pageWrapId={"page-wrap"}
      >
        <h1 className="text-xl text-white">Users in session:</h1>
        {users.map((user, i) => (
          <div key={i} className="text-md">{user}</div>
        ))}
      </Menu>
    </div>
  );
}
