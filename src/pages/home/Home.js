import React, { Component } from 'react'
import './Home.scss'

export default class Home extends Component {
    render() {
        return (
            <div className='center'>
                <b className='home-title'>Welcome to kom-potje.xyz</b>
                <div className='home-text'>On this website you can join card games and</div>
                <div className='home-text'>If you own an account you can also create your own card games and host them!</div>
            </div>
        )
    }
}
