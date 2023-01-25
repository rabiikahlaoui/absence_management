import React, { useState, useContext } from "react";
import { Container, Menu } from "semantic-ui-react";
import { AuthContext } from "../context/auth";
import { Link } from "react-router-dom";

function MenuBar() {
  const { user, logout } = useContext(AuthContext);
  const pathname = window.location.pathname;
  const path = pathname === "/" ? "home" : pathname.substr(1);
  const [activeItem, setActiveItem] = useState(path);

  const handleItemClick = (e, { name }) => setActiveItem(name);

  const menuBar = (
    <Menu pointing secondary size="massive" color="teal">
      <Container>
        <Menu.Item
          name="home"
          active={activeItem === "home"}
          onClick={handleItemClick}
          as={Link}
          to="/"
        />
        <Menu.Menu position="right">
          {user ? (
            <>
              <Menu.Item name="logout" onClick={logout} />
            </>
          ) : (
            <>
              <Menu.Item
                name="login"
                active={activeItem === "login"}
                onClick={handleItemClick}
                as={Link}
                to="/login"
              />
              <Menu.Item
                name="signup"
                active={activeItem === "signup"}
                onClick={handleItemClick}
                as={Link}
                to="/signup"
              />
            </>
          )}
        </Menu.Menu>
      </Container>
    </Menu>
  );

  return menuBar;
}

export default MenuBar;
