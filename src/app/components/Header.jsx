import Button from "./button";
import Link from "next/link";

const Header = () =>{
  return(
    <nav className="flex flex-col md:flex-row justify-between items-center bg-[#0B2E33] gap-2 px-20 py-4 text-white">
      <h1 className="font-bold text-xl">True Feedback</h1>
      <h2 className="text-lg">Welcome, Ananya</h2>
      <Link href="/login"><Button label="Login" variant="primary"/></Link>
    </nav>
  )
}
export default Header;