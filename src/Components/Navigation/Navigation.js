import React from 'react';

const Navigation = ({OnRouteChange,signedin}) =>{

		if (signedin){
		return(
			<nav style={{display:'flex',justifyContent:'flex-end'}}>
				<p onClick ={()=>OnRouteChange('signin')}className ="f3 link dim black underline pa3 pointer">Sign Out</p>
			</nav >
			);
			 }else {
			return(
				<nav style={{display:'flex',justifyContent:'flex-end'}}>
					<p onClick ={()=>OnRouteChange('signin')}className ="f3 link dim black underline pa3 pointer">Sign in</p>
					<p onClick ={()=>OnRouteChange('register')}className ="f3 link dim black underline pa3 pointer">Register</p>
				</nav >
				)
			}
		
	
}

export default Navigation;

