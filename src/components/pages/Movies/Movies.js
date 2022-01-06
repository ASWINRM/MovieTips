import axios from 'axios';
import {React, useEffect, useState} from 'react';
import Singlecontent from '../../Singlecontent'
import '../Trending/Trending.css'
import CustomPagination from'../pagination/CustomPagination'
import Genres from '../../Genres/Genres';
import useGenre from '../../../hooks/useGenre';
const Movies=()=>{
    const [page,Setpage]=useState(1);
    const [content,Setcontent]=useState([]);
    const[numofpages,Setnumofpages]=useState(0);
    const [selectedGenres,SetselectedGenres]=useState([]);
    const [Genre,SetGenre]=useState([]);
    const genreteURL=useGenre(selectedGenres);
    console.log(selectedGenres);
    console.log(genreteURL);
    let location=window.location.pathname.split('/')[1];
    console.log(location);
    const fetchmovies=async ()=>{
        window.scroll(0,0);
          const data=await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=05c0fa57ae6df2b65e5b13ecbbb3630b&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreteURL}`);
      
        Setnumofpages(data.data.total_pages);
         Setcontent(data.data.results);
         console.log(data.data.results);
         
    }
    
    useEffect(()=>{
        fetchmovies();
        // eslint-disable-next-line
    },[page,genreteURL]);

    return(
        <div>
            <Genres type="movie" SetGenre={SetGenre}
            SetselectedGenres={SetselectedGenres}
            page={page}
            Genre={Genre}
            selectedGenres={selectedGenres}
            Setpage={Setpage}
            ></Genres>
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
                    media_type="Movie"
                    rating={c.vote_average}
                    liked={Math.floor(c.popularity)}
                    vote_average={c.vote_average}
                    ></Singlecontent>
                  
                )
                   
                )
                
            }
        </div>
        {numofpages>1 && (
           <CustomPagination setpage={Setpage} numofpages={numofpages}/>
        )}
        
        </div>
    );
};

export default Movies;