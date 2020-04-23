import { CandyPlacement } from "./Candy"

export interface PlacedCandyState {
  placedCandy: CandyPlacement[]
}

export interface SelectedPetState {
  selectedPet: string
}

export type CandyBoxState = PlacedCandyState & SelectedPetState

//@ts-ignore
export function reducer(state: CandyBoxState, action) {
  switch (action.type) {
  }
}
