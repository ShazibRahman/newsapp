import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom'

import React, { Component } from 'react'
import NavBar from './components/NavBar';
import News from './components/News';

export default class App extends Component {
  pageSize = 12
  render() {
    return (
      <><Router>
        <NavBar />
        <Routes>
          <Route exact path='/' element={<News key="home" pageSize={this.pageSize} category='general' country='in' />} />
          <Route exact path='/health' element={<News key="health" pageSize={this.pageSize} category='health' country='in' />} />
          <Route exact path='/general' element={<News key="general" pageSize={this.pageSize} category='general' country='in' />} />
          <Route exact path='/technology' element={<News key="technology" pageSize={this.pageSize} category='technology' country='in' />} />
          <Route exact path='/business' element={<News key="business" pageSize={this.pageSize} category='business' country='in' />} />
          <Route exact path='/entertainment' element={<News key="entertainment" pageSize={this.pageSize} category='entertainment' country='in' />} />
          <Route exact path='/science' element={<News key="science" pageSize={this.pageSize} category='science' country='in' />} />
          <Route exact path='/sports' element={<News key="sports" pageSize={this.pageSize} category='sports' country='in' />} />


        </Routes>
      </Router>
      </>

    )
  }
}
