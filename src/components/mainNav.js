import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import TvIcon from '@material-ui/icons/Tv';
import WhatshotIcon from '@material-ui/icons/Whatshot';
import MovieFilterIcon from '@material-ui/icons/MovieFilter';
import SearchIcon from '@material-ui/icons/Search';
import {useEffect} from 'react';
import {useHistory} from 'react-router-dom'

const useStyles = makeStyles({
  root: {
    width: "100%",
    height:50,
    bottom:0,
    backgroundColor:"#212121",
    position:"fixed",
    zIndex:100.
  },
});

export default function SimpleBottomNavigation() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
const history=useHistory();
  useEffect(()=>{
    if (value===0) history.push("/");
    else if(value===1) history.push("/Movies");
    else if(value===2) history.push("/TVseries");
    else history.push("/search");
    console.log("value "+value);
  },[value,history])

  return (
    <BottomNavigation
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      showLabels
      className={classes.root}
    >
      <BottomNavigationAction label="Trending" 
     style={{color:"#fff"}}
      icon={<WhatshotIcon />} />
      <BottomNavigationAction label="Movies"
      className="nav"
      style={{color:"#fff"}}
      icon={<MovieFilterIcon />} />
      <BottomNavigationAction label="TV Series"
      className="nav"
      style={{color:"#fff"}}
      icon={<TvIcon />} />
      <BottomNavigationAction label="Search"
      className="nav"
      style={{color:"#fff"}}
      icon={<SearchIcon />} />
    </BottomNavigation>
  );
}