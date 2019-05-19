class HistoryRoute {
  constructor() {
    this.current = null
  }
}

class VueRouter {
  constructor(options = {}) {
    this.mode = options.mode || 'hash'
    this.routes = options.routes || []
    this.routesMap = this.createMap(this.routes)
    this.history = new HistoryRoute
    this.init()
  }

  go() {

  }

  back() {

  }

  push() {

  }

  init() {
    if (this.mode === 'hash') {
      location.hash ? '' : location.hash = '/'
      window.addEventListener('load', () => {
        this.history.current = location.hash.slice(1)
      })

      window.addEventListener('hashchange', () => {
        this.history.current = location.hash.slice(1)
      })
    } else {
       location.pathname ? '' : location.pathname = '/'

       window.addEventListener('load', () => {
         this.history.current = location.pathname
       })

       window.addEventListener('popstate', () => {
         this.history.current = location.pathname
       })
    }
  }

  createMap(routes) {
    return routes.reduce((memo, current) => {
      memo[current.path] = current.component
      return memo
    }, {})
  }
}

VueRouter.install = function(Vue, opts) {
  // console.log(Vue, opts)
  Vue.mixin({
    beforeCreate() {
      // this 组件实例
      // 根组件实例
      if (this.$options && this.$options.router) {
        this._router = this.$options.router
        this._root = this
        // observer
        Vue.util.defineReactive(this, 'xxx', this._router.history)
      } else {
        this._root = this.$parent._root
      }
    }
  })

  Object.defineProperty(Vue.prototype, '$router', {
    get() {
      return this._root._router
    }
  })

  Object.defineProperty(Vue.prototype, '$route', {
    get() {
      return {
        current: this._root.xxx.current
      }
    }
  })

  Vue.component('RouterView', {
    render(h) {
      let { history: { current }, routesMap} = this._self._root._router
      return h(routesMap[current])
    }
  })

  Vue.component('RouterLink', {
    props: {
      to: String,
      tag: String
    },
    methods: {
      handleClick() {
        // alert(1)
      }
    },
    render(h) {
      let mode = this._self._root._router.mode
      let tag = this.tag || 'a'
      return <tag on-click={this.handleClick} href={mode === 'hash'? `#${this.to}` : this.to}>{this.$slots.default}</tag>
    }
  })
}

export default VueRouter
