import Button from "./button";

const Form = () => {
    const handleClick = () => {
        console.log("form submitted");
    }
    return (
        <div className="bg-[#B8E3E9] min-h-screen flex justify-center items-center">
            <form className="bg-white flex flex-col w-full justify-center items-center max-w-md rounded-xl p-5 py-9" onSubmit={handleClick()} method="POST">
                <div className="flex flex-col justify-center items-center text-center">
                    <h1 className="text-5xl font-bold mb-5">Join True Feedback</h1>
                    <h2 className="text-lg">Sign up to start your anonymous adventure</h2>
                </div>
                <div className="mt-5 p-4">
                    <label className="font-semibold">Username</label>
                    <input type="text" className="border border-gray-300 rounded-lg p-2 w-full mt-2 mb-5" />
                    <label className="font-semibold">Email</label>
                    <input type="email" className="border border-gray-300 rounded-lg p-2 w-full mt-2 mb-5" />
                    <label className="font-semibold">Password</label>
                    <input type="password" className="border border-gray-300 rounded-lg p-2 w-full mt-2" />
                </div>
                <Button label="Sign Up" variant="secondary" buttonStyles="w-70 mx-8 my-3"/>
                <p className="text-center text-lg mt-4">Already a member?<a className="px-3 text-blue-500">Sign in</a></p>
            </form>
        </div>
    );
};

export default Form;
