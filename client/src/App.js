import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Container } from "semantic-ui-react";

import "semantic-ui-css/semantic.min.css";
import "./App.css";
import MenuBar from "./components/MenuBar";

import { AuthProvider } from "./context/auth";
import AuthRoute from "./util/AuthRoute";

function App() {
  return (
    <div>
      <AuthProvider>
        <BrowserRouter>
          <MenuBar />
          <Container>
            <AuthRoute />
          </Container>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
