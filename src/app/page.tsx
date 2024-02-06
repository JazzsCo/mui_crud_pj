"use client";

import { useEffect, useState } from "react";

import Heading from "@/components/heading";
import NavBar from "@/components/nav-bar";

import { Box } from "@mui/material";
import DataTable from "@/components/data-table";

export default function Home() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <Box
      height="100vh"
      sx={{
        bgcolor: "#f7e4b2",
      }}
    >
      <NavBar />

      <Box
        sx={{
          margin: 2,
          height: "calc(100vh - 114px)",
          // dvh, svh, lvh
          bgcolor: "secTextColor.main",
        }}
      >
        <Heading />

        <DataTable />
      </Box>
    </Box>
  );
}
