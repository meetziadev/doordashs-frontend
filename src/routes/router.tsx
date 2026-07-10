import React, { lazy } from "react";
import { createBrowserRouter, RouteObject } from "react-router-dom";
import PublicLayout from "@layouts/PublicLayout";
import AdminLayout from "@layouts/AdminLayout";
import ProtectedRoute from "@pages/Layout/ProtectedRoute";

const HomePage = lazy(() => import("@pages/Public/HomePage"));
const AboutPage = lazy(() => import("@pages/Public/AboutPage"));
const ContactPage = lazy(() => import("@pages/Public/ContactPage"));
const ComingSoonPage = lazy(() => import("@pages/Public/ComingSoon"));
const Login = lazy(() => import("@pages/Auth/Login"));
const Register = lazy(() => import("@pages/Auth/Register"));
const AdminDashboard = lazy(() => import("@pages/Admin/Dashboard"));
const AdminUsers = lazy(() => import("@pages/Admin/Users"));
const NotFound = lazy(() => import("@pages/404"));
const Unauth = lazy(() => import("@pages/Unauth"));

const routes: RouteObject[] = [
  {
    element: <PublicLayout />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/about", element: <AboutPage /> },
      { path: "/contact", element: <ContactPage /> },

      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
      { path: "/unauth", element: <Unauth /> },
      { path: "/404", element: <NotFound /> },
    ],
  },
  {
    element: <AdminLayout />,
    children: [
      {
        element: <ProtectedRoute roles={["admin", "manager"]} />,
        children: [
          { path: "/admin", element: <AdminDashboard /> },
          { path: "/admin/users", element: <AdminUsers /> },
          { path: "/shop", element: <ComingSoonPage title="Shop" /> },
          { path: "/on-sale", element: <ComingSoonPage title="On Sale" /> },
          {
            path: "/new-arrival",
            element: <ComingSoonPage title="New Arrival" />,
          },
        ],
      },
    ],
  },
];

export const router = createBrowserRouter(routes);
export default router;
