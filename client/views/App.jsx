import React from 'react'
import { hot } from 'react-hot-loader'
import injectSheet from 'react-jss'
import { observer, inject } from 'mobx-react'


import Routes from '../config/router'

@inject("appState") @observer






// const App = ({classes}) => {
//   return <div className={classes.divColor}>hello world</div>
// }

class App extends React.Component {
  componentDidMount() {
    const jssStyles = document.querySelector("#renderStyle");
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }
  render() {
    const classes = this.props.classes
    return (
      <div className={classes.divColor}>
        <p>hello world {this.props.appState.msg}</p>
        <Routes />
      </div>
    )
  }
  // bootstrap() {
  //   return new Promise((resolve,reject)=>{
  //     setTimeout(()=>{
  //       this.props.appState.count = 13
  //       resolve(true)
  //     },2)
  //   })
  // }
}
const styles = {
  divColor: {
    color: 'red'
  }
}

export default hot(module)(injectSheet(styles)(App))

// export default () => (<div>server render</div>)

