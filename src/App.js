import React  from 'react';
import Header from './components/Header/Header.js';
import './App.css'
import SimpleBottomNavigation from './components/mainNav' 
import {BrowserRouter,Route,Switch} from 'react-router-dom';
import { Container } from '@material-ui/core';
import Trending from './components/pages/Trending/Trending';
import Movies from './components/pages/Movies/Movies';
import TVseries from './components/pages/TVseries/TVseries';
import search from './components/pages/search';
import Details from './components/pages/details/Details';

// import{Top} from './components/top.js'
function App(){

  
  return(
    
    <BrowserRouter>
  
  <Header></Header>
    <div className="App">
    
     
      <Container>
        <Switch>
        <Route path="/" exact component={Trending}></Route>
        <Route path="/movies" component={Movies}></Route>
        <Route path="/tvseries" component={TVseries}></Route>
        <Route path="/search" component={search}></Route> 
        <Route path="/details/:id/:type" component={Details}></Route> 
        </Switch>
      
    </Container>
      
    </div>
    <SimpleBottomNavigation></SimpleBottomNavigation>
    </BrowserRouter>
  );
}

export default App;