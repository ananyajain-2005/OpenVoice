import Button from "./button";

const Header = () =>{
  return(
    <nav className="flex flex-col md:flex-row justify-between items-center bg-[#0B2E33] gap-2 px-20 py-4 text-white">
      <h1 className="font-bold text-xl">True Feedback</h1>
      <h2 className="text-lg">Welcome, Ananya</h2>
      <Button label="Login" variant="primary"/>
    </nav>
  )
}
export default Header;