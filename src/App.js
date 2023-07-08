import React, {Component} from 'react';
import Navigation from './Components/Navigation/Navigation'
import Signin from './Components/Signin/Signin'
import Register from './Components/Register/Register'
import Logo from './Components/Logo/Logo'
import Clarifai from 'clarifai';
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm'
import Rank from './Components/Rank/Rank'
import FacialRecognition from './Components/FacialRecognition/FacialRecognition'
import './App.css';
import ParticlesBg from 'particles-bg'


  let config = {
      num: [4, 7],
      rps: 0.1,
      radius: [5, 40],
      life: [1.5, 3],
      v: [2, 5],
      tha: [-40, 40],
      // body: "./img/icon.png", // Whether to render pictures
      // rotate: [0, 20],
      alpha: [0.6, 0],
      scale: [2, 0.1],
      position: "center", // all or center or {x:1,y:1,width:100,height:100}
      color: ["ffffff", "#ff0000"],
      cross: "dead", // cross or bround
      random: 20,  // or null,
      g: 2,    // gravity
      // f: [2, -1], // force
      onParticleUpdate: (ctx, particle) => {
          ctx.beginPath();
          ctx.rect(particle.p.x, particle.p.y, particle.radius * 2, particle.radius * 2);
          ctx.fillStyle = particle.color;
          ctx.fill();
          ctx.closePath();
      }
    };


const initialState = {
    input: '',
    url:'',
    box:{},  
    route:'signin',
    signedin: false,
    user:{
        id:'',
        name:'',
        email:'',
        entries:0,
        joined: ''
    }
}
class App extends Component {
constructor (){
    super();
    this.state= {
    input: '',
    url:'',
    box:{},  
    route:'signin',
    signedin: false,
    user:{
        id:'',
        name:'',
        email:'',
        entries:0,
        joined: ''
    }
    }
}

loadUser = (data) =>{
    this.setState({user:{
        id:data.id,
        name:data.name,
        email:data.email,
        entries:data.entries,
        joined: data.joined
    }})
}


CalculateFaceLocation = (data)=> {
    const clariFace = data.outputs[0].data.regions[0].region_info.bounding_box
    const image = document.getElementById("inputImage")
    const width = image.width
    const height = image.height

    return {
         leftCol: clariFace.left_col * width,
        topRow:clariFace.top_row * height,
        rightCol: width - (clariFace.right_col*width),
        bottomRow: height - (clariFace.bottom_row * height)

    }
}


displayFaceBox = (box) =>{
    this.setState({box:box})
}

OnInputChange = (event) =>{
        this.setState({input:event.target.value})
    }

OnButtonSubmit = () =>{
        this.setState({url:this.state.input})
        fetch('https://floating-inlet-32344-27e53eb7ee0c.herokuapp.com/imageURL/',{
            method:'post',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({
                input:this.state.input
            })
        })
        .then(response=>response.json())
        .then(result => this.displayFaceBox(this.CalculateFaceLocation(result)))
        .catch(error => console.log('error', error));

        fetch('https://floating-inlet-32344-27e53eb7ee0c.herokuapp.com/image/',{
            method:'put',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({
                id:this.state.user.id
            })
        })
        .then(response=>response.json())
        .then(count =>{
            this.setState(Object.assign(this.state.user, {entries:count}))
        })
}

OnRouteChange = (route) =>{
    if (route === 'signin'){
        this.setState(initialState)
 
    } else if (route === 'home'){
        this.setState({signedin:true})
    }
    this.setState({route: route})
}
render(){
    const {signedin,route,box,url} = this.state
    return (
        <div className="App">
            <ParticlesBg color="#ffffff" type="cobweb" bg={true} config={config} />
            <Navigation  OnRouteChange={this.OnRouteChange}  signedin={signedin}/>      
            {route === 'home'
            ?<div>
                <Logo />
                <Rank name = {this.state.user.name}  entries={this.state.user.entries}/>
                < ImageLinkForm OnInputChange={this.OnInputChange} OnButtonSubmit={this.OnButtonSubmit} />
                <FacialRecognition box = {box} url = {url}/>
            </div> :(
                this.state.route === "signin"
                ? <Signin OnRouteChange={this.OnRouteChange} loadUser ={this.loadUser}/>
                : <Register OnRouteChange={this.OnRouteChange} loadUser ={this.loadUser}/>
                )
            }
        </div>
        )
    }
}


export default App;



