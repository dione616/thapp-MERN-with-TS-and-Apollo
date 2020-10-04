import { useReducer } from "react"
import { server } from "./server"

interface State<TData> {
  data: TData | null
  loading: boolean
  error: boolean
}

//return type
type MutationTuple<TData, TVariables> = [(varibles?: TVariables | undefined) => Promise<void>, State<TData>]

//<-- Reducer --> //
type Action<TData> = { type: "DELETE" } | { type: "DELETE_SUCCESS"; payload: TData } | { type: "DELETE_ERROR" }

const reducer = <TData>() => (state: State<TData>, action: Action<TData>) => {
  switch (action.type) {
    case "DELETE": {
      return { ...state, loading: true }
    }
    case "DELETE_SUCCESS": {
      return { data: action.payload, loading: false, error: false }
    }
    case "DELETE_ERROR": {
      return { ...state, loading: false, error: true }
    }
    default:
      return state
  }
}

export const useMutation = <TData = any, TVariables = any>(query: string): MutationTuple<TData, TVariables> => {
  const fetchReducer = reducer<TData>()

  const [state, dispatch] = useReducer(fetchReducer, { data: null, loading: false, error: false })

  const fetch = async (variables?: TVariables) => {
    try {
      dispatch({ type: "DELETE" })

      const { data, errors } = await server.fetch<TData, TVariables>({ query, variables })

      if (errors && errors.length) {
        throw new Error(errors[0].message)
      }
      dispatch({ type: "DELETE_SUCCESS", payload: data })
    } catch (err) {
      dispatch({ type: "DELETE_ERROR" })
      throw console.error(err) //prevents any code after this executes
    }
  }

  return [fetch, state]
}

//TODO: extrapolate to sharing reducer
