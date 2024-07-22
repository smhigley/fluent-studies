import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { FluentProvider, webLightTheme, AriaLiveAnnouncer } from '@fluentui/react-components';
import './index.css';
import App from './App';
import { PageA } from './PageA';
import { PageB } from './PageB';
import reportWebVitals from './reportWebVitals';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/pageA",
    element: <PageA />,
  },
  {
    path: "/pageB",
    element: <PageB />,
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <div className='wrapper'>
    <FluentProvider theme={webLightTheme}>
      <AriaLiveAnnouncer>
        <RouterProvider router={router} />
      </AriaLiveAnnouncer>
    </FluentProvider>
  </div>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
