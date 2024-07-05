import PropTypes from 'prop-types';
import { FaToggleOn } from "react-icons/fa6";
import { FaToggleOff } from "react-icons/fa6";
import { CgProfile } from "react-icons/cg";
import { useState } from 'react';
export default function Navbar({ title }) {
    const [theme, setTheme] = useState(false);
    const darkModeHandler = () => {
        setTheme(!theme)
        document.body.classList.toggle("dark")
    }
    return (
        <nav className="navbar flex justify-between items-center dark:bg-slate-900 dark:text-white shadow shadow-slate-500 box">
            <h1 className='text-3xl p-2 font-bold'>{title}</h1>
            <div className='btn-group flex gap-2'>
                <button className="btn p-2 text-3xl hover:scale-110" onClick={darkModeHandler}>
                    {theme ? <FaToggleOff /> : <FaToggleOn />}
                </button>
                <button className="btn p-2 text-3xl hover:scale-110"><CgProfile /></button>
            </div>
        </nav>
    )
}


Navbar.propTypes = {
    title: PropTypes.string.isRequired,
};