
import {unavailable} from '../config/config'
import { Badge } from "@material-ui/core";
import './Singlecontent.css'
import {Link} from 'react-router-dom'

const Singlecontent=({
   id,title,poster,date,language,media_type,rating,liked,vote_average
})=>{

    const genre=media_type==="Movie"?"movie":"tv";
    
    
    return(
        <div className="box">
          
        <div className="media">
        <Badge
    badgeContent={vote_average}
    color={vote_average > 6 ? "primary" : "secondary"
     }
     
  />
        <img src={poster? `https://image.tmdb.org/t/p/w500${poster}`: `https://www.movienewz.com/img/films/poster-holder.jpg`}
        alt="poster"></img>
        <div className='content'>
            <strong className="title">{title}</strong>
            <span>{media_type==="tv"?media_type="TVseries":media_type="Movie"}</span>
            <span>LANGUAGE:{" "}{language}</span>
            <span>{date}</span>
           
            <Link to={`/details/${id}/${genre}`} >more...</Link>
        </div>
        </div>
       
        </div>
    )
    
}

export default Singlecontent;