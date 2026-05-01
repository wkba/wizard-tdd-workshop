import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Step1 from './pages/Step1';
import Step2 from './pages/Step2';
import Step3 from './pages/Step3';
import Step4 from './pages/Step4';

function App(): React.ReactElement {
  return (
    <div className="app">
      <h1 className="app__title">申し込みウィザード</h1>
      <Switch>
        <Route exact path="/">
          <Redirect to="/step1" />
        </Route>
        <Route path="/step1" component={Step1} />
        <Route path="/step2" component={Step2} />
        <Route path="/step3" component={Step3} />
        <Route path="/step4" component={Step4} />
      </Switch>
    </div>
  );
}

export default App;
