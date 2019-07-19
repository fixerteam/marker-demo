const RADIOGROUPS = [
  {
    radiogroupId: 'verticalRadiogroupStart',
    attrsButtonId: 'VRS_getAttrsButton'
  },
  {
    radiogroupId: 'verticalRadiogroupEnd',
    attrsButtonId: 'VRE_getAttrsButton'
  },
  {
    radiogroupId: 'horizontalRadiogroupStart',
    attrsButtonId: 'HRS_getAttrsButton'
  },
  {
    radiogroupId: 'horizontalRadiogroupEnd',
    attrsButtonId: 'HRE_getAttrsButton'
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
  }
]

class RadioGroupWidget {
  onCreate({ view, navigator, notifier, translation }) {
    this.view = view
    this.notifier = notifier
    this.navigator = navigator
    this.translation = translation

    this.bindAppbar()
    this.bindDocLabel()
    this.bindRadiogroups()
    this.bindReadOnlyCheckbox()
    this.bindVisibilityCheckbox()
    this.bindSetDataButton()
    this.bindSetValueButton()
    this.bindClearValueButton()
    this.bindOnSelectCase()
  }

  bindAppbar() {
    const appbar = this.view.getComponent('AppbarBlock')
    appbar.onLeftIconClick(() => this.navigator.pop())
    appbar.setAttrs({ title: 'RadioGroup' })
  }

  bindDocLabel() {
    const openDocLabel = this.view.getComponent('openDocLabel')
    openDocLabel.onClick(() => this.notifier.snackbar({ msg: 'Open link WIP' }))
  }

  bindRadiogroups() {
    this.radiogroups = RADIOGROUPS.map(block => {
      const radiogroup = this.view.getComponent(block.radiogroupId)

      const attrsButton = this.view.getComponent(block.attrsButtonId)
      attrsButton.onClick(() =>
        this.notifier.alert({
          title: this.translation.get('attributes'),
          msg: JSON.stringify(radiogroup.getAttrs(), null, 2),
          cancelable: true
        })
      )
      return radiogroup
    })
  }

  bindReadOnlyCheckbox() {
    const isReadOnlyCheckbox = this.view.getComponent('isReadOnlyCheckbox')
    isReadOnlyCheckbox.onChange(value => {
      this.radiogroups.forEach(radiogroup => radiogroup.setAttrs({ readonly: value }))
    })
  }

  bindVisibilityCheckbox() {
    const visibilityCheckbox = this.view.getComponent('visibilityCheckbox')
    visibilityCheckbox.onChange(value => {
      this.radiogroups.forEach(radiogroup => radiogroup.setAttrs({ visibility: value }))
    })
  }

  bindSetDataButton() {
    const setDataButton = this.view.getComponent('setDataButton')
    setDataButton.onClick(() => {
      this.radiogroups.forEach(radiogroup => radiogroup.setData(NEW_DATA))
    })
  }

  bindSetValueButton() {
    const setValueButton = this.view.getComponent('setValueButton')
    setValueButton.onClick(() => {
      this.radiogroups.forEach(radiogroup => radiogroup.setValue('2'))
    })
  }

  bindClearValueButton() {
    const clearValueButton = this.view.getComponent('clearValueButton')
    clearValueButton.onClick(() => {
      this.radiogroups.forEach(radiogroup => radiogroup.clearValue())
    })
  }

  bindOnSelectCase() {
    this.radiogroups[0].onSelect(item => this.notifier.snackbar({ msg: item.value }))
  }
}
