export interface NuvyRouteConfirmation {
  title: string
  message: string
}

export interface NuvyRouteConfirmationContext {
  confirmation?: NuvyRouteConfirmation
  setConfirmation: (confirmation?: NuvyRouteConfirmation) => void
  confirm: () => Promise<void>
}

export interface ModalState {
  resolve: () => void
  reject: () => void
}
