import React from 'react'
import injectSheet from 'react-jss'
import { Helmet } from "react-helmet";


const styles = {
  detail: {
    fontSize: 22,
    color: 'orange'
  }
}

const Detail = ( {classes} ) => (
  <div>
    <Helmet>
      <title>detail</title>
    </Helmet>
    <div className={classes.detail}>i`m detail</div>
  </div>
)

export default injectSheet(styles)(Detail)
