import React from 'react';
import Tilt from 'react-parallax-tilt';
import './Logo.css'
import brain from './thinking.png'

const Logo = () =>{
 return (
 	<div className="ma4 mt0">
	    <Tilt className="Tilt br2 shadow-2 " style={{width:'150px',height:'150px'}} >
	        <div>
	        	<img className="picture pa3 ma2 " src={brain}/>
	        </div>
	    </Tilt>
	 </div>
  );
}

export default Logo