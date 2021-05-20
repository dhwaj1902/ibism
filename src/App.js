import React, { Fragment } from "react";
import "./App.css";
import "./index.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Form from "./components/Form";
import Home from "./components/Home";
import "antd/dist/antd.css";

function App() {
  return (
    <div className="min-vh-100 th-grey p-4">
      <div className="container">
        <Router>
          <Switch>
            <Route exact={true} path="/" render={() => <Home />} />
            <Route exact={true} path="/addproduct" render={() => <Form />} />
            <Route
              exact={true}
              path="/editproduct/:product"
              render={() => <Form />}
            />
          </Switch>
        </Router>
      </div>
    </div>
  );
}

export default App;
