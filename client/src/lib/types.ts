export interface Viewer {
  id: string | null
  token: string | null
  avatar: string | null
  seller: boolean
  hasWallet: boolean | null
  didRequest: boolean
}
