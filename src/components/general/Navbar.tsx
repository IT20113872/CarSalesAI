import Link from "next/link";

import { Button, buttonVariants } from "../ui/button";
import Image from "next/image";
import Logo from "@/public/logo.png";

import { Menu } from "lucide-react";
import { Themetoggle } from "@/components/general/Themetoggle";
import { auth, signOut } from "@/app/utils/auth";
import { UserDropdown } from "./UserDropdown";
// import { signOut } from "next-auth/react";
// import { signOut } from "@/auth"; // server function in app router


export async function Navbar() {
  const session = await auth()
  return (
    // <nav className="flex justify-between items-center py-5">
    <nav className="flex justify-between items-center py-5 container mx-auto">
      <Link href="/" className="flex items-center gap-2">
        <Image src="/logo.png" alt="Job Marshal Logo" width={100} height={100} />
        <h1 className="text-2xl font-bold">
          CarSales<span className="text-2xl font-bold text-primary">AI</span>
        </h1>
      </Link>

      <div className="flex items-center gap-4">
        <Themetoggle />
        <Link href="/xpost-job" className={buttonVariants({ size: "lg" })}>
          Post Ad
        </Link>
        {session?.user ? (
          <UserDropdown
            email={session.user.email as string}
            name={session.user.name as string}
            image={session.user.image as string}
          />
        ) : (
          <Link
            href="/login"
            className={buttonVariants({ variant: "outline", size: "lg" })}
          >
            Login
          </Link>
        )}
      </div>
     
</nav>
  );    
} 