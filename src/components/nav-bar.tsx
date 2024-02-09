"use client";

import Link from "next/link";
import Image from "next/image";

import { Avatar, IconButton, Stack, Typography } from "@mui/material";

const NavBar = () => {
  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      sx={{
        px: 5,
        py: 1,
        bgcolor: "mainColor.main",
      }}
    >
      <Link href="/">
        <Image
          alt="Logo-Image"
          src="/resources/logo(2).png"
          priority
          width={45}
          height={60}
          style={{
            objectFit: "contain",
          }}
        />
      </Link>

      <Stack direction="row" gap={3}>
        <IconButton>
          <Image
            alt="Noti-Image"
            src="/resources/noti.png"
            priority
            width={20}
            height={20}
            style={{
              objectFit: "cover",
            }}
          />
        </IconButton>

        <Stack direction="row" gap={2}>
          <Avatar alt="User-Image" src="/resources/user.png" />

          <Stack direction="column">
            <Typography
              sx={{
                color: "secTextColor.main",
              }}
              variant="body1"
            >
              Lisa
            </Typography>
            <Typography
              sx={{
                color: "#eeeeee",
              }}
              variant="subtitle2"
            >
              Operator
            </Typography>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default NavBar;
