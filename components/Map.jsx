import React, { useState } from "react"
import ReactMapGL, { Marker, NavigationControl } from "react-map-gl"
import Modal from '../components/Modal'

export default function Map({ pumps, setModalId, modalId }) {
  const [viewPort, setViewPort] = useState({
    width: "100%",
    height: "100vh",
    latitude: 12.55,
    longitude: 104.9,
    zoom: 7.2,
    minZoom: 6.28,
    maxZoom: 13,
  })

  const [maxBounds] = useState([
    [10.572449, 103.140854], // Southwest coordinates
    [14.841942, 107.66624], // Northeast coordinates
  ])

  // var maxBounds = [
  //   [10.572449, 103.140854], // Southwest coordinates
  //   [14.841942, 107.66624], // Northeast coordinates
  // ]

  const mapPins = {
    status: {
      functional: "../static/success.svg",
      unknown: "../static/unknown.svg",
      nonFunctional: "../static/error.svg",
    },
  }

  return (
    <div css={{ img: { cursor: "pointer" } }}>
      <ReactMapGL
        // andy's
        fitBounds={undefined}
        maxBounds={maxBounds}
        mapStyle="mapbox://styles/diamondmail91/ck26o0ysl68821cpa9h6gj8xc"
        mapboxApiAccessToken="pk.eyJ1IjoiZGlhbW9uZG1haWw5MSIsImEiOiJjanpidzZxajMwMXF5M2Rueng0MmExc3FsIn0.8_SaAolyg_YzvdzClFuvXQ"
        onViewportChange={view => setViewPort({ ...view, width: "100%" })}
        css={{ borderRadius: 5 }}
        maxBounds={[
          [-74.04728500751165, 40.68392799015035],
          [-73.91058699000139, 40.87764500765852],
        ]}
        {...viewPort}>
        {pumps.map(pump => (
          <Marker
            latitude={pump.latitude}
            longitude={pump.longitude}
            offsetLeft={-20}
            offsetTop={-10}>
            {pump.status === 0 ? (
              <img
                src={mapPins.status.nonFunctional}
                width={"31px"}
                css={{ zIndex: 2 }}
                onClick={() => setModalId(pump.id)}
                alt=""
              />
            ) : pump.status === 1 ? (
              <img
                src={mapPins.status.unknown}
                width={"31px"}
                onClick={() => setModalId(pump.id)}
                alt=""
              />
            ) : pump.status === 2 ? (
              <img
                src={mapPins.status.functional}
                width={"31px"}
                onClick={() => setModalId(pump.id)}
                alt=""
              />
            ) : null}
          {/* <Modal modalId={modalId} pumps={pumps} /> */}
          </Marker>
        ))}
        <div css={{ position: "absolute", right: 10, bottom: "9%" }}>
          <NavigationControl showZoom />
        </div>
      </ReactMapGL>
    </div>
  )
}
