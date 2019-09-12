const HORIZONTAL_LIST_IDS = ['h_refreshable', 'h_paging', 'h_large', 'h_virtualizationOff']

class DefaultList {
  onCreate({ view, navigator, model, fakeDataProvider }, { id, title }) {
    this.view = view
    this.navigator = navigator
    this.model = model
    this.fakeDataProvider = fakeDataProvider

    this.bindAppbar(title)
    if (id === 'horizontal') {
      this.view.getComponent('horizontalLists').setAttrs({ visibility: true })
      HORIZONTAL_LIST_IDS.forEach(list => this.bindList(list))
    } else {
      this.bindList(id)
    }
  }

  bindAppbar(title) {
    const appbar = this.view.getComponent('AppbarBlock')
    appbar.onLeftIconClick(() => this.navigator.pop())
    appbar.setAttrs({ title })
    appbar.onMenuItemClick(id => {
      if (id === 'removeItems') {
        const listData = this.list.data // only for this case
        if (listData.length > 1) {
          this.list.removeData([listData[0].id, listData[1].id])
        }
      }
    })
  }

  async bindList(id) {
    this.list = this.view.getComponent(id)
    this.list.setAttrs({ visibility: true })
    switch (id) {
      case 'h_refreshable':
      case 'refreshable': {
        this.setListRefresh(this.list)
        break
      }
      case 'h_paging':
      case 'paging': {
        this.setListData(this.list)
        this.setListRefresh(this.list)
        this.setListPaging(this.list, 10)
        break
      }
      case 'h_large':
      case 'large': {
        this.setListData(this.list)
        this.setListRefresh(this.list)
        this.setListPaging(this.list, 50)
        break
      }
      case 'h_virtualizationOff':
      case 'virtualizationOff': {
        this.setListData(this.list)
        this.setListRefresh(this.list)
        this.setListPaging(this.list, 50)
        break
      }
      case 'separatedColumns': {
        this.setListData(this.list)
        this.setListRefresh(this.list)
        this.setListPaging(this.list, 50)
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
    list.setOnEndReached(async () => {
      list.setRefreshState(true)
      list.addData(await this.fakeDataProvider.loadFlatData(count))
      list.setRefreshState(false)
    })
  }
}
