"use client";
import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import ResetPasswordForm from "@/components/reset_password_form";

export default function Home() {
  const searchParams = useSearchParams();
  const accessToken = searchParams.get('access_token');

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <ResetPasswordForm accessToken={accessToken} />
      </div>
    </Suspense>
  );
}
