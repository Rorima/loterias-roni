import { createBrowserRouter } from "react-router-dom";

import Layout from "./components/Layout";

import HomePage from "./pages/HomePage";
import BettingPage from "./pages/BettingPage";
import StocksPage from "./pages/StocksPage";
import FixedIncomePage from "./pages/FixedIncomePage";
import StatisticsPage from "./pages/StatisticsPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Layout>
        <HomePage />
      </Layout>
    ),
  },
  {
    path: "/betting",
    element: (
      <Layout>
        <BettingPage />
      </Layout>
    ),
  },
  {
    path: "/stocks",
    element: (
      <Layout>
        <StocksPage />
      </Layout>
    ),
  },
  {
    path: "/fixed-income",
    element: (
      <Layout>
        <FixedIncomePage />
      </Layout>
    ),
  },
  {
    path: "/statistics",
    element: (
      <Layout>
        <StatisticsPage />
      </Layout>
    ),
  },
]);