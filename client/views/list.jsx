import React from 'react'
import injectSheet from 'react-jss'
import { Helmet } from "react-helmet";


const styles = {
  list: {
    fontSize: 22,
    color: 'orange'
  }
}

const List = ( {classes} ) => (
  <div>
    <Helmet>
      <title>My Title</title>
      <meta name="description" content="Helmet application" />
    </Helmet>
    <div className={classes.list}>i`m list</div>
  </div>
)

export default injectSheet(styles)(List)
