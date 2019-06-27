class WidgetsScreen {
  onCreate({ view, model, notifier, navigator }) {
    this.view = view
    this.model = model
    this.notifier = notifier
    this.navigator = navigator
    this.bindViews()
  }

  async bindViews() {
    const widgetsList = this.view.getComponent('WidgetsScreen')
    widgetsList.bindItem((data, item) => {
      item.title.setText(data.name)
      item.isWebIcon.setAttrs({ visibility: data.compatibility.web })
      item.isAndroidIcon.setAttrs({ visibility: data.compatibility.android })
      item.isIosIcon.setAttrs({ visibility: data.compatibility.ios })
    })
    widgetsList.onClick(item => {
      if (typeof item.screen !== 'undefined') {
        this.navigator.push({ id: item.screen })
      } else {
        this.notifier.snackbar({ msg: `${item.name} widget WIP`, duration: 3000 })
      }
    })

    const widgetsListData = await this.model.get('WidgetsModel').allDocs()
    widgetsList.setData(widgetsListData)
  }
}
