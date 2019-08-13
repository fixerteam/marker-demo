const AUTOCOMPLETES = [
  {
    autocompleteId: 'FlatPopoverWithoutFloatingTitleAutocomplete',
    expandButtonId: 'FPWFT_isSuggestionsOpenedButton',
    popupButtonId: 'FPWFT_popupButton',
    attrsButtonId: 'FPWFT_getAttrsButton',
    focusButtonId: 'FPWFT_focusButton',
    blurButtonId: 'FPWFT_blurButton'
  },
  {
    autocompleteId: 'FlatFixedWithFloatingTitleAutocomplete',
    popupButtonId: 'FFFT_popupButton',
    attrsButtonId: 'FFFT_getAttrsButton',
    focusButtonId: 'FFFT_focusButton',
    blurButtonId: 'FFFT_blurButton'
  },
  {
    autocompleteId: 'OutlinedPopoverWithoutFloatingTitleAutocomplete',
    expandButtonId: 'OPWFT_isSuggestionsOpenedButton',
    popupButtonId: 'OPWFT_popupButton',
    attrsButtonId: 'OPWFT_getAttrsButton',
    focusButtonId: 'OPWFT_focusButton',
    blurButtonId: 'OPWFT_blurButton'
  },
  {
    autocompleteId: 'OutlinedFixedWithFloatingTitleAutocomplete',
    popupButtonId: 'OFFT_popupButton',
    attrsButtonId: 'OFFT_getAttrsButton',
    focusButtonId: 'OFFT_focusButton',
    blurButtonId: 'OFFT_blurButton'
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
    this.bindIsErrorCheckbox()
    this.bindValueCheckbox()
    this.bindReturnKeyTypeRadioGroup()
    this.bindOnSelectCase()
    this.bindOnChangeCase()
  }

  bindAppbar() {
    const appbar = this.view.getComponent('AppbarBlock')
    appbar.onLeftIconClick(() => this.navigator.pop())
    appbar.setAttrs({ title: 'Autocomplete' })
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

      const focusButton = this.view.getComponent(block.focusButtonId)
      focusButton.onClick(() => autocomplete.focus())

      const blurButton = this.view.getComponent(block.blurButtonId)
      blurButton.onClick(() => autocomplete.blur())

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

  bindIsErrorCheckbox() {
    const isErrorCheckbox = this.view.getComponent('isErrorCheckbox')
    isErrorCheckbox.onChange(value => {
      this.autocompletes.forEach(autocomplete => {
        if (value) {
          autocomplete.setError('{autocompleteError}')
        } else {
          autocomplete.clearError()
        }
      })
    })
  }

  bindValueCheckbox() {
    const valueCheckbox = this.view.getComponent('valueCheckbox')
    valueCheckbox.onChange(value => {
      this.autocompletes.forEach(autocomplete => {
        if (value) {
          autocomplete.setValue('2')
        } else {
          autocomplete.clearValue()
        }
      })
    })
  }

  bindReturnKeyTypeRadioGroup() {
    const returnKeyTypeRadioGroup = this.view.getComponent('returnKeyTypeRadioGroup')
    returnKeyTypeRadioGroup.onSelect(item => {
      this.autocompletes.forEach(autocomplete => autocomplete.setAttrs({ returnKeyType: item.value }))
    })
  }

  bindOnSelectCase() {
    this.autocompletes[0].onSelect(item => this.notifier.snackbar({ msg: item.value }))
  }

  bindOnChangeCase() {
    const firstAutocomplete = this.autocompletes[0]
    firstAutocomplete.onChange({ func: text => this.notifier.snackbar({ msg: text }), debounce: 500 })
    firstAutocomplete.onSubmit(text => this.notifier.snackbar({ msg: text }))
    firstAutocomplete.onFocus(() => this.notifier.snackbar({ msg: 'focused' }))
    firstAutocomplete.onBlur(() => this.notifier.snackbar({ msg: 'blured' }))
  }
}
