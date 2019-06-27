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
    this.bindIsSearchingCheckbox()
    this.bindCenterTitleCheckbox()
    this.bindHideSearchButton()
    this.bindShowSearchButton()
    this.bindGetAttrsButton()
    this.bindLeftIconRadioGroup()
    this.bindTitleRadioGroup()
    this.bindMenuIconRadioGroup()
  }

  bindAppbar() {
    const appbar = this.view.getComponent('appbar')
    appbar.onLeftIconClick(() => this.navigator.pop())
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
    this.appbar.setAttrs({
      menuIcon: 'dots-vertical',
      elements: [
        {
          title: '123',
          id: 'home',
          displayType: 'icon',
          icon: 'home',
          color: '#ababfd'
        },
        {
          title: 'home',
          id: 'home1',
          displayType: 'label',
          icon: 'adjust'
        },
        {
          title: 'home2',
          id: 'home2',
          displayType: 'icon_label',
          icon: 'adjust'
        },
        {
          title: 'Домой',
          id: 'home3',
          displayType: 'collapsed',
          icon: 'home',
          color: '#333'
        }
      ]
    })
  }

  bindVisibilityCheckbox() {
    const visibilityCheckbox = this.view.getComponent('visibilityCheckbox')
    visibilityCheckbox.onChange(value => {
      this.appbar.setAttrs({ visibility: value })
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

  bindLeftIconRadioGroup() {
    const leftIconRadioGroup = this.view.getComponent('leftIconRadioGroup')
    leftIconRadioGroup.onClick(item => {
      this.appbar.setAttrs({ leftIcon: item.value })
    })
  }

  bindTitleRadioGroup() {
    const titleRadioGroup = this.view.getComponent('titleRadioGroup')
    titleRadioGroup.onClick(item => {
      this.appbar.setAttrs({ title: item.value })
    })
  }

  bindMenuIconRadioGroup() {
    const menuIconRadioGroup = this.view.getComponent('menuIconRadioGroup')
    menuIconRadioGroup.onClick(item => {
      this.appbar.setAttrs({ menuIcon: item.value })
    })
  }
}
