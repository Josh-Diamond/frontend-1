import React from 'react'
import Map from '../components/Map'

export default function Home({ pumps }) {
    return (
        <div css={{ marginTop: '-40px'}}>
            <Map pumps={pumps} />
        </div>
    )
}

Home.getInitialProps = async () => {
    const { pumps } = require("../assets/cache/pumps.json")
    return { pumps }
  }
  