// import {React, useEffect, useState} from 'react';
// import Card from '@mui/material/Card';
// import CardActions from '@mui/material/CardActions';
// import CardContent from '@mui/material/CardContent';
// import Button from '@mui/material/Button';
// import Typography from '@mui/material/Typography';
// import Paper from '@mui/material/Paper';
// import './review.css';
// import axios from 'axios';

// export default function Review(props) {
//      const [reviews,setreviews]=useState([]);

//      const fetchreview=async()=>{
//         let {data}=await axios.get(`https://api.themoviedb.org/3/movie/${props.id}/reviews?api_key=05c0fa57ae6df2b65e5b13ecbbb3630b`)
        
//         if(data){
//             console.log(data.results);
//             setreviews(data.results);
//         }
//     }
//      useEffect(()=>{
//          fetchreview();
//          console.log(props.id)
//      },[props.id])


  
//   return (
//     <Paper elevation={3} >
//     <Card sx={{ minWidth: 275 }}>
//       <CardContent>
//         <Typography variant="h5" component="div">
//           benevolent
//         </Typography>
//         <Typography sx={{ mb: 1.5 }} color="text.secondary">
//           Date:12/12/12       </Typography>
//         <Typography variant="body2">
//           well meaning and kindly.
//           <br />
//           {'"a benevolent smile"'}
//         </Typography>
//       </CardContent>
//       <CardActions>
//         <Button size="small">Learn More</Button>
//       </CardActions>
//     </Card>
//     </Paper>
//   );
// }

