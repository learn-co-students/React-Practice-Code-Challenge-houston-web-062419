import React, { Component } from 'react';

export default class AddCash extends Component {
    render () {
        return (
            <form id="form" onSubmit={(e) => this.props.addCash(e)}>
                    <input type="text" placeholder="that sushi money" className="form-control-sm"/>
                    <button type="submit" >Add Cash</button>
                    <br/>
            </form>
        )
    }
}