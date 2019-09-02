import React, { Component } from 'react';
import SushiContainer from './containers/SushiContainer';
import Table from './containers/Table';
import AddCash from './containers/AddCash';

// Endpoint!

class App extends Component {

  constructor(){
    super(),
    this.state = {
      sushiMaster: [],
      sushiDisplay: [],
      sushiIndex: 0,
      wallet: 50,
    }
  }

  componentDidMount() {
    const API = "http://localhost:3000/sushis"

    fetch(API)
    .then(res => res.json())
    .then(sushis => {
      let sushisArr = sushis.map(sushi => {return{...sushi, eaten: false}})
      this.setState ({
        sushiMaster: sushisArr,
        sushiDisplay: sushisArr,
        sushiIndex: 0
      })
    })
  }

  limitSushis = () => {
    let sushisArr = this.state.sushiDisplay.slice(this.state.sushiIndex, this.state.sushiIndex+4)
    return sushisArr
  }

  moreSushi = () => {
    this.setState ({
      sushiIndex: this.state.sushiIndex+4
    })
  }

  eatSushi = (e) => {
    let currentwallet = this.state.wallet - e.price
    if (currentwallet >= 0) {
      let sushisArr = this.state.sushiDisplay.map(sushi => {
        if (sushi.id === e.id) {
          sushi.eaten = true
          return sushi
        } else {
          return sushi
        }
      })
      
      this.setState({
        sushiDisplay: sushisArr,
        wallet: this.state.wallet - e.price
      })
    } else {
      let sushisArr = this.state.sushiDisplay.map(sushi => {
        if (sushi.id === e.id) {
          sushi.eaten = false
          return sushi
        } else {
          return sushi
        }
      })
    }

  }


  numPlates = () => {
    return this.state.sushiDisplay.filter(sushi => sushi.eaten)
  }
 
  addCash = (e) => {
    e.preventDefault()
    let newWallet = parseInt(this.state.wallet) + parseInt(e.target[0].value)
    console.log(newWallet)
    this.setState({
      wallet: newWallet
    })
  }

  render() {
    // console.log(this.state.eaten)

    return (
      <div className="app">
        <AddCash addCash={this.addCash}/>
        <SushiContainer sushis={this.limitSushis()} moreSushi={this.moreSushi} eatSushi={this.eatSushi} />
        <Table price={this.state.wallet} numPlates={this.numPlates()}/>
      </div>
    );
  }
}

export default App;