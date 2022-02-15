import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Singlecontent from '../../Singlecontent'
import {unavailable} from '../../../config/config';
import Carousel from 'react-elastic-carousel';
import './details.css';
import btn from '../../../image.json'
import TransistionModal from '../../Modal/TransistionModal';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box'
import { IMAGE_NOT_FOUND } from '../../../config/config';


const Details=(props)=>{

    const id=props.match.params.id;
    const media_type=props.match.params.type;
    const [recommendmovies,Setrecommendmovies]=useState();
    const [recommendtv,Setrecommendtv]=useState();
    const [genres,Setgenres]=useState([]);
    const [content,Setcontent]=useState();
    const [video,Setvideo]=useState();
    const[playicon,Setplayicon]=useState(1);
    const[playvideo,Setplayvideo]=useState(0);
    const [Credits,SetCredits]=useState();
    let [director,Setdirector]=useState();
    let [writter,Setwritter]=useState();
    let [videolink,Setvideolink]=useState("");
    const [open, SetOpen] = useState(false);
    const [crew,Setcrew]=useState();
    const breakPoints = [
      { width: 1, itemsToShow: 1 },
      { width: 550, itemsToShow: 2 },
      { width: 768, itemsToShow: 3 },
      { width: 1200, itemsToShow: 4 },
    ];
    

    const handleOpen = () => {
      SetOpen(true);
    };

    const handleClose = () => {
        SetOpen(false);
        closevideo();
      };

      const fetchresults=async (signal)=>{
        try{
          const {data}= await axios.get(`https://api.themoviedb.org/3/${media_type}/${id}?api_key=05c0fa57ae6df2b65e5b13ecbbb3630b&language=en-US`,{signal:signal})
        
          Setcontent(data);
          if(data){
              // console.log(data);
              Setgenres(data.genres);
          }
        }catch(e){
          console.log(e)
        }
       

    }

    const fetchVideo = async (signal) => {
      try{
        const { data } = await axios.get(
          `https://api.themoviedb.org/3/${media_type}/${id}/videos?api_key=05c0fa57ae6df2b65e5b13ecbbb3630b&language=en-US`
       ,{signal:signal} );
    
        Setvideo(data.results[0]?.key);
      }catch(e){
        console.log(e)
      }
        
         };

    const fetchcredits=async (signal)=>{
      try{
        const {data}=await axios.get(
          ` https://api.themoviedb.org/3/${media_type}/${id}/credits?api_key=05c0fa57ae6df2b65e5b13ecbbb3630b&language=en-US`
     ,{signal:signal} );
      if(data){
        console.log(data);
      }
     SetCredits(data.cast);
     Setcrew(data.crew);
    
      }catch(e){
        console.log(e)
      }
        
       
    }     

    const fetchrecommendmovies= async(genre)=>{
      try{
        const {data}= await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=05c0fa57ae6df2b65e5b13ecbbb3630b&with_genres=${genre.id}`);

        // if(data){
        //   console.log(data);
        // }
        Setrecommendmovies((prev)=>({...prev,data}));
      }catch(e){
        console.log(e)
      }
     
       
      
      
    }

    const fetchrecommendseries= async(genre)=>{
      try{
        const {data}= await axios.get(`https://api.themoviedb.org/3/discover/tv?api_key=05c0fa57ae6df2b65e5b13ecbbb3630b&with_genres=${genre.id}`);

        // if(data){
        //   console.log(data);
        // }
        Setrecommendtv((prev)=>({...prev,data}));
      }catch(e){
        console.log(e)
      }
      
       
      
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
    
    
    useEffect(()=>{
      const controller = new AbortController();
      const signal = controller.signal;
        window.scroll(0,0);
        try{
          fetchresults(signal);
          fetchVideo(signal);
          fetchcredits(signal);
        }catch(e){
          console.log(e)
        }
        
        return () => controller.abort();
        // eslint-disable-next-line
    },[id]);

   

    useEffect(()=>{
      const controller = new AbortController();
      const signal = controller.signal;
      try{
        if(genres.length>0){
          // console.log(genres);
          genres.forEach((genre)=>{
            fetchrecommendmovies(genre,signal);
            fetchrecommendseries(genre,signal);
          })
        }
      }catch(e){
        console.log(e)
      }
      return () => controller.abort();
    },[genres])

    useEffect(()=>{
      if(video){
        Setvideolink(`https://www.youtube.com/watch?v=${video}`);
      }
    },[video])
  
    useEffect(()=>{
      if (crew){
        console.log(crew?crew:"jdhd")
        crew.map(c=>{
           if ( c.known_for_department==="Directing"){
            Setdirector(c.name)
              
           }
           if(c.known_for_department==="Writing"){
            Setwritter(c.name);
           
           }
           
        })
    }
    },[crew])
      
    
       
       
    
       

     
  
    return(
        <div>
            {
                content && (
                   
                    <div className="majorimage">
                        <div>
                        <img className="poster"src={content.poster_path
                      ? `https://image.tmdb.org/t/p/w500${content.poster_path}`
                      : unavailable} alt="moviepic"></img>
                      </div>
                      {/* {
                        console.log(content.poster_path)
                      } */}
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
                           
                          <p><strong>Direction{" "}</strong>:{" "}{director?director:"Not found"}</p>
                            
                           
                           <p><strong>Writer{" "}</strong>:{" "}{writter?writter:"Notfound"}</p>
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
                        <div key={c.id} >
                        <div className="castdetails" >

                            {/* {console.log(c)} */}
                         <img src={c.profile_path!==null?`https://image.tmdb.org/t/p/w500${c.profile_path}`:IMAGE_NOT_FOUND} alt="actor" className="Actors" key={c.id}></img>
                         {/* https://image.tmdb.org/t/p/w500${c.profile_path} */}
                        <div className="actordetails" >
                            <strong className='actorname' >{c.name?c.name:""}</strong>
                            <p>{c.character?c.character:""}</p>
                        </div>
                      
                        </div>

                        
                        </div>

                    );

                    
                    
                  }   
                  )):<Box sx={{ display: 'flex' }}>
                  <CircularProgress />
                </Box>
               }  
              
               
            </div>
            {
             (recommendmovies&& recommendmovies.data.results.length>0) &&

               <div>
              <h1 className="recommend">TOP RECOMMENDED MOVIE ON THIS GENRE :</h1>
               <Carousel breakPoints={breakPoints} enableAutoPlay={true}
                focusOnSelect={true}
                showArrows={true}
                transitionMs={5000}
                autoPlaySpeed={200}
                
                >
               
               {
                
                  recommendmovies && recommendmovies.data.results.map((movie)=>

                  (
                     <Singlecontent
                     key={movie.id}
                     id={movie.id}
                     title={movie.title||movie.name}
                     poster={movie.poster_path}
                     date={movie.release_date||movie.first_air_date}
                     language={movie.original_language}
                     media_type={movie.media_type==="movie"?"Movie":movie.media_type}
                     rating={movie.vote_average}
                     liked={Math.floor(movie.popularity)}
                     vote_average={movie.vote_average}
                     ></Singlecontent>
                   )
                 )
               }
               </Carousel>
              
             </div>
           
            }
           {
            (recommendtv && recommendtv.data.results.length>0) &&
             <div>
             <h1 className="recommend">TOP RECOMMENDED SERIES ON THIS GENRE :</h1>
                <Carousel breakPoints={breakPoints} enableSwipe={true} enableAutoPlay={true}
                focusOnSelect={true}
                showArrows={true}
                transitionMs={5000}
                autoPlaySpeed={200}
                isRTL={false}
                >
                
                {
                 
                   recommendtv && recommendtv.data.results.map((tv)=>
 
                   (
                      <Singlecontent
                      key={tv.id}
                      id={tv.id}
                      title={tv.title||tv.name}
                      poster={tv.poster_path}
                      date={tv.release_date||tv.first_air_date}
                      language={tv.original_language}
                      media_type={tv.media_type==="movie"?"Movie":tv.media_type}
                      rating={tv.vote_average}
                      liked={Math.floor(tv.popularity)}
                      vote_average={tv.vote_average}
                      ></Singlecontent>
                    )
                  )
                }
                </Carousel>
               
              </div>
           }
                   
         
           {/* {
             recommendmovies&&console.log(recommendmovies.data.results)
           } */}
           
           

        </div>
    );
};

export default Details;
