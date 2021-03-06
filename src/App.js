import React, { Component } from 'react';
import './App.css';
import StarshipList from './Components/starshipList';
import SearchBox from './Components/searchBox';
import Selection from './Components/Selection';
import Particles from 'react-particles-js';
import PersonsList from './Components/personsList';
import PlanetList from './Components/planetList';
import VehiclesList from './Components/vehiclesList';
import FilmList from './Components/filmList';
import SpeciesList from './Components/speciesList';
import Navigation from './Components/Navigation';

const particlesOptions = {
  particles: {
    number: {
      value: 30,
      density: {
        enable: true,
        value_area: 800
      }
    }
  },
  "interactivity": {
    "detect_on": "window",
    "events": {
      "onhover": {
        "enable": true,
        "mode": "repulse"
      },
      "onclick": {
        "enable": true,
        "mode": "push"
      },
      "resize": true
    },
    "modes": {
      "grab": {
        "distance": 800,
        "line_linked": {
          "opacity": 1
        }
      },
    }
  },
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      results : [],
      planets : [],
      films : [],
      species : [],
      vehicles : [],
      starships : [],
      searchfield : '',
      route:'selection',
    };
  }

  onButtonSelection = (route) => {
    this.setState({route: route});
  }


  onSearchChange = (event) => {
    this.setState({ searchfield: event.target.value});
  }

  render() {
    const {results,searchfield,route} = this.state;
    if(this.state.route !== 'selection'){
      fetch(`https://swapi.co/api/${this.state.route}/`)
    .then(response => response.json())
    .then(data => this.setState({results:data.results}));
    }
    if(route === 'films'){
      var resultsFiltered = results.filter(result => {
        return result.title.toLowerCase().includes(searchfield.toLowerCase());
      });
    } else {
      var resultsFiltered = results.filter(result => {
        return result.name.toLowerCase().includes(searchfield.toLowerCase());
      });
    }
    if(results.length === 0 && route !== 'selection'){
      return <h1 className='tc pt6'>Loading...</h1>
    } else {
    switch (route) {
      case 'selection':
        return(
          <div className="tc">
          <Particles className='particles'
            params={particlesOptions}
          />
            <h1 className='f1'>Star Wars</h1>
            <h2 className='f3 pt3'>Search through your favorite Star Wars Categories!</h2>
            <Selection onButtonSelection={this.onButtonSelection}/>
          </div>
        )
      case 'people':
        return(
          <div className="tc">
            <Navigation onButtonSelection={this.onButtonSelection}/>
            <h1 className='f1'>Star Wars</h1>
            <h2>Search for your favorite people!</h2>
              <SearchBox searchChange={this.onSearchChange}/>
              <PersonsList people={resultsFiltered}/>
          </div>
        );
      case 'planets':
        return(
          <div className="tc">
            <Navigation onButtonSelection={this.onButtonSelection}/>
            <h1 className='f1'>Star Wars</h1>
            <h2>Search for your favorite planet!</h2>
              <SearchBox searchChange={this.onSearchChange}/>
              <PlanetList planets={resultsFiltered}/>
          </div>
        );
      case 'films':
        return(
          <div className="tc">
            <Navigation onButtonSelection={this.onButtonSelection}/>  
            <h1 className='f1'>Star Wars</h1>
            <h2>Search for your favorite film!</h2>
              <SearchBox searchChange={this.onSearchChange}/>
              <FilmList films={resultsFiltered}/>
          </div>
        );
      case 'species':
        return(
          <div className="tc">
            <Navigation onButtonSelection={this.onButtonSelection}/>
            <h1 className='f1'>Star Wars</h1>
            <h2>Search for your favorite species!</h2>
              <SearchBox searchChange={this.onSearchChange}/>
              <SpeciesList species={resultsFiltered}/>
          </div>
        );
      case 'vehicles':
        return(
          <div className="tc">
            <Navigation onButtonSelection={this.onButtonSelection}/>
            <h1 className='f1'>Star Wars</h1>
            <h2>Search for your favorite vehicle!</h2>
              <SearchBox searchChange={this.onSearchChange}/>
              <VehiclesList vehicles={resultsFiltered}/>
          </div>
        );
      case 'starships':
        return(
          <div className="tc">
            <Navigation onButtonSelection={this.onButtonSelection}/>
            <h1 className='f1'>Star Wars</h1>
            <h2>Search for your favorite starship!</h2>
              <SearchBox searchChange={this.onSearchChange}/>
              <StarshipList starships={resultsFiltered}/>
          </div>
        );
    }
  }
    

    
  }
}

export default App;
