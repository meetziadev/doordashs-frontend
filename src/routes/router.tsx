import React, { lazy } from "react";
import { createBrowserRouter, RouteObject } from "react-router-dom";
import PublicLayout from "@layouts/PublicLayout";
import AdminLayout from "@layouts/AdminLayout";
import AuthLayout from "@layouts/AuthLayout";
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
const ProductDetailPage = lazy(() => import("@pages/Admin/ProductDetailPage"));
const CategoryPage = lazy(() => import("@pages/Admin/CategoryPage"));
const BrandPage = lazy(() => import("@pages/Admin/BrandPage"));
const ShopPage = lazy(() => import("@pages/Admin/ShopPage"));
const OnSalePage = lazy(() => import("@pages/Admin/OnSalePage"));
const NewArrivalPage = lazy(() => import("@pages/Admin/NewArrivalPage"));
const CartPage = lazy(() => import("@pages/Admin/CartPage"));
const CheckoutPage = lazy(() => import("@pages/Admin/CheckoutPage"));
import ProfilePage from "@pages/Admin/ProfilePage";
import OrdersPage from "@pages/Admin/OrdersPage";

const routes: RouteObject[] = [
  {
    element: <PublicLayout />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/about", element: <AboutPage /> },
      { path: "/contact", element: <ContactPage /> },

      { path: "/unauth", element: <Unauth /> },
      { path: "/404", element: <NotFound /> },
    ],
  },
  {
    element: <AuthLayout />,
    children: [
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
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
          { path: "/admin/cart", element: <CartPage /> },
          { path: "/admin/checkout", element: <CheckoutPage /> },
          { path: "/admin/profile", element: <ProfilePage /> },
          { path: "/admin/orders", element: <OrdersPage /> },
          { path: "/brand", element: <ComingSoonPage title="Brand" /> },
          { path: "/shop", element: <ShopPage /> },
          { path: "/on-sale", element: <OnSalePage /> },
          { path: "/new-arrival", element: <NewArrivalPage /> },
          {
            path: "/admin/product/:id",
            element: <ProductDetailPage />
          },
          {
            path: "/admin/category/:slug",
            element: <CategoryPage />
          },
          {
            path: "/admin/brand/:slug",
            element: <BrandPage />
          },
        ],
      },
    ],
  },
];

export const router = createBrowserRouter(routes);
export default router;
