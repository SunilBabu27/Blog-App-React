import React from 'react';
import '../App.css';
import { BrowserRouter, Route } from 'react-router-dom';
import Home from './Home';
import Details from './Details';

function Router() {
  return (
    <BrowserRouter>
      <Route exact path="/" component={Home} />
      <Route path="/details/:Id" component={Details} />
    </BrowserRouter>
  );
}

export default Router;
