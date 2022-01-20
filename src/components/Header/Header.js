import React from "react";
import './Header.css';
export default class Header extends React.Component {
  render() {
     return (
        <span className="heading">
           
            <img src="https://res.cloudinary.com/memogram/image/upload/v1642616871/memogram/movietips_znjgzv.png"
            alt="blade-runner-2049-font" border="0" className="logo"
            onClick={() => window.scroll(0, 0)}
            />
        </span>
     );
   }
 }