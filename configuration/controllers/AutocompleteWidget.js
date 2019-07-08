const AUTOCOMPLETE_IDS = ['outlinedAutocomplete', 'flatAutocomplete']

class AutocompleteWidget {
  onCreate({ view, navigator, notifier }) {
    this.view = view
    this.notifier = notifier
    this.navigator = navigator

    this.bindAppbar()
    this.bindDocLabel()
    this.bindAutocompletes()
    this.bindLoadingCheckbox()
    this.bindReadOnlyCheckbox()
    this.bindSuggestionsOpenCheckbox()
    this.bindVisibilityCheckbox()
  }

  bindAppbar() {
    const appbar = this.view.getComponent('appbar')
    appbar.onLeftIconClick(() => this.navigator.pop())
  }

  bindDocLabel() {
    const openDocLabel = this.view.getComponent('openDocLabel')
    openDocLabel.onClick(() => this.notifier.snackbar({ msg: 'Open link WIP' }))
  }

  bindAutocompletes() {
    this.autocompletes = AUTOCOMPLETE_IDS.map(id => this.view.getComponent(id))
  }

  bindLoadingCheckbox() {
    const isLoadingCheckbox = this.view.getComponent('isLoadingCheckbox')
    isLoadingCheckbox.onChange(value => {
      this.autocompletes.forEach(autocomplete => autocomplete.setAttrs({ isLoading: value }))
    })
  }

  bindReadOnlyCheckbox() {
    const isReadOnlyCheckbox = this.view.getComponent('isReadOnlyCheckbox')
    isReadOnlyCheckbox.onChange(value => {
      this.autocompletes.forEach(autocomplete => autocomplete.setAttrs({ readonly: value }))
    })
  }

  bindVisibilityCheckbox() {
    const visibilityCheckbox = this.view.getComponent('visibilityCheckbox')
    visibilityCheckbox.onChange(value => {
      this.autocompletes.forEach(autocomplete => autocomplete.setAttrs({ visibility: value }))
    })
  }

  bindSuggestionsOpenCheckbox() {
    const isSuggestionsOpenCheckbox = this.view.getComponent('isSuggestionsOpenCheckbox')
    isSuggestionsOpenCheckbox.onChange(value => {
      this.autocompletes[1].setAttrs({ isSuggestionsOpened: value })
    })
  }
}
