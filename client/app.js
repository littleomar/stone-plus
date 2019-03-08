import { render } from 'react-dom'
import React from 'react'
import { Provider } from 'mobx-react'
import { BrowserRouter } from 'react-router-dom'

require('./reset.scss')

import App from './views/App'
import { AppState } from "./store";
const initialState = window.__INIT__STATE__ || {}

render(
  <Provider appState={new AppState(initialState.appState)}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
,document.querySelector('#app'))


