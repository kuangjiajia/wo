import * as React from 'react';

interface IAppState { }
interface IAppProps { }

class App extends React.Component<IAppProps, IAppState> {
  constructor(props: IAppProps) {
    super(props);
  }
  render() {
    return (
      <>
        <div>this is a webpack demo</div>
      </>
    )
  }
}


export default App;