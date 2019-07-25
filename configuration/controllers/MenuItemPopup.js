class MenuItemPopup {
  onCreate({ view, navigator }, { isUpdate, menuIds }) {
    this.view = view
    this.navigator = navigator

    this.bindTitle(isUpdate)
    if (isUpdate) {
      this.bindMenuItemDropdown(menuIds)
    }
    this.bindDialogButtons(isUpdate, menuIds)
    this.bindColorRadioGroup()
    this.bindDisplayTypeRadioGroup()
    this.bindIconRadioGroup()
  }

  bindTitle(isUpdate) {
    const popupTitle = this.view.getComponent('popupTitle')
    popupTitle.setText(isUpdate ? '{updateMenuItem}' : '{addMenuItem}')
  }

  bindMenuItemDropdown(menuIds) {
    this.menuItemsDropdown = this.view.getComponent('menuItemsDropdown')
    this.menuItemsDropdown.setData(menuIds.map(id => ({ id, value: id })))
    this.menuItemsDropdown.onSelect(() => this.menuItemsDropdown.clearError())
    this.menuItemsDropdown.setAttrs({ visibility: true })
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

  bindDialogButtons(isUpdate, menuIds) {
    const okButton = this.view.getComponent('okButton')
    okButton.onClick(() => {
      const icon = this.iconRadioGroup.getValue().value
      const displayType = this.displayTypeRadioGroup.getValue().value
      const color = this.colorRadioGroup.getValue().value

      let menuItemId = `item${menuIds.length}`
      if (isUpdate) {
        const updatableMenuItem = this.menuItemsDropdown.getValue()
        if (!updatableMenuItem) {
          this.menuItemsDropdown.setError('{selectValue}')
          return
        }
        menuItemId = updatableMenuItem.id
      }

      this.navigator.setScreenResult({
        id: 'AppbarWidget',
        params: {
          menuItem: {
            id: menuItemId,
            title: icon,
            displayType,
            icon,
            color
          },
          isUpdate
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
