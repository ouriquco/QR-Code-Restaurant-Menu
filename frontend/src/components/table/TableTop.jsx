import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';

export const TableTop = () => {
  return (
    <div className="table-top">
        <i className="top-nav">ICON</i>
        <span className="top-nav">Name</span>
        <span className="top-nav">Number</span>
        <i className="top-nav"><FontAwesomeIcon icon={faArrowRightFromBracket}/></i>
    </div>
  )
}
