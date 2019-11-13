import * as React from 'react';
import { name } from '$constants/index';
interface IAppState { };
interface IAppProps { };
import './App.less';
class App extends React.Component<IAppProps, IAppState> {
  constructor(props: IAppProps) {
    super(props);
    console.log(name);
  }
  componentDidMount() {
    console.log(123);
  }
  render() {
    return (
      <>
        <div>你好啊</div>
        <div className="app">this is a webpack demo</div>
      </>
    )
  }
}


export default App;