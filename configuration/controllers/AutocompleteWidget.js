class AutocompleteWidget {
  onCreate({ view, navigator, notifier }) {
    this.view = view
    this.notifier = notifier
    this.navigator = navigator

    this.bindAppbar()
    this.bindDocLabel()
    this.bindAutocomplete()
  }

  bindAppbar() {
    const appbar = this.view.getComponent('appbar')
    appbar.onLeftIconClick(() => this.navigator.pop())
  }

  bindDocLabel() {
    const openDocLabel = this.view.getComponent('openDocLabel')
    openDocLabel.onClick(() => this.notifier.snackbar({ msg: 'Open link WIP' }))
  }

  bindAutocomplete() {
    this.autocomplete = this.view.getComponent('simpleAutocomplete')
  }
}
