import React from "react"

import { Box, ChakraProvider, theme } from "@chakra-ui/react"

import Header from "./components/Header"
import SimpleSidebar from "./components/Siderbar"
import {
  BrowserRouter,
  Route,
  Outlet,
  Routes,
  Navigate,
} from "react-router-dom"
import Article from "./pages/article/Article"
import Category from "./pages/Category/Category"
import Login from "./pages/Login"
import NotFound from "./pages/NotFound"
import Account from "./pages/ChangePassword"
import { getAuthHeader } from "./api"

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
