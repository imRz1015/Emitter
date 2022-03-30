import { EventsType } from './type'

class Emitter {
  private eventPool: EventsType = {}

  $on(eventName: string, cb: Function, once = false) {
    if (!this.eventPool[eventName]) {
      this.eventPool[eventName] = []
    }

    this.eventPool[eventName].push({
      cb,
      once,
    })
  }

  $once(eventName: string, cb: Function) {
    this.$on(eventName, cb, true)
  }

  $emit(eventName: string, ...params: any[]) {
    const listeners = this.eventPool[eventName] || []
    let { length } = listeners
    for (let i = 0; i < length; i += 1) {
      const { cb, once } = listeners[i]
      cb.apply(this, params)
      if (once) {
        listeners.splice(i, 1)
        i -= 1
        length -= 1
      }
    }
  }

  $clear() {
    this.eventPool = {}
  }

  $off(eventName: string, cb?: Function) {
    if (cb) {
      const listeners = this.eventPool[eventName] || []
      let { length } = listeners
      for (let i = 0; i < length; i += 1) {
        if (listeners[i].cb === cb) {
          listeners.splice(i, 1)
          i -= 1
          length -= 1
        }
      }
    } else {
      delete this.eventPool[eventName]
    }
  }
}

export default new Emitter()
