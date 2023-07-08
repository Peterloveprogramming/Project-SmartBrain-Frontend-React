import React from 'react';


class Signin extends React.Component{
	constructor (props){
		super(props)
		this.state = {
			SignInemail:'',
			SignInpassword:''
		}
	}

	onEmailChange = (event) => {
		this.setState({SignInemail:event.target.value})
	}
	onPassWord = (event) => {
		this.setState({SignInpassword:event.target.value})
	}
	onSubmit = () => {
		fetch('http://localhost:3000/signin/',{
			method:'post',
			headers:{'Content-Type':'application/json'},
			body:JSON.stringify({
				email:this.state.SignInemail,
				password:this.state.SignInpassword
			})
		}).then(data => data.json())
		.then(user =>{
			if (user.id){
				this.props.loadUser(user)
				console.log(user)
				this.props.OnRouteChange("home")
			}
		})

	}
	
	render(){
		const {OnRouteChange } = this.props
		return (
			<div  >
			<article className="br3 ba  b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
				<main className="pa4 black-80">
				  <div className="measure ">
				    <fieldset id="sign_up" class="ba b--transparent ph0 mh0">
				      <legend className="f1 fw6 ph0 mh0">Sign In</legend>
				      <div className="mt3">
				        <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
				        <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
				        type="email" 
				        name="email-address"  
				        id="email-address" 
				        onChange = {this.onEmailChange}/>
				      </div>
				      <div className="mv3">
				        <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
				        <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
				        type="password" 
				        name="password"  
				        id="password" 
				        onChange = {this.onPassWord}/>				  
				      </div>
				    </fieldset>
				    <div className="">
				      <input onClick ={this.onSubmit} className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Sign in" />
				    </div>
				    <div className="lh-copy mt3">
				      <p onClick ={()=>OnRouteChange('Register')} class="pointer f6 link dim black db">Register</p>
				    </div>
				  </div>
				</main>
			</ article>
			</div>
			)
	}
}

export default Signin;