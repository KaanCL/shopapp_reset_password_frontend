"use client";
import React, { Suspense, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useSearchParams } from "next/navigation";
import ResetPasswordForm from "@/components/reset_password_form";

export default function Home() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResetPasswordFormWithSearchParams />
    </Suspense>
  );
}

const ResetPasswordFormWithSearchParams = () => {
  const searchParams = useSearchParams();
  const accessToken = searchParams.get("access_token");

  return <ResetPasswordForm accesToken={accessToken} />;
};
