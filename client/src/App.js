import React from 'react';
import './App.css';
import './home.css';
import Nav from './components/nav'
import AddPostForm from './components/addPost/addPostForm'
import PostContainer from './components/displayPost/postContainer'
import Login from './components/Login/login'
import ManagePost from './components/managePost/managePost'
import ManageComment from './components/manageComment/manageComment'
import PortfolioContainer from './components/portfolio/portfolioContainer'
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Gallery from './components/gallery/Gallery'
import './css/keyframes.css'
import Nba from './components/gameScores/Nba';

function App() {
  return (
    <BrowserRouter>
      <Nav></Nav>
      <Switch>

        <Route exact path='/' >
          <PortfolioContainer></PortfolioContainer>
        </Route>

        <Route exact path='/blog'>
          <div className="App">
            <AddPostForm></AddPostForm>
            <PostContainer></PostContainer>
          </div>
        </Route>

        <Route exact path='/gallery' >
          <Gallery />
        </Route>

        <Route path='/nba' component={Nba} />

        <Route exact path='/manage'>
          <ManagePost></ManagePost>
          <ManageComment></ManageComment>
        </Route>



        <Route exact path='/login' >
          <Login></Login>
        </Route>

        <Route path='/' >
          <h1>404</h1>
        </Route>

      </Switch>
    </BrowserRouter>
  );
}

export default App;
