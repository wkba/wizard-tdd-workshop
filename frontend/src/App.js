import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

function App() {
  return (
    <div className="app">
      <h1 className="app__title">申し込みウィザード</h1>
      <Switch>
        <Route exact path="/">
          <Redirect to="/step1" />
        </Route>
        <Route path="/step1">
          <p>Step 1 - 準備中</p>
        </Route>
        <Route path="/step2">
          <p>Step 2 - 準備中</p>
        </Route>
        <Route path="/step3">
          <p>Step 3 - 準備中</p>
        </Route>
        <Route path="/step4">
          <p>Step 4 - 準備中</p>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
