import React from "react";
import { Switch, Route } from "react-router-dom";

import PageLayout from "./Layout/PageLayout";

// PAGES
import { Home, Crypto, Exchange, News, CryptoDetail, NotFound } from "./Pages";

const App = () => {
  return (
    <div>
      <PageLayout>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>

          <Route path="/exchange">
            <Exchange />
          </Route>

          <Route exact path="/crypto">
            <Crypto />
          </Route>

          <Route path="/crypto/:coinId">
            <CryptoDetail />
          </Route>

          <Route path="/news">
            <News />
          </Route>

          <Route path="/*">
            <NotFound />
          </Route>
        </Switch>
      </PageLayout>
    </div>
  );
};

export default App;
