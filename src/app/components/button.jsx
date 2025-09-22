const Button = ({label,buttonStyles,variant='primary',handleClick}) =>{
    const styles={
        primary: "bg-white text-[#0B2E33] w-full text-lg border rounded-lg p-2 px-5 shadow-lg",
        secondary: "bg-[#0B2E33] text-white  text-base border rounded-lg p-2 px-5 shadow-lg"
    }
   return(
    <>
    <button  className={`${styles[variant]} ${buttonStyles}`}  onClick={handleClick}>{label}</button>
    </>
   )
} 
export default Button;