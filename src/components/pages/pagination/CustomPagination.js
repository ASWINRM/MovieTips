import React from "react";
import Pagination from "@material-ui/lab/Pagination";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";

const darktheme=createMuiTheme({
    palette:{
        type:"dark",
    },
})
const CustomPagination=({setpage,numofpages=10})=>{

   const handlepagechange=(page)=>{
       setpage(page);
       window.scroll(0,0);
   }

    return(
        <div
      style={{
        width: "100%",
        height:"75px",
        display: "flex",
        justifyContent: "center",
        marginTop: 10,
      }}
    >
        <ThemeProvider theme={darktheme}>
        <Pagination
        style={{fontSize:"1.745rem"}}
        onChange={(e)=>{handlepagechange(e.target.textContent)}}
        count={numofpages}
        color="primary"
        hideNextButton
        hidePrevButton
        />
        </ThemeProvider>
        </div>
    )
}

export default CustomPagination;