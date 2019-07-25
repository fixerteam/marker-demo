class AppbarWidget {
  onCreate({ view, notifier, navigator, translation }) {
    this.view = view
    this.notifier = notifier
    this.navigator = navigator
    this.translation = translation

    this.bindAppbar()
    this.bindDocLabel()
    this.bindTestAppbar()
    this.bindVisibilityCheckbox()
    this.bindHasTabsCheckbox()
    this.bindIsSearchingCheckbox()
    this.bindCenterTitleCheckbox()
    this.bindHideSearchButton()
    this.bindShowSearchButton()
    this.bindGetAttrsButton()
    this.bindLeftIconRadioGroup()
    this.bindTitleRadioGroup()
    this.bindMenuIconRadioGroup()
    this.bindAddMenuItemButton()
    this.bindUpdateMenuItemButton()
    this.bindRemoveLastMenuItem()
  }

  onResume({ menuItem, isUpdate } = {}) {
    if (menuItem) {
      if (isUpdate) {
        this.appbar.updateMenuItem(menuItem)
      } else {
        this.appbar.addMenuItem(menuItem)
      }
    }
  }

  bindAppbar() {
    const appbar = this.view.getComponent('AppbarBlock')
    appbar.onLeftIconClick(() => this.navigator.pop())
    appbar.setAttrs({ title: 'Appbar' })
  }

  bindDocLabel() {
    const openDocLabel = this.view.getComponent('openDocLabel')
    openDocLabel.onClick(() => this.notifier.snackbar({ msg: 'Open link WIP' }))
  }

  bindTestAppbar() {
    this.appbar = this.view.getComponent('simpleAppbar')
    this.appbar.onLeftIconClick(() => this.notifier.snackbar({ msg: 'Left icon was clicked' }))
    this.appbar.onMenuItemClick(menuItemId => this.notifier.snackbar({ msg: `Menu item '${menuItemId}' was clicked` }))
    this.appbar.onChange({ func: text => this.notifier.snackbar({ msg: text }) })
    this.appbar.onSubmit(text => this.notifier.snackbar({ msg: `Submitted: ${text}` }))
    this.appbar.onClear(() => this.notifier.snackbar({ msg: 'Search was cleared' }))
  }

  bindVisibilityCheckbox() {
    const visibilityCheckbox = this.view.getComponent('visibilityCheckbox')
    visibilityCheckbox.onChange(value => {
      this.appbar.setAttrs({ visibility: value })
    })
  }

  bindHasTabsCheckbox() {
    const hasTabsCheckbox = this.view.getComponent('hasTabsCheckbox')
    hasTabsCheckbox.onChange(value => {
      this.appbar.setAttrs({ hasTabs: value })
    })
  }

  bindIsSearchingCheckbox() {
    const isSearchingCheckbox = this.view.getComponent('isSearchingCheckbox')
    isSearchingCheckbox.onChange(value => {
      this.appbar.setAttrs({ isSearching: value })
    })
  }

  bindCenterTitleCheckbox() {
    const isTitleCenteredCheckbox = this.view.getComponent('isTitleCenteredCheckbox')
    isTitleCenteredCheckbox.onChange(value => {
      const { styles } = this.appbar.getAttrs()
      styles.push({ title: [{ textAlign: value ? 'center' : 'left' }] })
      this.appbar.setAttrs({ styles })
    })
  }

  bindHideSearchButton() {
    const hideSearchButton = this.view.getComponent('hideSearchButton')
    hideSearchButton.onClick(() => {
      this.appbar.hideSearch()
    })
  }

  bindShowSearchButton() {
    const showSearchButton = this.view.getComponent('showSearchButton')
    showSearchButton.onClick(() => {
      this.appbar.showSearch()
    })
  }

  bindGetAttrsButton() {
    const getAttrsButton = this.view.getComponent('getAttrsButton')
    getAttrsButton.onClick(() => {
      this.notifier.alert({
        title: this.translation.get('attributes'),
        msg: JSON.stringify(this.appbar.getAttrs(), null, 2),
        cancelable: true
      })
    })
  }

  addMenuItemAction() {
    const menuItems = this.appbar.getAttrs().elements
    this.navigator.push({
      id: 'MenuItemPopup',
      isPopup: true,
      params: { menuIds: menuItems.map(item => item.id) }
    })
  }

  bindAddMenuItemButton() {
    const addItemButton = this.view.getComponent('addItemButton')
    addItemButton.onClick(() => this.addMenuItemAction())
  }

  bindUpdateMenuItemButton() {
    const updateItemButton = this.view.getComponent('updateItemButton')
    updateItemButton.onClick(() => {
      const menuItems = this.appbar.getAttrs().elements
      if (menuItems.length > 0) {
        this.navigator.push({
          id: 'MenuItemPopup',
          isPopup: true,
          params: { isUpdate: true, menuIds: menuItems.map(item => item.id) }
        })
      } else {
        this.addMenuItemAction()
      }
    })
  }

  bindRemoveLastMenuItem() {
    const removeItemButton = this.view.getComponent('removeItemButton')
    removeItemButton.onClick(() => {
      const menuItems = this.appbar.getAttrs().elements
      if (menuItems.length > 0) {
        const lastMenuItems = menuItems[menuItems.length - 1]
        this.appbar.removeMenuItem(lastMenuItems.id)
      }
    })
  }

  bindLeftIconRadioGroup() {
    const leftIconRadioGroup = this.view.getComponent('leftIconRadioGroup')
    leftIconRadioGroup.onSelect(item => {
      this.appbar.setAttrs({ leftIcon: item.value })
    })
    leftIconRadioGroup.setValue('2')
  }

  bindTitleRadioGroup() {
    const titleRadioGroup = this.view.getComponent('titleRadioGroup')
    titleRadioGroup.onSelect(item => {
      this.appbar.setAttrs({ title: item.value })
    })
    titleRadioGroup.setValue('2')
  }

  bindMenuIconRadioGroup() {
    const menuIconRadioGroup = this.view.getComponent('menuIconRadioGroup')
    menuIconRadioGroup.onSelect(item => {
      this.appbar.setAttrs({ menuIcon: item.value })
    })
    menuIconRadioGroup.setValue('2')
  }
}
