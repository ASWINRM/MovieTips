import {React, useEffect, useState} from 'react'
import Singlecontent from '../Singlecontent';
import './Trending/Trending.css'
import  './search/SearchContent.css'
import CustomPagination from'./pagination/CustomPagination'

import {useHistory} from 'react-router-dom'
import '../Singlecontent.css'
import {
    Button,
    
    Tab,
    Tabs,
    TextField,
    ThemeProvider,
  } from "@material-ui/core";
  import { createTheme } from '@mui/material/styles';

import SearchIcon from '@material-ui/icons/Search'  

import axios from 'axios';


const Search=()=>{

    const [type,Settype]=useState(0);
    const [page,Setpage]=useState(0);
    const [content,Setcontent]=useState([]);
    const[numofpages,Setnumofpages]=useState(0);
    const [searchText,SetsearchText]=useState("");
    const history=useHistory();
    const darkTheme=createTheme({
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
      if(searchText!==""){
        const data=await axios.get(`https://api.themoviedb.org/3/search/${type ? "tv":"movie"}?api_key=05c0fa57ae6df2b65e5b13ecbbb3630b&language=en-US&page=1&query=${searchText}&include_adult=false
        `);
        //${type ? "tv":"movie"}
        console.log(type);
        Setcontent(data.data.results);
        Setnumofpages(data.data.total_pages);
        console.log(data.data.results);
      }
     
}
useEffect(()=>{
    if(searchText.length>0){
        fetchsearch();
    }
    
},[searchText]);
    useEffect(()=>{
        fetchsearch();
        console.log(type);
        // eslint-disable-next-line
    },[page,type])

    const media_type=type ? "tv":"Movie";

    const showdetail=(id,mediatype)=>{
        // /details/${id}/${genre}
        history.push(`/details/${id}/${mediatype}`)
    }
    

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
               {
                   searchText.length>0 && <div className="Autossearchdiv">
                   {(content!==""&&searchText!=="") && content.length>8 ? content.slice(0, 8).map((c)=>(
                   <div className="Autosearchbox" key={c.id} onClick={()=>showdetail(c.id,type?"tv":"movie")}>
                          {type? (<p>{c.title||c.name}</p>):(<p>{c.title }</p>)}
                          </div>))
                          
                          :content.map((c)=>{
                              console.log(c.name);
                            return(
                            <div className="Autosearchbox" key={c.id}>
                             {
                                  
                                    (searchText.length>0) &&
                                     type? (<p>{c.title||c.name}</p>):(<p>{c.title }</p>)   
                                }
                                 
                         </div>
                        )})
                          }
                  </div>
               }
              
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
              content ? content.map((c)=>(
                  
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
                
              )):
                  <h1>Nothing found</h1>
              
              
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