class Main {
  onCreate({ view, notifier }) {
    this.view = view
    const appbar = view.getComponent('mainAppbar')
    appbar.onMenuItemClick(id => {
      if (id === 'settings') {
        notifier.snackbar({ msg: 'Settings screen WIP', duration: 3000 })
      }
    })
  }
}
