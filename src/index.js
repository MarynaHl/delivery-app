import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
  RouterProvider,
  createBrowserRouter,
  Navigate,
} from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./js/store";
import vendorsLoader from "./js/loaders/vendorsLoader";
import menuLoader from "./js/loaders/menuLoader";
import App from "./js/components/App";
import ErrorPage from "./js/components/ErrorPage";
import ShoppingCart from "./js/components/ShoppingCart";
import Shop from "./js/components/Shop";
import Menu from "./js/components/Menu";
import { localStorageSelectedVendor } from "./js/utils/localStorageUtils";
import "./css/index.css";

function Index() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "/",
          element: <Shop />,
          loader: vendorsLoader,
          children: [
            {
              index: true,
              element: (
                <Navigate
                  to={`category/${
                    JSON.parse(localStorageSelectedVendor) || "McDonalds"
                  }`}
                  replace
                />
              ),
            },
            {
              path: "category/:vendorId",
              element: <Menu />,
              loader: menuLoader,
            },
          ],
        },
        {
          path: "/cart",
          element: <ShoppingCart />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

const root = createRoot(document.getElementById("root"));

root.render(
  <StrictMode>
    <Provider store={store}>
      <Index />
    </Provider>
  </StrictMode>
);
