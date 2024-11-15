import React from 'react';
import { Link, useLocation } from "react-router-dom";
import { RIGHT_ARROW } from '../utils/Icons';

const Navigator = () => {
    const location = useLocation().pathname.split("/");
    return (
        <div className="uppercase w-full px-10 py-1 border-t-[1px] border-white bg-gray-900 font-medium flex gap-1 text-white">
        <Link to="/">
          <span className="hover:underline hover:cursor-pointer">Inicio</span>
        </Link>
        <span className="text-xl flex justify-center items-center">{RIGHT_ARROW()}</span>
        <Link to={`/${location[location.length - 1]}`}>
          <span className="hover:underline hover:cursor-pointer">
            {location[location.length - 1].replace("-", " ")}
          </span>
        </Link>
      </div>
    );
}

export default Navigator;
