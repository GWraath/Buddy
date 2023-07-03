import { React, useReducer } from 'react'

export default function useLogic() {
  const reducer = (state, action) => {
    switch (action.type) {
      case 'hideOrShow': {
        return !state
      }
      default:
        return state
    }
  }
  return useReducer(reducer)
}
 