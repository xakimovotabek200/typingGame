import Link from "next/link";
import React from "react";
import { FaInstagram } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { data } from "./FooterData";
import { dataTwo } from "./FooterData";
import { dataThree } from "./FooterData";

function Footer() {
  return (
    <>
      <div className="container mx-auto bg-gray-50 h-1/2 w-full flex md:flex-row flex-col justify-around items-start p-20">
        <div className="p-5 ">
          <ul>
            <p className="text-gray-800 font-bold text-3xl pb-6">
              Turbo<span className="text-blue-600">Type</span>
            </p>
            <div className="flex gap-6 pb-5">
              <FaInstagram className="text-2xl cursor-pointer hover:text-yellow-600" />
              <FaTwitter className="text-2xl cursor-pointer hover:text-blue-600" />
              <FaLinkedin className="text-2xl cursor-pointer hover:text-blue-600" />
              <FaYoutube className="text-2xl cursor-pointer hover:text-red-600" />
            </div>
          </ul>
        </div>
        <div className="p-5">
          <p className="text-gray-800 font-bold text-2xl pb-4">Product</p>
          {data.map((item) => {
            return (
              <div key={item.id}>
                <Link
                  href={item.href}
                  className="text-gray-500 text-md pb-5 font-semibold hover:text-blue-600 cursor-pointer"
                >
                  {item.title}
                </Link>
              </div>
            );
          })}
        </div>
        <div className="p-5">
          <p className="text-gray-800 font-bold text-2xl pb-4">Company</p>
          {dataTwo.map((item) => {
            return (
              <div key={item.id}>
                <Link
                  href={item.href}
                  className="text-gray-500 text-md pb-5 font-semibold hover:text-blue-600 cursor-pointer"
                >
                  {item.title}
                </Link>
              </div>
            );
          })}
        </div>
        <div className="p-5">
          <p className="text-gray-800 font-bold text-2xl pb-4">Support</p>
          {dataThree.map((item) => {
            return (
              <div key={item.id}>
                <Link
                  href={item.href}
                  className="text-gray-500 text-md pb-5 font-semibold hover:text-blue-600 cursor-pointer"
                >
                  {item.title}
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default Footer;
