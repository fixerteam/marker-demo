/* eslint-disable class-methods-use-this */
class ServicesScreen {
  onCreate({ view, model, notifier }) {
    this.view = view
    this.model = model
    this.notifier = notifier
    this.bindViews()
  }

  async bindViews() {
    const servicesList = this.view.getComponent('ServicesScreen')
    servicesList.bindItem((data, item) => {
      item.title.setText(data.name)
      item.isWebIcon.setAttrs({ visibility: data.compatibility.web })
      item.isAndroidIcon.setAttrs({ visibility: data.compatibility.android })
      item.isIosIcon.setAttrs({ visibility: data.compatibility.ios })
    })
    servicesList.onClick(item => this.notifier.snackbar({ msg: `${item.name} service WIP`, duration: 3000 }))

    const servicesListData = await this.model.get('ServicesModel').allDocs()
    servicesList.setData(servicesListData)
  }
}
