import axios from 'axios';
import {React, useEffect} from 'react';
import { Chip } from "@material-ui/core";
import { Avatar } from "@material-ui/core";

const Genres=({
    type,
    SetGenre,
    SetselectedGenres,
    page,
    Genre,
    selectedGenres,
    Setpage
})=>{
    
    const fetchGenres=async ()=>{
        const data=await axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=05c0fa57ae6df2b65e5b13ecbbb3630b&language=en-US`);
        
        SetGenre(data.data.genres);
        
       
    };
   
    const handleadd=(genre)=>{
        SetselectedGenres([...selectedGenres,genre]);
       SetGenre(Genre.filter((g)=>g.id!==genre.id)); 
        Setpage(1);
    }

    const handleremove=(genre)=>{
       
        SetselectedGenres(selectedGenres.filter((g)=>g.id!==genre.id)); 
        SetGenre([...Genre,genre]);
        Setpage(1);
    }
    useEffect(()=>{

        fetchGenres();
        
        return ()=>{
            SetGenre({});
        }
     // eslint-disable-next-line
    },[]);

   return(
       <div style={{padding : "60px"}}>
           
           {
               selectedGenres && selectedGenres.map((genre)=>(
                  
                <Chip  style={{margin:"5px" , size:"1.5rem"}} key={genre.id} label={genre.name} color="secondary" 
                 avatar={<Avatar>F</Avatar>} clickable onDelete={()=>handleremove(genre)} />
                 
               ))
           }

           {
               Genre && Genre.map((genre)=>(
                  
                <Chip  style={{margin:"5px" , size:"1.5rem"}} key={genre.id} label={genre.name} color="primary" 
                 avatar={<Avatar>{genre.name.toString().charAt(0)}</Avatar>} clickable onClick={()=>handleadd(genre)} />
                 
               ))
           }
           
       </div>
   );
}

export default Genres;