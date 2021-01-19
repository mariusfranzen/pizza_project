import React, { Component } from 'react'


export class HomePage extends Component {
    render() {
        return (
                <div className='homepage'>

                <div className='div1'>
                    
                    <img  className='homepic' src="profilepic.jpg" alt="profilepic" ></img>
                </div>   
                 <div className='welcometitle'>
                        <h1>Welcome to mindfullness pizzeria</h1>
                        <p>"we will send it to the ranch"-dr Phill</p>
                        <h2>De populäraste pizzorna : </h2>
                 </div>

                    <div className='homeItem'>
                        <h3>85</h3>
                        <h1>kebab</h1>
                        <h2>75kr</h2>
                        <p>tomatsos,ost,kebab,lök,fefferoni,vitlök</p>
                        <button>Köp</button>
                </div>    
            </div>
        )
    }
}

export default HomePage
