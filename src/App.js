
import './App.css';

import React, { Component } from 'react'
import NavvBar from './Components/NavvBar';
import News from './Components/News';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";




export default class App extends Component {
  render() {
    return (
      <div>
        <Router>
      <NavvBar/>
      
      <Routes>
          <Route path="/" element= {<News key="general" PageSize={5} country="in" category="general"/>}/>
          <Route path="/business" element= {<News key="business" PageSize={5} country="in" category="business"/>}/>
          <Route path="/entertainment" element= {<News key="entertainment" PageSize={5} country="in" category="entertainment"/>}/>
          <Route path="/general" element= {<News key="general" PageSize={5} country="in" category="general"/>}/>
          <Route path="/health" element= {<News key="health" PageSize={5} country="in" category="health"/>}/>
          <Route path="/science" element= {<News key="science" PageSize={5} country="in" category="science"/>}/>
          <Route path="/sports" element= {<News key="sports" PageSize={5} country="in" category="sports"/>}/>
          <Route path="/technology" element= {<News key="technology" PageSize={5} country="in" category="technology"/>}/>
      </Routes>
      </Router>
      </div>
    )
  }
}
