import React, { Component } from 'react';
import SushiContainer from './containers/SushiContainer';
import Table from './containers/Table';

// Endpoint!
const API = "http://localhost:3000/sushis"


class App extends Component {

	constructor(){
		super()
		this.state = {
			sushi: [],
			quad: 0,
			wallet: 100
		}
	}

	componentDidMount() {
		fetch(API)
		.then(res => res.json())
		.then(res => {
			res.map(r => r.eaten = false)
			this.setState({sushi : res})
		})

	}

   handleClick = () => {
    this.setState({quad : this.state.quad + 1})   
  }
  sushiClick = (id) =>{
  	console.log(id)
  	let s = this.state.sushi.filter(s => s.id === id)[0]

  	if (s.price <= this.state.wallet) {
  		let arr = this.state.sushi.map(s => {if (s.id === id) s.eaten = true ;return s})
  	this.setState({sushi:arr, wallet: this.state.wallet - s.price})
  	}
  	
  }

  render() {
    return (
      <div className="app">
        <SushiContainer sushiClick={this.sushiClick} handleClick = {this.handleClick} quad ={this.state.quad} sushi={this.state.sushi} />
        <Table wallet={this.state.wallet} empty = {this.state.sushi.filter(s => s.eaten === true)}/>
      </div>
    );
  }
}

export default App;