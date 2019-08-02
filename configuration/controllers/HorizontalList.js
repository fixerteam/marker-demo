const LIST_IDS = ['refreshable', 'paging', 'large', 'virtualizationOff']

class HorizontalList {
  onCreate({ view, navigator, model, randomGenerator }, { title }) {
    this.view = view
    this.navigator = navigator
    this.model = model
    this.randomGenerator = randomGenerator

    this.bindAppbar(title)
    LIST_IDS.forEach(list => this.bindList(list))
  }

  bindAppbar(title) {
    const appbar = this.view.getComponent('AppbarBlock')
    appbar.onLeftIconClick(() => this.navigator.pop())
    appbar.setAttrs({ title })
  }

  async bindList(id) {
    const list = this.view.getComponent(id)
    switch (id) {
      case 'refreshable': {
        this.setListRefresh(list)
        break
      }
      case 'paging': {
        this.setListData(list)
        this.setListRefresh(list)
        this.setListPaging(list, 10)
        break
      }
      case 'large': {
        this.setListData(list)
        this.setListRefresh(list)
        this.setListPaging(list, 50)
        break
      }
      case 'virtualizationOff': {
        this.setListData(list)
        this.setListRefresh(list)
        this.setListPaging(list, 50)
        break
      }
      default:
        break
    }
  }

  async loadData() {
    const data = await this.model.get('AutoModel').allDocs()
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
  }

  setListPaging(list, count) {
    list.setOnEndReached(() => {
      list.setRefreshState(true)
      setTimeout(() => {
        list.addData(this.generateFakeData(count))
        list.setRefreshState(false)
      }, 2000)
    })
  }

  generateFakeData(count) {
    return [...Array(count).keys()].map(() => {
      const randomId = this.randomGenerator.randomId()
      return { value: randomId, id: randomId }
    })
  }
}
