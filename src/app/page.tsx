"use client";

import { Provider } from "react-redux";
import { useEffect, useState } from "react";

import NavBar from "@/components/nav-bar";
import Heading from "@/components/heading";
import DataTable from "@/components/data-table";

import { store } from "@/store";

import { Box } from "@mui/material";

export default function Home() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <Provider store={store}>
      <Box
        height="100dvh"
        sx={{
          bgcolor: "#f7e4b2",
        }}
      >
        <NavBar />

        <Box
          sx={{
            margin: 2,
            height: "calc(100dvh - 114px)",
            // dvh, svh, lvh
            bgcolor: "secTextColor.main",
          }}
        >
          <Heading />

          <DataTable />
        </Box>
      </Box>
    </Provider>
  );
}
