const CHECKBOXGROUPS = [
  {
    checkboxgroupId: 'verticalCheckboxgroupStart',
    attrsButtonId: 'VCS_getAttrsButton'
  },
  {
    checkboxgroupId: 'verticalCheckboxgroupEnd',
    attrsButtonId: 'VCE_getAttrsButton'
  },
  {
    checkboxgroupId: 'horizontalCheckboxgroupStart',
    attrsButtonId: 'HCS_getAttrsButton'
  },
  {
    checkboxgroupId: 'horizontalCheckboxgroupEnd',
    attrsButtonId: 'HCE_getAttrsButton'
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

class CheckboxGroupWidget {
  onCreate({ view, navigator, notifier, translation }) {
    this.view = view
    this.notifier = notifier
    this.navigator = navigator
    this.translation = translation

    this.bindAppbar()
    this.bindDocLabel()
    this.bindCheckboxgroups()
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
    appbar.setAttrs({ title: 'CheckboxGroup' })
  }

  bindDocLabel() {
    const openDocLabel = this.view.getComponent('openDocLabel')
    openDocLabel.onClick(() => this.notifier.snackbar({ msg: 'Open link WIP' }))
  }

  bindCheckboxgroups() {
    this.checkboxgroups = CHECKBOXGROUPS.map(block => {
      const checkboxgroup = this.view.getComponent(block.checkboxgroupId)

      const attrsButton = this.view.getComponent(block.attrsButtonId)
      attrsButton.onClick(() =>
        this.notifier.alert({
          title: this.translation.get('attributes'),
          msg: JSON.stringify(checkboxgroup.getAttrs(), null, 2),
          cancelable: true
        })
      )
      return checkboxgroup
    })
  }

  bindReadOnlyCheckbox() {
    const isReadOnlyCheckbox = this.view.getComponent('isReadOnlyCheckbox')
    isReadOnlyCheckbox.onChange(value => {
      this.checkboxgroups.forEach(checkboxgroup => checkboxgroup.setAttrs({ readonly: value }))
    })
  }

  bindVisibilityCheckbox() {
    const visibilityCheckbox = this.view.getComponent('visibilityCheckbox')
    visibilityCheckbox.onChange(value => {
      this.checkboxgroups.forEach(checkboxgroup => checkboxgroup.setAttrs({ visibility: value }))
    })
  }

  bindSetDataButton() {
    const setDataButton = this.view.getComponent('setDataButton')
    setDataButton.onClick(() => {
      this.checkboxgroups.forEach(checkboxgroup => checkboxgroup.setData(NEW_DATA))
    })
  }

  bindSetValueButton() {
    const setValueButton = this.view.getComponent('setValueButton')
    setValueButton.onClick(() => {
      this.checkboxgroups.forEach(checkboxgroup => checkboxgroup.setValue(['0', '2']))
    })
  }

  bindClearValueButton() {
    const clearValueButton = this.view.getComponent('clearValueButton')
    clearValueButton.onClick(() => {
      this.checkboxgroups.forEach(checkboxgroup => checkboxgroup.clearValue())
    })
  }

  bindOnSelectCase() {
    this.checkboxgroups[0].onSelect(values =>
      this.notifier.snackbar({
        msg: values.reduce((acc, value) => (acc ? `${acc}, ${value.id}` : `${value.id}`), '')
      })
    )
  }
}
