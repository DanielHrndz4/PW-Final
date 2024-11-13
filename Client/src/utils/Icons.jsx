import React from "react"
import { FaBook } from "react-icons/fa6";
import { RiArrowDownDoubleLine, RiArrowUpDoubleLine } from "react-icons/ri";
import { IoMdLogOut, IoIosArrowForward  } from "react-icons/io";
import { SiAbbrobotstudio } from "react-icons/si";
import { FaScroll } from "react-icons/fa6";
import { MdKeyboardDoubleArrowRight, MdOutlineMail } from "react-icons/md";

export const BOOK = ()=>{
    return <FaBook />
}

export const BOTTOM_ARROW = ()=>{
    return <RiArrowDownDoubleLine />
}

export const UP_ARROW = ()=>{
    return <RiArrowUpDoubleLine />
}

export const RIGHT_ARROW = ()=>{
    return <MdKeyboardDoubleArrowRight />
}

export const LOGOUT = ()=>{
    return <IoMdLogOut />
}

export const ROLE = ()=>{
    return <FaScroll />
}

export const CARRER = ()=>{
    return <SiAbbrobotstudio />
}

export const EMAIL = ()=>{
    return <MdOutlineMail />
}

export const FORWARD = ()=>{
    return <IoIosArrowForward />
}