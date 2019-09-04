class BottomSheetWidget {
  onCreate({ view, notifier }) {
    this.notifier = notifier
    this.view = view

    this.bindAppbar()
    this.bindDocLabel()
    this.bindBottomSheet()
    this.bindScreenRadioGroup()
    this.bindButtons()
  }

  bindAppbar() {
    const appbar = this.view.getComponent('AppbarBlock')
    appbar.onLeftIconClick(() => this.navigator.pop())
    appbar.setAttrs({ title: 'Bottomsheet' })
  }

  bindDocLabel() {
    const openDocLabel = this.view.getComponent('openDocLabel')
    openDocLabel.onClick(() => this.notifier.snackbar({ msg: 'Open link WIP' }))
  }

  bindBottomSheet() {
    this.bottomSheet = this.view.getComponent('bottomSheet')
  }

  bindScreenRadioGroup() {
    const screenRadioGroup = this.view.getComponent('screenRadioGroup')
    screenRadioGroup.onSelect(item => {
      this.bottomSheet.setAttrs({ screen: item.value })
    })
  }

  bindButtons() {
    const openButton = this.view.getComponent('openButton')
    openButton.onClick(() => this.bottomSheet.open())

    const open2Button = this.view.getComponent('open2Button')
    open2Button.onClick(() => this.bottomSheet.open(2))

    const open3Button = this.view.getComponent('open3Button')
    open3Button.onClick(() => this.bottomSheet.open(3))

    const closeButton = this.view.getComponent('closeButton')
    closeButton.onClick(() => this.bottomSheet.close())
  }
}
