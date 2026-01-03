'use client';
import { useContext } from "react";
import { usePathname, useRouter } from "next/navigation";
import Button from "./button";
import Link from "next/link";
import UserContext from "../context/userContext";

const Header = () => {
  const { user, logout } = useContext(UserContext);
  const pathname = usePathname();
  const router = useRouter();

  // ❌ login page par header hide
  if (pathname === "/login") return null;

  const handleLogout = () => {
    logout();
    router.replace("/"); // back par login na aaye
  };
  return (
    <nav className="flex flex-col md:flex-row justify-between items-center bg-[#0B2E33] gap-2 px-35 py-4 text-white">
      <h1 className="font-bold text-xl">OpenVoice</h1>
      {pathname === "/" && (
        <Link href="/login"><Button label="Login" variant="primary" /></Link>
      )}

      {pathname === "/dashboard" && user && (
        <div>
          <span className="absolute left-1/2 -translate-x-1/2 translate-y-2 text-lg font-medium">
            Welcome {user.userName}
          </span>
          <Button
            label="Logout"
            variant="secondary"
            handleClick={handleLogout}
          />
        </div>)}

    </nav>
  )
}
export default Header;