import React from 'react';

class HappinessHeader extends React.Component<{}, { visible: boolean }> {

  constructor(props: any) {
    super(props);
    this.state = {
      visible: true
    }
  }

  render() {
    return (
      <div className={this.state.visible?'fadeIn':'fadeOut'}>
      <div className="bg-purple-darker opacity-75 fixed z-50 w-full h-screen"></div>
      <div className="p-24 flex flex-col justify-center w-full h-screen fixed z-50">
        <div>
          <h2 className="text-2xl md:text-3xl text-white">Visualizing</h2>
          <h1 className="text-4xl md:text-6xl text-white">World <span className="text-cyan">Happiness</span></h1>
        </div>
        <div>
          <button className="text-cyan fixed z-30" onClick={() => this.setState({ visible: false })}>Click to view</button>
        </div>
      </div>
    </div>
    )
  }
}

export default HappinessHeader;