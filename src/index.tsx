import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Pusher from "pusher-js";
import { BrowserRouter as Router } from "react-router-dom";
import { AllProviders } from './context/AppContextProvider';
import { PUSHER_CONFIG } from './pusher.config';
import { PusherProvider } from "@harelpls/use-pusher";
import App from './App';
import ScrollToTop from "./components/ScrollToTop";

ReactDOM.render(
  <Router>
    <ScrollToTop />
    <PusherProvider {...PUSHER_CONFIG}>
      <AllProviders>
        <App />
      </AllProviders>
    </PusherProvider>
  </Router>,
  document.getElementById('root')
);
