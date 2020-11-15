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


function App() {
  return (
    <BrowserRouter>
      <Switch>

        <Route exact path='/' >
          <Nav></Nav>
          <PortfolioContainer></PortfolioContainer>
        </Route>

        <Route exact path='/blog'>
          <div className="App">
            <Nav></Nav>
            <AddPostForm></AddPostForm>
            <PostContainer></PostContainer>
          </div>
        </Route>

        <Route exact path='/manage'>

          <Nav></Nav>
          <ManagePost></ManagePost>
          <ManageComment></ManageComment>

        </Route>



        <Route exact path='/login' >
          <Nav></Nav>
          <Login></Login>
        </Route>

      </Switch>
    </BrowserRouter>
  );
}

export default App;
