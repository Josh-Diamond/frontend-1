import React, { useState } from "react"
import ReactMapGL, { Marker, NavigationControl } from "react-map-gl"
import Modal from "../components/Modal"
import { getPumpStyles, breakingPoints } from "../components/Styles"
import Draggable from "react-draggable"
import { MdSearch } from 'react-icons/md'

function hexToRGB(hex, alpha) {
  var r = parseInt(hex.slice(1, 3), 16),
    g = parseInt(hex.slice(3, 5), 16),
    b = parseInt(hex.slice(5, 7), 16)

  if (alpha) {
    return "rgba(" + r + ", " + g + ", " + b + ", " + alpha + ")"
  } else {
    return "rgb(" + r + ", " + g + ", " + b + ")"
  }
}

export default function Map({ pumps, setModalId, modalId }) {
  const pumpStyles = getPumpStyles({ iconSize: 15 })
  const [expanded, setExpanded] = useState(false)
  const [funcToggle, setFuncToggle] = useState(false)
  const [unToggle, setUnToggle] = useState(false)
  const [nonToggle, setNonToggle] = useState(false)
  const [viewPort, setViewPort] = useState({
    width: "100%",
    height: "100vh",
    latitude: 12.55,
    longitude: 104.9,
    center: [12.55, 104.9],
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

  const isExpanded = () => {
    setExpanded(!expanded)
  }

  const mapAdjust = pump => {
    setViewPort({...viewPort, center: [pump.latitude, pump.longitude]})
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
        {/* /////////////////Filter */}
        <div css={{ display: 'flex', justifyContent: 'space-between', margin: '1%'}}>
        
        {/* Search Bar */}
        <div css={{ width: '250px', height: '50px', borderRadius: '6px', backgroundColor: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
          <input placeholder='Search location or pump' css={{ color: '#082B84', fontWeight: 'bold', margin: '2%', border: 'none', outline: 'none', height: '100%', width: '100%', "::placeholder": { color: '#7E7E7E', fontWeight: '100'} }} />
          <MdSearch css={{ margin: '2%', fontSize: '2.5rem', color: '#C7C9CF', paddingLeft: '5px', borderLeft: '2px solid #C7C9CF', height: '25px'}} />
        </div>
        {/* End SearchBar */}

        {/* Modal Card */}
        {/* <Modal modalId={modalId} pumps={pumps} setModalId={setModalId} /> */}
        {/* End Modal Card */}
        <details
          css={{
            width: "250px",
            backgroundColor: "#082B84",
            borderRadius: "6px",
            // border: '2px solid red',
            // position: "absolute",
            // left: "75%",
            // top: "15px",
            zIndex: "9999999999999",
          }}>
          <summary
            css={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              outline: "none",
              cursor: "pointer",
              margin: "0 5%",
              "::-webkit-details-marker": {
                display: "none",
              },
            }}
            onClick={isExpanded}>
            <p css={{ color: "white", fontWeight: "100" }}>Filter</p>
            {expanded ? (
              <p
                css={{
                  color: "white",
                  fontWeight: "bold",
                  fontSize: "1.5rem",
                  margin: "0",
                }}>
                -
              </p>
            ) : (
              <p
                css={{
                  color: "white",
                  fontWeight: "bold",
                  fontSize: "1.5rem",
                  margin: "0",
                }}>
                +
              </p>
            )}
          </summary>

          {/* Details */}
          <div
            css={{
              backgroundColor: "white",
              borderBottomLeftRadius: "6px",
              borderBottomRightRadius: "6px",
              cursor: "auto",
            }}>
            <form
              css={{ display: "flex", flexDirection: "column", width: "100%" }}>
              <label
                for="country"
                css={{ marginBottom: "5%", fontWeight: "bold", margin: "5%" }}>
                Country
              </label>
              <select
                name="country"
                id="country"
                css={{ margin: "0 5%", width: "80%", margin: "0 auto" }}>
                <option value="Cambodia">Cambodia</option>
                <option value="Uganda">Uganda</option>
              </select>

              <label
                for="status"
                css={{ marginBottom: "5%", fontWeight: "bold", margin: "5%" }}>
                Status
              </label>
              {/* Functional */}
              <div
                css={{
                  margin: "0 5%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  width: "85%",
                }}>
                <div css={{ display: "flex", alignItems: "center" }}>
                  <div
                    css={{
                      borderRadius: "50%",
                      width: 24,
                      height: 24,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      marginRight: "10px",
                      backgroundColor: hexToRGB(
                        pumpStyles.status[2].color,
                        0.2,
                      ),
                    }}>
                    {pumpStyles.status[2].icon}
                  </div>
                  <p>Functional</p>
                </div>

                {/* toggle test */}
                <div
                  css={{
                    background: "#D7D7D7",
                    borderRadius: "50px",
                    height: "20px",
                    position: "relative",
                    width: "40px",
                  }}>
                  <div
                    onClick={() => setFuncToggle(!funcToggle)}
                    css={
                      funcToggle
                        ? {
                            background: "#01c000",
                            borderRadius: "50px",
                            height: "18px",
                            left: "18px",
                            position: "absolute",
                            transition: "0.2s",
                            width: "20px",
                            cursor: "pointer",
                          }
                        : {
                            background: "#f44336",
                            borderRadius: "50px",
                            height: "18px",
                            left: "0",
                            position: "absolute",
                            transition: "0.2s",
                            width: "20px",
                            cursor: "pointer",
                          }
                    }
                  />
                </div>
                {/* end toggle test */}
              </div>

              {/* Unknown */}
              <div
                css={{
                  margin: "0 5%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  width: "85%",
                }}>
                <div css={{ display: "flex", alignItems: "center" }}>
                  <div
                    css={{
                      borderRadius: "50%",
                      width: 24,
                      height: 24,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      marginRight: "10px",
                      backgroundColor: hexToRGB(
                        pumpStyles.status[1].color,
                        0.2,
                      ),
                    }}>
                    {pumpStyles.status[1].icon}
                  </div>
                  <p>Unknown</p>
                </div>
                <div
                  css={{
                    background: "#D7D7D7",
                    borderRadius: "50px",
                    height: "20px",
                    position: "relative",
                    width: "40px",
                  }}>
                  <div
                    onClick={() => setUnToggle(!unToggle)}
                    css={
                      unToggle
                        ? {
                            background: "#01c000",
                            borderRadius: "50px",
                            height: "18px",
                            left: "18px",
                            position: "absolute",
                            transition: "0.2s",
                            width: "20px",
                            cursor: "pointer",
                          }
                        : {
                            background: "#f44336",
                            borderRadius: "50px",
                            height: "18px",
                            left: "0",
                            position: "absolute",
                            transition: "0.2s",
                            width: "20px",
                            cursor: "pointer",
                          }
                    }
                  />
                </div>
              </div>

              {/* Non-Functional */}
              <div
                css={{
                  margin: "0 5%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  width: "85%",
                }}>
                <div css={{ display: "flex", alignItems: "center" }}>
                  <div
                    css={{
                      borderRadius: "50%",
                      width: 24,
                      height: 24,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      marginRight: "10px",
                      backgroundColor: hexToRGB(
                        pumpStyles.status[0].color,
                        0.2,
                      ),
                    }}>
                    {pumpStyles.status[0].icon}
                  </div>
                  <p>Non-Functional</p>
                </div>
                <div
                  css={{
                    background: "#D7D7D7",
                    borderRadius: "50px",
                    height: "20px",
                    position: "relative",
                    width: "40px",
                  }}>
                  <div
                    onClick={() => setNonToggle(!nonToggle)}
                    css={
                      nonToggle
                        ? {
                            background: "#01c000",
                            borderRadius: "50px",
                            height: "18px",
                            left: "18px",
                            position: "absolute",
                            transition: "0.2s",
                            width: "20px",
                            cursor: "pointer",
                          }
                        : {
                            background: "#f44336",
                            borderRadius: "50px",
                            height: "18px",
                            left: "0",
                            position: "absolute",
                            transition: "0.2s",
                            width: "20px",
                            cursor: "pointer",
                          }
                    }
                  />
                </div>
              </div>
            </form>
          </div>
        </details>
        </div>
        {/* ////////////////////////// */}

        {pumps.map(pump => (
          <>
            <Marker
              latitude={pump.latitude}
              longitude={pump.longitude}
              offsetLeft={-20}
              offsetTop={-10}
              onClick={()=> mapAdjust(pump)}>
              {/* { pump.id === modalId ? <Modal modalId={modalId} pumps={pumps} setModalId={setModalId} /> : null} */}
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
            </Marker>
          </>
        ))}
        {/* <div css={{ zIndex: 99999999999999999999999999999999999999999}}> */}
        <Modal modalId={modalId} pumps={pumps} setModalId={setModalId} />
        {/* </div> */}
        <div css={{ position: "absolute", right: 10, bottom: "9%" }}>
          <NavigationControl showZoom />
        </div>
      </ReactMapGL>
    </div>
  )
}
