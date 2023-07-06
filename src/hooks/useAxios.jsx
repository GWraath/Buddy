import { React, useReducer } from 'react'

export default function reducer() {
  switch (action.type) {
    case 'hideOrShow': {
      return !state
    }
    default:
      return state
  }
  return useReducer(reducer)
}
