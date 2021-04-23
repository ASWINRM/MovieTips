import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {img_300} from '../../../config/config';
import {img_500} from '../../../config/config';
import {unavailable} from '../../../config/config';
import './details.css';
import btn from '../../../image.json'
import TransistionModal from '../../Modal/TransistionModal';





const Details=(props)=>{

    const id=props.match.params.id;
    const media_type=props.match.params.type;
  
    const [content,Setcontent]=useState();
    const [video,Setvideo]=useState();
    const[playicon,Setplayicon]=useState(1);
    const[playvideo,Setplayvideo]=useState(0);
    const [Credits,SetCredits]=useState();
    let videolink="";
    const [open, SetOpen] = useState(false);
    const [crew,Setcrew]=useState();
    let director="";
    let writter="";

    const handleOpen = () => {
      SetOpen(true);
    };

    const handleClose = () => {
        SetOpen(false);
        closevideo();
      };
    
    
    useEffect(()=>{
        window.scroll(0,0);
        fetchresults();
        fetchVideo();
        fetchcredits();
        // eslint-disable-next-line
    },[id]);
    const fetchresults=async ()=>{
        const {data}= await axios.get(`https://api.themoviedb.org/3/${media_type}/${id}?api_key=05c0fa57ae6df2b65e5b13ecbbb3630b&language=en-US`)
        
        Setcontent(data);
    }
    const fetchVideo = async () => {
        const { data } = await axios.get(
          `https://api.themoviedb.org/3/${media_type}/${id}/videos?api_key=05c0fa57ae6df2b65e5b13ecbbb3630b&language=en-US`
        );
    
        Setvideo(data.results[0]?.key);
         };

    const fetchcredits=async ()=>{
        const {data}=await axios.get(
            ` https://api.themoviedb.org/3/${media_type}/${id}/credits?api_key=05c0fa57ae6df2b65e5b13ecbbb3630b&language=en-US`
        );
       SetCredits(data.cast);
       Setcrew(data.crew);
       console.log(data.cast);
    }     

      if(video){
        videolink=`https://www.youtube.com/watch?v=${video}`;
      }
    
       if (crew){
            crew.map(c=>{
               if ( c.known_for_department==="Directing"){
                   director=c.name;
                   return c.name;
               }
               if(c.known_for_department==="Writing"){
                writter=c.name
                return c.name;
               }
               return c.name;
            })
        }
       
    
       

      const videoplayer=()=>{
          Setplayvideo(1);
          Setplayicon(0);
          handleOpen();
          
       
      }
      const closevideo=()=>{
        Setplayvideo(0);
        Setplayicon(1);

    }
  
    return(
        <div>
            {
                content && (
                    <div className="majorimage">
                        <div>
                        <img className="poster"src={content.poster_path
                      ? `${img_500}/${content.poster_path}`
                      : unavailable} alt="moviepic"></img>
                      </div>

                  {playicon===1 && (
                      <div className="playayable">
                      <div className="play-btn">
                          <img src={btn.playbtn} alt="playbutton"onClick={()=>videoplayer()}></img>
                      </div>
                  </div>

                  )}   

                 {
                     playvideo===1 && playicon===0 && (
                        <TransistionModal closevideo={closevideo}
                        open={open}
                        handleClose={handleClose}
                        videolink={videolink}

                       ></TransistionModal> 
                     )
                 }
                     
               
                  <div className="box">
                        <div className="datas">
                           <h1 className="movietitle">{content.title || content.name+"   "}</h1>
                           <span>{(content.release_date+"  " || content.first_air_date+"  ").substring(0,4)}&nbsp;|&nbsp;{content.adult ? " 18+ ":" 13+ "}
                           &nbsp; | &nbsp;{content.genres.map((g)=>g.name+" ")}&nbsp;|&nbsp;{content.original_language==="en"?"English  ":content.original_language+"  "}
                           </span> 
                           <p><strong>Overview{" "}</strong>:{" "}{content.overview}</p>
                           <p><strong>Runtime{" "} </strong>:{" "}{content.runtime}{" "}mins</p>
                           <p><strong>Status{" "}</strong>:{" "}{content.status}</p>
                           <p><strong>Direction{" "}</strong>:{" "}{director}</p>
                           <p><strong>Writer{" "}</strong>:{" "}{writter}</p>
                           <p><strong>Rating</strong>{" "}:{content.vote_average}</p>
                        </div>
                        </div>
                    </div>
                )
            }
            <div className="cast">
                {
                  Credits? (Credits.map((c)=>{
                    return(
                        <div >
                        <div className="castdetails" key={c.id}>
                         <img src={c.profile_path? `${img_300}/${c.profile_path}` : `${img_300}`} alt="actor" className="Actors"></img>
                        <div className="actordetails">
                            <strong>{c.name}</strong>
                            <p>({c.character})</p>
                        </div>
                       
                        </div>
                        </div>
                    );
                    
                  }   
                  )):"null"
               }  
               
            </div>
        </div>
    );
};

export default Details;
