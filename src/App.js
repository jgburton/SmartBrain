import React, { useState } from 'react';
import './index.css';
import './App.css';
import Navigation from './components/Naviagtion/Navigation';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';


function App() {
  const [input, setInput] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const app = new Clarifai.App({
    apiKey: 'd19ff8c77c204b639080fd91e839064f'
  });

  const onInputChange = (e) => {
    // console.log(e.target.value);
    setInput(e.target.value);
  }

  const onButtonSubmit = () => {
    // console.log('Submit');
    setImageUrl(input);

    app.models.predict(
      Clarifai.FACE_DETECT_MODEL,
      input)
      .then(
        function (response) {
          console.log(response.outputs[0].data.regions[0].region_info.bounding_box);
        },
        function (err) {
          console.log(err);
        }
      );
  }

  return (
    <div className="App">
      <Particles
        className="particles"
        params={particlesOptions}
      />
      <Navigation />
      <Logo />
      <Rank />
      <ImageLinkForm
        onInputChange={onInputChange}
        onButtonSubmit={onButtonSubmit}
      />
      <FaceRecognition imageUrl={imageUrl} />
     

    </div>
  );
}

const particlesOptions = { "particles": { "number": { "value": 80, "density": { "enable": true, "value_area": 800 } }, "color": { "value": "#ffffff" }, "shape": { "type": "circle", "stroke": { "width": 0, "color": "#000000" }, "polygon": { "nb_sides": 5 }, "image": { "src": "img/github.svg", "width": 100, "height": 100 } }, "opacity": { "value": 0.5, "random": false, "anim": { "enable": false, "speed": 1, "opacity_min": 0.1, "sync": false } }, "size": { "value": 3, "random": true, "anim": { "enable": false, "speed": 40, "size_min": 0.1, "sync": false } }, "line_linked": { "enable": true, "distance": 150, "color": "#ffffff", "opacity": 0.4, "width": 1 }, "move": { "enable": true, "speed": 6, "direction": "none", "random": false, "straight": false, "out_mode": "out", "bounce": false, "attract": { "enable": false, "rotateX": 600, "rotateY": 1200 } } }, "interactivity": { "detect_on": "canvas", "events": { "onhover": { "enable": true, "mode": "repulse" }, "onclick": { "enable": true, "mode": "push" }, "resize": true }, "modes": { "grab": { "distance": 400, "line_linked": { "opacity": 1 } }, "bubble": { "distance": 400, "size": 40, "duration": 2, "opacity": 8, "speed": 3 }, "repulse": { "distance": 200, "duration": 0.4 }, "push": { "particles_nb": 4 }, "remove": { "particles_nb": 2 } } }, "retina_detect": true };

export default App;
