import {React, useEffect, useState} from 'react'
import Singlecontent from '../Singlecontent';
import './Trending/Trending.css'

import  './search/SearchContent.css'
import CustomPagination from'./pagination/CustomPagination'


import '../Singlecontent.css'
import {
    Button,
    createMuiTheme,
    Tab,
    Tabs,
    TextField,
    ThemeProvider,
  } from "@material-ui/core";

import SearchIcon from '@material-ui/icons/Search'  

import axios from 'axios';


const Search=()=>{

    const [type,Settype]=useState(0);
    const [page,Setpage]=useState(0);
    const [content,Setcontent]=useState([]);
    const[numofpages,Setnumofpages]=useState(0);
    const [searchText,SetsearchText]=useState("");
   
    const darkTheme=createMuiTheme({
        palette:{
            type:"dark",
            primary:{
              main:"#0D94FB"
            }
        }
    })
   
    const fetchsearch=async ()=>{
        window.scroll(0,0);
          console.log(searchText);
          const data=await axios.get(`https://api.themoviedb.org/3/search/${type ? "tv":"movie"}?api_key=05c0fa57ae6df2b65e5b13ecbbb3630b&language=en-US&page=1&query=${searchText}&include_adult=false
          `);
          //${type ? "tv":"movie"}
          Setcontent(data.data.results);
          Setnumofpages(data.data.total_pages);
          console.log(data);
    }

    useEffect(()=>{
        fetchsearch();
        // eslint-disable-next-line
    },[page,type])

    const media_type=type ? "tv":"Movie";

    

    return(
      <div> 
        <div>
           <ThemeProvider theme={darkTheme}>
               <div className="Search">
                   <TextField
                   style={{flex:1 ,color:"#0D94FB",width:"90%"}}
                   variant="filled"
                   label="Search for your favourite"
                   className="Searchbox"
                   onChange={(e)=>SetsearchText(e.target.value)}
                   ></TextField>
                   <Button variant="contained" style={{backgroundColor:"transparent",
                    color:"#0D94FB"}} onClick={()=>{fetchsearch()}}>
                      <SearchIcon fontSize="large" />
                   </Button>
               </div>
               <Tabs
               value={type}
               indicatorColor="primary"
               textColor="primary"
               onChange={(event,newvalue)=>{
                   Settype(newvalue);
                   Setpage(1);
               }}
               style={{ paddingBottom: 5,margin:"50px" }}
               >

                  <Tab style={{width:"100%"}} label="Search Movies"></Tab> 
                  <Tab style={{width:"100%"}} label="Search TVseries"></Tab>
               </Tabs>
           </ThemeProvider>
        </div>
         
          <div className="trending">
          {
              content && content.map((c)=>(
                  
                  <Singlecontent
                  key={c.id}
                  id={c.id}
                  title={c.title||c.name}
                  poster={c.poster_path}
                  date={c.release_date||c.first_air_date}
                  language={c.original_language}
                  media_type={media_type}
                  rating={c.vote_average}
                  liked={Math.floor(c.popularity)}
                  vote_average={c.vote_average}
                  ></Singlecontent>
                
              ))
              
          }
      </div>

      {searchText && !content &&
      (type ? <h2>No Series Found </h2> : <h2>No Movies Found</h2>)
      }
     
      {numofpages>1 && (
         <CustomPagination setpage={Setpage} numofpages={numofpages}/>
      )} 

      </div> 
    );
}

export default Search;