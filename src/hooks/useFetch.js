import { useEffect, useReducer } from 'react'

const pending = { loading: true, error: null, data: null }
const initialState = { fetcher: null, inputs: [], result: pending }

function reducer(state, action) {
  switch (action.type) {
    case 'STARTED':
      return { fetcher: action.fetcher, inputs: action.inputs, result: pending }
    case 'SUCCEEDED':
      return { ...state, result: { loading: false, error: null, data: action.data } }
    case 'FAILED':
      return { ...state, result: { loading: false, error: action.error, data: null } }
    default:
      return state
  }
}

export function useFetch(fetcher, inputs) {
  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    const controller = new AbortController()
    dispatch({ type: 'STARTED', fetcher, inputs })

    async function load() {
      try {
        const data = await fetcher(...inputs, controller.signal)
        if (!controller.signal.aborted) {
          dispatch({ type: 'SUCCEEDED', data })
        }
      } catch (error) {
        if (!controller.signal.aborted) {
          dispatch({ type: 'FAILED', error })
        }
      }
    }

    load()
    return () => controller.abort()
    // Each caller supplies the same number of inputs on every render.
  }, [fetcher, ...inputs])

  const isCurrent = state.fetcher === fetcher
    && state.inputs.length === inputs.length
    && inputs.every((input, index) => Object.is(input, state.inputs[index]))

  return isCurrent ? state.result : pending
}
