import React, { Component } from 'react'
import { cardLookupTable } from './../../cards/CardLookupTable.js'
import './Game.scss'

export default class Game extends Component {
    constructor(props) {
        super(props)

        this.state = {
                 
        }
    }

    render() {
        return (
            <div className='test'>
                {cardLookupTable[4][0]}
            </div>
        )
    }
}
