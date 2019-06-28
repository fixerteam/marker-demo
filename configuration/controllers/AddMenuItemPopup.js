class AddMenuItemPopup {
  onCreate({ view, navigator }) {
    this.view = view
    this.navigator = navigator

    this.bindDialogButtons()
    this.bindColorRadioGroup()
    this.bindDisplayTypeRadioGroup()
    this.bindIconRadioGroup()
  }

  bindDisplayTypeRadioGroup() {
    this.displayTypeRadioGroup = this.view.getComponent('displayTypeRadioGroup')
    this.displayTypeRadioGroup.setValue('0')
  }

  bindColorRadioGroup() {
    this.colorRadioGroup = this.view.getComponent('colorRadioGroup')
    this.colorRadioGroup.setValue('2')
  }

  bindIconRadioGroup() {
    this.iconRadioGroup = this.view.getComponent('iconRadioGroup')
    this.iconRadioGroup.setValue('4')
  }

  bindDialogButtons() {
    const okButton = this.view.getComponent('okButton')
    okButton.onClick(() => {
      const icon = this.iconRadioGroup.getValue().value
      const displayType = this.displayTypeRadioGroup.getValue().value
      const color = this.colorRadioGroup.getValue().value

      this.navigator.setScreenResult({
        id: 'AppbarWidget',
        params: {
          menuItem: {
            title: icon,
            displayType,
            icon,
            color
          }
        }
      })
      this.navigator.pop()
    })

    const cancelButton = this.view.getComponent('cancelButton')
    cancelButton.onClick(() => {
      this.navigator.setScreenResult({ id: 'AppbarWidget' })
      this.navigator.pop()
    })
  }
}
