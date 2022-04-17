import { BrowserRouter, Navigate, Outlet, Route, Routes } from "react-router-dom";

import { Box, ChakraProvider, theme } from "@chakra-ui/react";

import { getAuthHeader } from "@Api/index";

import Article from "@Pages/Article/Article";
import Category from "@Pages/Category/Category";
import Account from "@Pages/ChangePassword";
import Login from "@Pages/Login";
import NotFound from "@Pages/NotFound";

import Header from "@Components/Header";
import SimpleSidebar from "@Components/Siderbar";

export const App = () => {
  const PrivateRootRouter = () => {
    const isLogin = getAuthHeader()
    return isLogin ? (
      <div>
        <Header />
        <Box textAlign="center" fontSize="xl">
          <SimpleSidebar>
            <Outlet />
          </SimpleSidebar>
        </Box>
      </div>
    ) : (
      <Navigate to="/login" replace />
    )
  }

  return (
    <BrowserRouter>
      <ChakraProvider theme={theme}>
        <Routes>
          <Route path="/" element={<PrivateRootRouter />}>
            <Route path="" element={<Navigate to="/article" replace />} />
            <Route path="/article" element={<Article />} />
            <Route path="/category" element={<Category />} />
            <Route path="/change-password" element={<Account />} />
          </Route>

          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </ChakraProvider>
    </BrowserRouter>
  )
}
