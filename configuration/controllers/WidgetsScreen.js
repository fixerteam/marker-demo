class WidgetsScreen {
  onCreate({ view, model, notifier, navigator, randomGenerator }) {
    this.view = view
    this.model = model
    this.notifier = notifier
    this.navigator = navigator
    this.randomGenerator = randomGenerator
    this.bindViews()
  }

  async bindViews() {
    const widgetsList = this.view.getComponent('WidgetsScreen')
    widgetsList.bindItem((data, item, position) => {
      item.title.setText(`#${position} ${data.name}`)
      item.isWebIcon.setAttrs({ visibility: data.compatibility.web })
      item.isAndroidIcon.setAttrs({ visibility: data.compatibility.android })
      item.isIosIcon.setAttrs({ visibility: data.compatibility.ios })
    })
    widgetsList.onItemClick(item => {
      if (typeof item.screen !== 'undefined') {
        this.navigator.push({ id: item.screen })
      } else {
        this.notifier.snackbar({ msg: `${item.name} widget WIP`, duration: 3000 })
      }
    })
    // widgetsList.setOnEndReached(() => {
    //   widgetsList.setRefreshState(true)
    //   setTimeout(() => {
    //     widgetsList.addData(
    //       [...Array(100).keys()].map(() => {
    //         const randomId = this.randomGenerator.randomId()
    //         return { name: randomId, compatibility: { ios: true, android: true, web: true }, id: randomId }
    //       })
    //     )
    //     widgetsList.setRefreshState(false)
    //   }, 2000)
    // })
    // widgetsList.setOnRefresh(async () => {
    //   widgetsList.setRefreshState(true)
    //   const widgetsListData = await this.model.get('WidgetsModel').allDocs()
    //   widgetsList.setData(widgetsListData)
    //   widgetsList.setRefreshState(false)
    // })

    const widgetsListData = await this.model.get('WidgetsModel').allDocs()
    widgetsList.setData(widgetsListData)
  }
}
