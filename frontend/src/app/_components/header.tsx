import { SiGithub } from '@icons-pack/react-simple-icons';
import { getUser } from '@propelauth/nextjs/server/app-router';
import {
  ArrowRightIcon,
  HeartHandshakeIcon,
  LayoutDashboardIcon
} from 'lucide-react';
import Link from 'next/link';

import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { buttonVariants } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { LogoutButton } from './logout-button';

export async function Header() {
  const user = await getUser();
  return (
    <header className="container mb-6 flex flex-col border-b">
      <div className="flex h-16 justify-between">
        <div className="flex items-center gap-4">
          <Link className="flex items-center gap-2" href="/">
            <HeartHandshakeIcon className="size-6 text-green-500" />
            <span className="inline-block bg-gradient-to-r from-green-500 to-green-700 bg-clip-text text-xl font-semibold tracking-tight text-transparent">
              HAMM
            </span>
          </Link>
        </div>
        <div className="flex items-center gap-3">
          <Link
            className={buttonVariants({ variant: 'outline', size: 'icon' })}
            href="https://github.com/maxxfuu/HAMM"
            aria-label="GitHub"
            target="_blank"
          >
            <SiGithub className="size-4" />
          </Link>
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger className="rounded-full transition-opacity hover:opacity-80">
                <Avatar>
                  <AvatarFallback className="uppercase">
                    {user.firstName?.charAt(0)}
                    {user.lastName?.charAt(0)}
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>
                  <p>
                    {user.firstName} {user.lastName}
                  </p>
                  <p className="font-normal text-muted-foreground">
                    {user.email}
                  </p>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/dashboard">
                    <LayoutDashboardIcon className="mr-2 size-4" />
                    Dashboard
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="w-full" asChild>
                  <LogoutButton />
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link
              className={buttonVariants({ className: 'group' })}
              href="/dashboard"
            >
              Dashboard
              <ArrowRightIcon className="ml-1 size-4 translate-x-0 transition-transform duration-200 ease-in-out group-hover:translate-x-0.5" />
            </Link>
          )}
        </div>
      </div>
      {/* <SearchBar /> */}
    </header>
  );
}
