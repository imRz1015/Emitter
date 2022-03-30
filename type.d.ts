export interface Listener {
  cb: Function
  once: boolean
}

export interface EventsType {
  [eventName: string]: Listener[]
}
