import { createContext } from "react"

const dispatch = () => {}

export const CandyBoxContext = createContext<typeof dispatch | null>(null)
