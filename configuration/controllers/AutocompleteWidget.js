const AUTOCOMPLETES = [
  {
    autocompleteId: 'FlatPopoverWithoutFloatingTitleAutocomplete',
    expandButtonId: 'FPWFT_isSuggestionsOpenedButton',
    popupButtonId: 'FPWFT_popupButton',
    attrsButtonId: 'FPWFT_getAttrsButton'
  },
  {
    autocompleteId: 'FlatFixedWithFloatingTitleAutocomplete',
    popupButtonId: 'FFFT_popupButton',
    attrsButtonId: 'FFFT_getAttrsButton'
  },
  {
    autocompleteId: 'OutlinedPopoverWithoutFloatingTitleAutocomplete',
    expandButtonId: 'OPWFT_isSuggestionsOpenedButton',
    popupButtonId: 'OPWFT_popupButton',
    attrsButtonId: 'OPWFT_getAttrsButton'
  },
  {
    autocompleteId: 'OutlinedFixedWithFloatingTitleAutocomplete',
    popupButtonId: 'OFFT_popupButton',
    attrsButtonId: 'OFFT_getAttrsButton'
  }
]

const NEW_DATA = [
  {
    id: '0',
    value: 'Audi'
  },
  {
    id: '1',
    value: 'Bmw'
  },
  {
    id: '2',
    value: 'Citroen'
  },
  {
    id: '3',
    value: 'Dodge'
  },
  {
    id: '4',
    value: 'Honda'
  },
  {
    id: '5',
    value: 'Lexus'
  },
  {
    id: '6',
    value: 'Nissan'
  },
  {
    id: '7',
    value: 'Porsche'
  }
]

class AutocompleteWidget {
  onCreate({ view, navigator, notifier, translation }) {
    this.view = view
    this.notifier = notifier
    this.navigator = navigator
    this.translation = translation

    this.bindAppbar()
    this.bindDocLabel()
    this.bindAutocompletes()
    this.bindLoadingCheckbox()
    this.bindReadOnlyCheckbox()
    this.bindVisibilityCheckbox()
    this.bindSetDataButton()
    this.bindSetValueButton()
    this.bindClearValueButton()
    this.bindSetTitleButton()
    this.bindSetErrorButton()
    this.bindClearErrorButton()
    this.bindOnSelectCase()
    this.bindOnChangeCase()
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
    this.autocompletes = AUTOCOMPLETES.map(block => {
      const autocomplete = this.view.getComponent(block.autocompleteId)

      const popupButton = this.view.getComponent(block.popupButtonId)
      popupButton.onClick(() =>
        this.navigator.push({ id: 'AutocompletePopup', isPopup: true, params: { screenId: block.autocompleteId } })
      )

      const attrsButton = this.view.getComponent(block.attrsButtonId)
      attrsButton.onClick(() =>
        this.notifier.alert({
          title: this.translation.get('attributes'),
          msg: JSON.stringify(autocomplete.getAttrs(), null, 2),
          cancelable: true
        })
      )

      if (block.expandButtonId) {
        const isSuggestionsOpenedButton = this.view.getComponent(block.expandButtonId)
        isSuggestionsOpenedButton.onClick(() => {
          autocomplete.setAttrs({ isSuggestionsOpened: true })
        })
      }

      return autocomplete
    })
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

  bindSetDataButton() {
    const setDataButton = this.view.getComponent('setDataButton')
    setDataButton.onClick(() => {
      this.autocompletes.forEach(autocomplete => autocomplete.setData(NEW_DATA))
    })
  }

  bindSetValueButton() {
    const setValueButton = this.view.getComponent('setValueButton')
    setValueButton.onClick(() => {
      this.autocompletes.forEach(autocomplete => autocomplete.setValue('2'))
    })
  }

  bindClearValueButton() {
    const clearValueButton = this.view.getComponent('clearValueButton')
    clearValueButton.onClick(() => {
      this.autocompletes.forEach(autocomplete => autocomplete.clearValue())
    })
  }

  bindSetTitleButton() {
    const setTitleButton = this.view.getComponent('setTitleButton')
    setTitleButton.onClick(() => {
      this.autocompletes.forEach(autocomplete => autocomplete.setAttrs({ title: '{autocompletePlaceholder}' }))
    })
  }

  bindSetErrorButton() {
    const setErrorButton = this.view.getComponent('setErrorButton')
    setErrorButton.onClick(() => {
      this.autocompletes.forEach(autocomplete => autocomplete.setError('{autocompleteError}'))
    })
  }

  bindClearErrorButton() {
    const clearErrorButton = this.view.getComponent('clearErrorButton')
    clearErrorButton.onClick(() => {
      this.autocompletes.forEach(autocomplete => autocomplete.clearError())
    })
  }

  bindOnSelectCase() {
    this.autocompletes[0].onSelect(item => this.notifier.snackbar({ msg: item.value }))
  }

  bindOnChangeCase() {
    this.autocompletes[0].onChange({ func: text => this.notifier.snackbar({ msg: text }), debounce: 500 })
  }
}
