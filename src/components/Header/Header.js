import React from "react";
export default class Header extends React.Component {
  render() {
     return (
        <span className="heading">
           
            <img src="https://fontmeme.com/permalink/210415/a14ad8a16ed6c5ab6cd734932edda9d5.png" 
            alt="blade-runner-2049-font" border="0" className="logo"
            onClick={() => window.scroll(0, 0)}
            />
        </span>
     );
   }
 }