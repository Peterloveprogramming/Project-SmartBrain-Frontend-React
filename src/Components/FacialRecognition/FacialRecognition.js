import React from 'react';
import myImage from './Raj.jpg';
import './FacialRecognition.css';

const FacialRecognition = ({url, box}) =>{
	console.log(box)
	return (
		<div className="center ma">
			<div className="mt2 absolute">
				<img id ="inputImage" alt = "" src={url} width="500px" height="auto" />
   				<div className='bounding-box' style={{top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol}}></div>
			</div>
		</div>
		)
}

export default FacialRecognition;