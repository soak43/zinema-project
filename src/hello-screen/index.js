import React from "react"
import HelloScreen from "./hello-screen"

const HelloPage = () => {
    return (
        <div 
            className="w-auto text-center text-white bg-dark p-4"
            style={{
                height: `100vh`
            }}>
            <h1>Zinema</h1>
            <h2>All The Movies. One Place.</h2>
            <HelloScreen/>
        </div>
    )
}

export default HelloPage