import React from "react";
import Pagination from "@material-ui/lab/Pagination";
import { ThemeProvider } from "@material-ui/core";
import { createTheme } from '@mui/material/styles';
import { makeStyles } from "@material-ui/core";

const darktheme=createTheme({
    palette:{
        type:"dark",
    },
})

const useStyles = makeStyles(() => ({
    ul: {
      "& .MuiPaginationItem-root": {
        color: "white",
        fontSize:'1rem'
      }
    }
  }))
const CustomPagination=({setpage,numofpages=10})=>{

   const handlepagechange=(page)=>{
       setpage(page);
       window.scroll(0,0);
   }
   const classes = useStyles();
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
            <div style={{color:'white'}}>
        <Pagination
       classes={{ ul: classes.ul }}
        style={{fontSize:"1.745rem"}}
        onChange={(e)=>{handlepagechange(e.target.textContent)}}
        count={numofpages}
        color="primary"
        hideNextButton
        hidePrevButton
        />
        </div>
        </ThemeProvider>
        </div>
    )
}

export default CustomPagination;