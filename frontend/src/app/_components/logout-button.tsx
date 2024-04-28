'use client';

import { useLogoutFunction } from '@propelauth/nextjs/client';
import { LogOutIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import type { ButtonHTMLAttributes } from 'react';

export function LogoutButton(props: ButtonHTMLAttributes<HTMLButtonElement>) {
  const router = useRouter();
  const logout = useLogoutFunction();

  const handleClick = async () => {
    await logout();
    router.refresh();
  };

  return (
    <button {...props} onClick={handleClick}>
      <LogOutIcon className="mr-2 size-4" /> Log out
    </button>
  );
}
