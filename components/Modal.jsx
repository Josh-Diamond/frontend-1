import React from "react"
import ModalCard from "./ModalCard"
import MonitorCard from './MonitorCard'

export default function Modal({ pumps, modalId, setModalId }) {
  const selectedPump = modalId ? pumps.find(pump => pump.id === modalId) : null
  console.log("modalID", modalId)
  console.log("selectedPump", selectedPump)
  return (
    <div>
      {modalId ? (
        <ModalCard pump={selectedPump} setModalId={setModalId} />
      ) : null}
    </div>
  )
  // return (
  //   <div>
  //     {pumps.map(pump => {
  //       if (pump.id === modalId) {
  //         return <ModalCard pump={pump} />
  //       }
  //     })}
  //   </div>
  // )
}
