import React from 'react';

const HappinessHeader = () => (
  <div>
    <div className="bg-purple-darker opacity-75 fixed z-10 w-full h-screen"></div>
    <div className="p-24 flex flex-col justify-center w-full h-screen fixed z-20">
      <div>
        <h2 className="text-2xl md:text-3xl text-white">Visualizing</h2>
        <h1 className="text-4xl md:text-6xl text-white">World <span className="text-cyan">Happiness</span></h1>
      </div>
      <div>
        <button className="bg-cyan">Click to view</button>
      </div>
    </div>
  </div>
)

export default HappinessHeader;