const CHECKBOXES = [
  {
    checkboxId: 'onChangeCheckbox',
    attrsButtonId: 'CRS_getAttrsButton'
  },
  {
    checkboxId: 'customCheckbox',
    attrsButtonId: 'CSE_getAttrsButton'
  }
]

class CheckboxWidget {
  onCreate({ view, navigator, notifier, translation }) {
    this.view = view
    this.notifier = notifier
    this.navigator = navigator
    this.translation = translation

    this.bindAppbar()
    this.bindDocLabel()
    this.bindCheckboxes()
    this.bindReadOnlyCheckbox()
    this.bindVisibilityCheckbox()
    this.bindValueRadiogroup()
    this.bindTitleRadiogroup()
    this.bindOnChangeCase()
  }

  bindAppbar() {
    const appbar = this.view.getComponent('AppbarBlock')
    appbar.onLeftIconClick(() => this.navigator.pop())
    appbar.setAttrs({ title: 'Checkbox' })
  }

  bindDocLabel() {
    const openDocLabel = this.view.getComponent('openDocLabel')
    openDocLabel.onClick(() => this.notifier.snackbar({ msg: 'Open link WIP' }))
  }

  bindCheckboxes() {
    this.checkboxes = CHECKBOXES.map(block => {
      const checkbox = this.view.getComponent(block.checkboxId)

      const attrsButton = this.view.getComponent(block.attrsButtonId)
      attrsButton.onClick(() =>
        this.notifier.alert({
          title: this.translation.get('attributes'),
          msg: JSON.stringify(checkbox.getAttrs(), null, 2),
          cancelable: true
        })
      )
      return checkbox
    })
  }

  bindReadOnlyCheckbox() {
    const isReadOnlyCheckbox = this.view.getComponent('isReadOnlyCheckbox')
    isReadOnlyCheckbox.onChange(value => {
      this.checkboxes.forEach(checkbox => checkbox.setAttrs({ readonly: value }))
    })
  }

  bindVisibilityCheckbox() {
    const visibilityCheckbox = this.view.getComponent('visibilityCheckbox')
    visibilityCheckbox.onChange(value => {
      this.checkboxes.forEach(checkbox => checkbox.setAttrs({ visibility: value }))
    })
  }

  bindValueRadiogroup() {
    const valueRadioGroup = this.view.getComponent('valueRadioGroup')
    valueRadioGroup.onSelect(item => this.checkboxes.forEach(checkbox => checkbox.setAttrs({ value: item.value })))
  }

  bindTitleRadiogroup() {
    const titleRadioGroup = this.view.getComponent('titleRadioGroup')
    titleRadioGroup.onSelect(item => this.checkboxes.forEach(checkbox => checkbox.setAttrs({ title: item.value })))
  }

  bindOnChangeCase() {
    this.checkboxes[0].onChange(value => this.notifier.snackbar({ msg: String(value) }))
  }
}
