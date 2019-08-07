class FakeDataProvider {
  onCreate({ randomGenerator }) {
    this.randomGenerator = randomGenerator
  }

  generateFakeData(count) {
    return [...Array(count).keys()].map(() => {
      const randomId = this.randomGenerator.randomId()
      return { value: randomId, id: randomId }
    })
  }

  async loadFlatData(count) {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(this.generateFakeData(count))
      }, 2000)
    })
  }

  async loadGroupedData(groupCount, itemCount) {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(
          [...Array(groupCount).keys()].map(() => {
            const randomId = this.randomGenerator.randomId()
            return { title: randomId, id: randomId, data: this.generateFakeData(itemCount) }
          })
        )
      }, 2000)
    })
  }
}
