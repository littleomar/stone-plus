import { Route, Redirect } from 'react-router-dom'
import React from 'react'

import List from '../views/list'
import Detial from '../views/detail'


export default () => [
  <Route path='/' exact render={()=><Redirect to="/list" />} key="index" />,
  <Route  path="/list" component={List} key="list" />,
  <Route path="/detail" component={Detial} key="detail" />
]
