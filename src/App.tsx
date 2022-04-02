import React from "react";

import { Box, ChakraProvider, theme } from "@chakra-ui/react";

import Header from "./components/Header";
import SimpleSidebar from "./components/Siderbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Article from "./pages/Article";
import Category from "./pages/Category";
import Login from "./pages/Login";

export const App = () => (
  <BrowserRouter>
    <ChakraProvider theme={theme}>
      <Routes>
        <Header />
        <Box textAlign="center" fontSize="xl">
          <SimpleSidebar>
            <Route path="/article" element={<Article />} />
            <Route path="/category" element={<Category />} />
            <Route path="/login" element={<Login />} />
          </SimpleSidebar>
        </Box>
      </Routes>
    </ChakraProvider>
  </BrowserRouter>
);
