import React from "react"
import { BrowserRouter as Router, Route, Link } from "react-router-dom"
import BaseDemoComponent from './components/BaseDemoComponent'
import ListDemoComponent from './components/ListDemoComponent'
const App = () => (
  <Router>
    <div>
      <ul>
        <li>
          <Link to="/">base</Link>
        </li>
        <li>
          <Link to="/list">list</Link>
        </li>
      </ul>
      <hr />
      <Route exact path="/" component={BaseDemoComponent} />
      <Route path="/list" component={ListDemoComponent} />
    </div>
  </Router>
);

export default App;