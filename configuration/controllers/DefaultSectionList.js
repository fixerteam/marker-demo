class DefaultSectionList {
  onCreate({ view, navigator, model, randomGenerator }, { id, title }) {
    this.view = view
    this.navigator = navigator
    this.model = model
    this.randomGenerator = randomGenerator

    this.bindAppbar(title)
    this.bindList(id)
  }

  bindAppbar(title) {
    const appbar = this.view.getComponent('AppbarBlock')
    appbar.onLeftIconClick(() => this.navigator.pop())
    appbar.setAttrs({ title })
  }

  async bindList(id) {
    const list = this.view.getComponent(id)
    list.setAttrs({ visibility: true })
    switch (id) {
      case 'refreshable': {
        this.setListRefresh(list)
        break
      }
      case 'paging': {
        this.setListData(list)
        this.setListRefresh(list)
        this.setListPaging(list, 5)
        break
      }
      case 'large': {
        this.setListData(list)
        this.setListRefresh(list)
        this.setListPaging(list, 10)
        break
      }
      default:
        break
    }
  }

  async loadData() {
    const data = await this.model.get('AutoModelSection').allDocs()
    return data
  }

  setListRefresh(list) {
    list.setOnRefresh(async () => {
      list.setRefreshState(true)
      list.setData(await this.loadData())
      list.setRefreshState(false)
    })
  }

  async setListData(list) {
    list.setData(await this.loadData())
    list.bindItem((data, item, position) => {
      item.title.setText(`#${position} ${data.value}`)
    })
    list.bindHeader((data, item, position) => {
      item.title.setText(`#${position} ${data.title}`)
    })
  }

  setListPaging(list, count) {
    list.setOnEndReached(() => {
      list.setRefreshState(true)
      setTimeout(() => {
        list.addData(this.generateSectionData(count))
        list.setRefreshState(false)
      }, 2000)
    })
  }

  generateSectionData(count) {
    return [...Array(count).keys()].map(() => {
      const randomId = this.randomGenerator.randomId()
      return { title: randomId, id: randomId, data: this.generateFakeData(5) }
    })
  }

  generateFakeData(count) {
    return [...Array(count).keys()].map(() => {
      const randomId = this.randomGenerator.randomId()
      return { value: randomId, id: randomId }
    })
  }
}
