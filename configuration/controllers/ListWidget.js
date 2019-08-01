class ListWidget {
  onCreate({ view, navigator, notifier }) {
    this.view = view
    this.notifier = notifier
    this.navigator = navigator

    this.bindAppbar()
    this.bindDocLabel()
    this.bindList()
  }

  bindAppbar() {
    const appbar = this.view.getComponent('AppbarBlock')
    appbar.onLeftIconClick(() => this.navigator.pop())
    appbar.setAttrs({ title: 'List' })
  }

  bindDocLabel() {
    const openDocLabel = this.view.getComponent('openDocLabel')
    openDocLabel.onClick(() => this.notifier.snackbar({ msg: 'Open link WIP' }))
  }

  bindList() {
    const menuList = this.view.getComponent('menuList')
    menuList.bindItem((data, item, position) => {
      item.title.setText(`#${position} ${data.title}`)
    })
    menuList.onItemClick(item => {
      if (item.value) {
        this.navigator.push({ id: item.value })
      }
    })
  }
}
