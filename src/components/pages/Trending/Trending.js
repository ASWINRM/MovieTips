import { useEffect, useState } from "react"
import axios from 'axios'
import Singlecontent from '../../Singlecontent'
import './Trending.css'
import CustomPagination from'../pagination/CustomPagination'
const Trending=()=>{

    const [content,Setcontent]=useState([]);
    const [page,Setpage]=useState(1);
    const fetchtrending=async ()=>{
        window.scroll(0,0);
        const {data}=await axios.get(
            `https://api.themoviedb.org/3/trending/all/day?api_key=05c0fa57ae6df2b65e5b13ecbbb3630b&page=${page}`
            );
            Setcontent(data.results);
    };
    
    useEffect(()=>{
        fetchtrending();
        // eslint-disable-next-line
    },[page])
    
    return(
        <div>
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
                    media_type={c.media_type==="movie"?"Movie":c.media_type}
                    rating={c.vote_average}
                    liked={Math.floor(c.popularity)}
                    vote_average={c.vote_average}
                    ></Singlecontent>
                  
                )
                   
                )
                
            }
            {
                content && console.log(content)
            }
        </div>
        
        <CustomPagination setpage={Setpage} />
        </div>
    )
}

export default Trending;