class DefaultList {
  onCreate({ view, navigator, notifier }) {
    this.view = view
    this.notifier = notifier
    this.navigator = navigator

    this.bindAppbar()
  }

  bindAppbar() {
    const appbar = this.view.getComponent('AppbarBlock')
    appbar.onLeftIconClick(() => this.navigator.pop())
    appbar.setAttrs({ title: 'Default List' })
  }
}
