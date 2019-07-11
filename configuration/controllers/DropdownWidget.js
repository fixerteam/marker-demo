const DROPDOWNS = [
  {
    dropdownId: 'FWFT_dropdown',
    expandButtonId: 'FWFT_isSuggestionsOpenedButton',
    attrsButtonId: 'FWFT_getAttrsButton'
  },
  {
    dropdownId: 'FFT_dropdown',
    expandButtonId: 'FFT_isSuggestionsOpenedButton',
    attrsButtonId: 'FFT_getAttrsButton'
  },
  {
    dropdownId: 'OWFT_dropdown',
    expandButtonId: 'OWFT_isSuggestionsOpenedButton',
    attrsButtonId: 'OWFT_getAttrsButton'
  },
  {
    dropdownId: 'OFT_dropdown',
    expandButtonId: 'OFT_isSuggestionsOpenedButton',
    attrsButtonId: 'OFT_getAttrsButton'
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

class DropdownWidget {
  onCreate({ view, navigator, notifier, translation }) {
    this.view = view
    this.notifier = notifier
    this.navigator = navigator
    this.translation = translation

    this.bindAppbar()
    this.bindDocLabel()
    this.bindDropdowns()
    this.bindReadOnlyCheckbox()
    this.bindVisibilityCheckbox()
    this.bindSetDataButton()
    this.bindSetValueButton()
    this.bindClearValueButton()
    this.bindSetTitleButton()
    this.bindSetErrorButton()
    this.bindClearErrorButton()
    this.bindOnSelectCase()
  }

  bindAppbar() {
    const appbar = this.view.getComponent('appbar')
    appbar.onLeftIconClick(() => this.navigator.pop())
  }

  bindDocLabel() {
    const openDocLabel = this.view.getComponent('openDocLabel')
    openDocLabel.onClick(() => this.notifier.snackbar({ msg: 'Open link WIP' }))
  }

  bindDropdowns() {
    this.dropdowns = DROPDOWNS.map(block => {
      const dropdown = this.view.getComponent(block.dropdownId)

      const attrsButton = this.view.getComponent(block.attrsButtonId)
      attrsButton.onClick(() =>
        this.notifier.alert({
          title: this.translation.get('attributes'),
          msg: JSON.stringify(dropdown.getAttrs(), null, 2),
          cancelable: true
        })
      )

      const isSuggestionsOpenedButton = this.view.getComponent(block.expandButtonId)
      isSuggestionsOpenedButton.onClick(() => {
        dropdown.setAttrs({ isSuggestionsOpened: true })
      })

      return dropdown
    })
  }

  bindReadOnlyCheckbox() {
    const isReadOnlyCheckbox = this.view.getComponent('isReadOnlyCheckbox')
    isReadOnlyCheckbox.onChange(value => {
      this.dropdowns.forEach(dropdown => dropdown.setAttrs({ readonly: value }))
    })
  }

  bindVisibilityCheckbox() {
    const visibilityCheckbox = this.view.getComponent('visibilityCheckbox')
    visibilityCheckbox.onChange(value => {
      this.dropdowns.forEach(dropdown => dropdown.setAttrs({ visibility: value }))
    })
  }

  bindSetDataButton() {
    const setDataButton = this.view.getComponent('setDataButton')
    setDataButton.onClick(() => {
      this.dropdowns.forEach(dropdown => dropdown.setData(NEW_DATA))
    })
  }

  bindSetValueButton() {
    const setValueButton = this.view.getComponent('setValueButton')
    setValueButton.onClick(() => {
      this.dropdowns.forEach(dropdown => dropdown.setValue('2'))
    })
  }

  bindClearValueButton() {
    const clearValueButton = this.view.getComponent('clearValueButton')
    clearValueButton.onClick(() => {
      this.dropdowns.forEach(dropdown => dropdown.clearValue())
    })
  }

  bindSetTitleButton() {
    const setTitleButton = this.view.getComponent('setTitleButton')
    setTitleButton.onClick(() => {
      this.dropdowns.forEach(dropdown => dropdown.setAttrs({ title: '{dropdownPlaceholder}' }))
    })
  }

  bindSetErrorButton() {
    const setErrorButton = this.view.getComponent('setErrorButton')
    setErrorButton.onClick(() => {
      this.dropdowns.forEach(dropdown => dropdown.setError('{dropdownError}'))
    })
  }

  bindClearErrorButton() {
    const clearErrorButton = this.view.getComponent('clearErrorButton')
    clearErrorButton.onClick(() => {
      this.dropdowns.forEach(dropdown => dropdown.clearError())
    })
  }

  bindOnSelectCase() {
    this.dropdowns[0].onSelect(item => this.notifier.snackbar({ msg: item.value }))
  }
}
