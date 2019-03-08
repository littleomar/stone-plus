import React from 'react'
import JssProvider from 'react-jss/lib/JssProvider'
import { useStaticRendering } from "mobx-react"
import { Provider } from 'mobx-react'
import { StaticRouter } from 'react-router-dom'
import { Helmet} from "react-helmet";


import App from './views/App'
import { createStoreMap } from './store'






useStaticRendering(true);

class Root extends React.Component{
  constructor(props) {
    super(props);
    if (process.env.__SERVER__SIDE__ ) {
      this.props.setHead(Helmet);
    }
  }
  render() {
    return <App/>
  }
}

export default ( sheets, generateClassName, stores, routerContext, url ) => {
  return (
    <Provider {...stores}>
      <StaticRouter context={routerContext} location={url}>
        <JssProvider registry={sheets} generateClassName={generateClassName}>
          {/*<Root setHead={(head) => App.head = head} />*/}
          <App />
        </JssProvider>
      </StaticRouter>
    </Provider>
  )
}

export { createStoreMap }
