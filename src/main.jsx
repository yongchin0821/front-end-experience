// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import "./index.css";
// import App from './App.jsx'

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <App />
//   </StrictMode>,
// )

// import { StrictMode, Suspense } from "react";
// import { createRoot } from "react-dom/client";
// import { BrowserRouter, useRoutes } from "react-router-dom";

// import routes from "~react-pages";

// function App() {
//   return (
//     <Suspense fallback={<p>Loading...</p>}>
//       {useRoutes(routes)}
//     </Suspense>
//     // <> {useRoutes(routes)}</>
//   );
// }

// const app = createRoot(document.getElementById("root"));

// app.render(
//   <StrictMode>
//     <BrowserRouter>
//       <App />
//     </BrowserRouter>
//   </StrictMode>
// );

import { createBrowserRouter, RouterProvider } from "react-router";

import React from "react";
import ReactDOM from "react-dom/client";
import Home from "./pages/index";
import Slideshow from "./pages/SlideShow/index";
import Prod from "./pages/prod/index";
import Dissolve from "./pages/shaders/dissolve/index";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Home,
  },
  {
    path: "/slideshow",
    Component: Slideshow,
  },
  {
    path: "/prod",
    Component: Prod,
  },
  {
    path: "/shaders/dissolve",
    Component: Dissolve,
  },
]);

const root = document.getElementById("root");

ReactDOM.createRoot(root).render(<RouterProvider router={router} />);
