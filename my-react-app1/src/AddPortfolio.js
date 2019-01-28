import React, { Component } from 'react';
import './App.css';

class AddPortfolio extends Component {
	constructor(props){
		super(props);

	
		this.state = {
			 portofioId: 1000
		}
			this.onSubmit = this.onSubmit.bind(this);

	}
 

  onSubmit(event){
  	event.preventDefault();
  	const portfolioIdGenerate = this.state.portofioId - 1;
  	this.setState({portofioId : portfolioIdGenerate});
  	this.props.onAddPortfolio(this.protfolioNameInput.value, this.state.portofioId);
  	this.protfolioNameInput.value = '';
  

  }
  render() {
  	
    
    return (
    	<form className="form-inline" onSubmit={this.onSubmit}>
    	<div className="form-group">
    		<label>Add Portfolio : </label>
    		<input className="form-control" placeholder="Name" required ref={protfolioNameInput => this.protfolioNameInput = protfolioNameInput }/>
    	</div>
    		

    		<button className="btn btn-outline-primary">Add</button>
       </form>
    );
  }
}
export default AddPortfolio;
