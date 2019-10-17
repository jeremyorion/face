// React
import React from 'react';

// React Components
import Navigation from './components/navigation/Navigation';
import Signin from './components/signin/Signin'
import Logo from './components/logo/Logo';
import Form from './components/form/Form';
import Rank from './components/rank/Rank';
import FaceRecognition from './components/facerecognition/FaceRecognition'
import Register from './components/register/Register'

// Tachyons for canned CSS syles
import 'tachyons';

// CSS File
import './App.css';



// initialState
const initialState = {
  input: '',
  imageURL: '',
  box: {},
  route: 'signin',
  isSignedIn: false,
  user: {
    id: '',
  name: '',
  email: '',
  entries: '',
  joined: '',
  }
}

// Core App
class App extends React.Component {

// State constructore
// TODO: Update with Hooks?
  constructor() {
    super();
    this.state = {
      input: '',
      imageURL: '',
      box: {},
      route: 'signin',
      isSignedIn: false,
      user: {
        id: '',
      name: '',
      email: '',
      entries: '',
      joined: '',
      },
    }
  }

loadUser = (user) => {
  this.setState({
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      entries: user.entries,
      joined: user.joined,
    }
  })
}



// When search value is entered, update state 
  onInputChange = event => this.setState( {input: event.target.value} );
  
// When submit is clicked, send image URL to state, and call Clarifai API function
  onSubmit = () => {
    this.setState( { imageURL: this.state.input } );
    fetch('https://cryptic-scrubland-92147.herokuapp.com/imageURL', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              input: this.state.input
            })
          })
          .then(response => response.json())
          .then(response => {    
        if (response) {
          fetch('https://cryptic-scrubland-92147.herokuapp.com/image', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              id: this.state.user.id
            })
          })
          .then(response => response.json())
          .then(count => this.setState(Object.assign(this.state.user, {entries: count})))
          }
          this.displayFaceBox(this.calcFaceLocation(response))
        }
      )
      .catch(err => console.log(err))
  }

// Takes results from Clarifai API call and calculates where to draw the face highlight box
  calcFaceLocation = (data) => {
    const clarifai_face= data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);

    return {
      left: clarifai_face.left_col * width,
      top: clarifai_face.top_row * height,
      right: width - (clarifai_face.right_col * width),
      bottom: height - (clarifai_face.bottom_row * height),
    }
  }

// Sets state with box coordinate values
  displayFaceBox = box => this.setState({ box: box });

// Siging in route change
  onRouteChange = (route) => {
    if (route === 'signin') {
      this.setState(initialState)
    } else if (route === 'home') {
      this.setState({isSignedIn: true})
    }
    this.setState({route: route})
  }


// Rendering Components
  render () {
    const { isSignedIn, imageURL, route, box } = this.state;

    return (
      <div className="App">
        
        <Navigation isSignedIn={ isSignedIn } onRouteChange={ this.onRouteChange } />
        
        { route === 'home'
          ?
          <div>
            <Logo />
            <Rank name={this.state.user.name} entries={this.state.user.entries} />
            <Form onInputChange={this.onInputChange} onSubmit={this.onSubmit} />
            <FaceRecognition imageURL={ imageURL } box={box} />
          </div>
          : (
            route === 'signin'
            ?
            <Signin onRouteChange={this.onRouteChange} loadUser={this.loadUser} />
            :
            <Register onRouteChange={this.onRouteChange} loadUser={this.loadUser} />
          )
        }
      </div>
    );
  }

}

export default App;
