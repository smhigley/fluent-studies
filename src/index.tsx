import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { FluentProvider, webLightTheme, AriaLiveAnnouncer } from '@fluentui/react-components';
import './base.css';
import App from './App';
import GridApp from './studies/grid-study/GridStudy';
import { PageA } from './studies/grid-study/PageA';
import { PageB } from './studies/grid-study/PageB';
import ListApp from './studies/list-study/ListHome';
import ListFilesPage from './studies/list-study/FilesPage';
import ListPluginsPage from './studies/list-study/PluginsPage';
import reportWebVitals from './reportWebVitals';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/grid-study",
    element: <GridApp />,
  },
  {
    path: "/grid-study/pageA",
    element: <PageA />,
  },
  {
    path: "/grid-study/pageB",
    element: <PageB />,
  },
  {
    path: "/list-study",
    element: <ListApp />,
  },
  {
    path: "/list-study/files",
    element: <ListFilesPage />,
  },
  {
    path: "/list-study/plugins",
    element: <ListPluginsPage />,
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
