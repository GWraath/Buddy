import React from 'react'

export default function ConditionalComponent(props) {
  return (
    <div>{props.prop?props.true:props.false}</div>
  )
}
