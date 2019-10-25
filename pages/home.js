import React, { useState } from 'react'
import Map from '../components/Map'

export default function Home({ pumps }) {
    const [modalId, setModalId] = useState(null)

    return (
        <div css={{ marginTop: '-40px'}}>
            <Map pumps={pumps} modalId={modalId} setModalId={setModalId} />
        </div>
    )
}

Home.getInitialProps = async () => {
    const { pumps } = require("../assets/cache/pumps.json")
    return { pumps }
  }
  