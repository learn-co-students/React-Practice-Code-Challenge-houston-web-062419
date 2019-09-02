import React, { Fragment } from 'react'
import MoreButton from '../components/MoreButton'
import Sushi from '../components/Sushi'




const SushiContainer = (props) => {

 

  
  return (
    <Fragment>
      <div className="belt">
        { 
            props.sushi.filter(sushi => (sushi.id > props.quad * 4) && (sushi.id < props.quad * 4 + 5))
            .map(sushi => <Sushi key={sushi.id} sushi={sushi} sushiClick={props.sushiClick}/>)
        }
        <MoreButton handleClick={props.handleClick}/>
      </div>
    </Fragment>
  )
}

export default SushiContainer