import Link from "next/link";
import { FaUser } from "react-icons/fa";

function Navbar() {
  return (
    <>
      <div>
        <div>
          <div className="container mx-auto flex justify-around items-center w-[100%] md:w-[90%]">
            <Link href={"/"}>
              <p className="text-gray-800 font-bold text-3xl pb-2">
                Turbo<span className="text-blue-600">Type</span>
              </p>
            </Link>

            <div className="hidden md:flex gap-6 mt-[15px]">
              <Link
                href={"/"}
                className="text-gray-600 text-[20px] pb-5 font-semibold hover:text-blue-600 cursor-pointer"
              >
                Home
              </Link>
              <Link
                href={"/"}
                className="text-gray-600 text-[20px] pb-5 font-semibold hover:text-blue-600 cursor-pointer"
              >
                About
              </Link>
              <Link
                href={"/"}
                className="text-gray-600 text-[20px] pb-5 font-semibold hover:text-blue-600 cursor-pointer"
              >
                Blog
              </Link>
              <Link
                href={"../Contact/Contact"}
                className="text-gray-600 text-[20px] pb-5 font-semibold hover:text-blue-600 cursor-pointer"
              >
                Contact
              </Link>
            </div>
            <div className="flex gap-4 justify-center">
              <Link href={"login/signin"}>
                <button className="mr-[8px] md:block uppercase mx-auto shadow bg-indigo-800 hover:bg-indigo-600 focus:shadow-outline focus:outline-none text-white text-xs py-3 px-7 rounded">
                  Sign in
                </button>
              </Link>

              <Link href={"loginup/signup"}>
                <button className="hidden md:block uppercase mx-auto shadow bg-indigo-500 hover:bg-indigo-800 focus:shadow-outline focus:outline-none text-white text-xs py-3 px-7 rounded">
                  Sign up
                </button>
              </Link>
              <div className="mx-auto">
                <Link href={"/profileSection/Profile"}>
                  <FaUser className="text-2xl text-center justify-center mt-[6px]" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
