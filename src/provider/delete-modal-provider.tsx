"use client";

import { useEffect, useState } from "react";

import DeleteModal from "@/components/delete-modal";

const DeleteModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return <DeleteModal />;
};

export default DeleteModalProvider;
