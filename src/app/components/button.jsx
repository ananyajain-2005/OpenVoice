const Button = ({label,buttonStyles,variant='primary',handleClick}) =>{
    const styles={
        primary: "bg-white text-[#384959] text-lg border rounded-lg p-2 px-5 shadow-lg",
        secondary: "bg-[#384959] text-white text-base border rounded-lg p-2 px-5 shadow-lg"
    }
   return(
    <>
    <button className={styles[variant]} onClick={handleClick}>{label}</button>
    </>
   )
} 
export default Button;