import { createBrowserRouter } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import InvestmentPage from "./pages/InvestmentPage";
import SubscriptionPage from "./pages/SubscriptionPage";

export const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      {
        path: "/dashboard",
        element: <DashboardPage />,
      },
      {
        path: "/investments",
        element: <InvestmentPage />,
      },
      {
        path: "/subscriptions",
        element: <SubscriptionPage />,
      },
    ],
  },
  {
    path: "/",
    element: <LoginPage />,
  },
]);
