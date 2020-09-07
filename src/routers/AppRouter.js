import React, { lazy, Suspense } from 'react';
import { Switch, Route, Redirect } from "react-router-dom";
import Home from '../components/home';

const Dashboard = lazy(() => import('../components/Dashboard'));

const AppRouter = () => {
  return (
    <Suspense fallback="<div>Loading...</div>">
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/dashboard" component={Dashboard} />
      </Switch>
    </Suspense>
  )
}

export default AppRouter;