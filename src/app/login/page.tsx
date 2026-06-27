'use client';

import { useRouter } from 'next/navigation';
import { LoginPage } from '@/components/LoginPage';

export default function Login() {
  const router = useRouter();

  return (
    <LoginPage
      onLogin={async () => {
        await new Promise((r) => setTimeout(r, 1000));
        router.push('/dashboard');
      }}
    />
  );
}
