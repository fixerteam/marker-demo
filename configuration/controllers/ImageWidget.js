const IMAGE_IDS = ['coverImage', 'containImage', 'fillImage', 'clickableImage']

class ImageWidget {
  onCreate({ view, navigator, notifier, translation }) {
    this.view = view
    this.notifier = notifier
    this.navigator = navigator
    this.translation = translation

    this.bindAppbar()
    this.bindDocLabel()
    this.bindImages()
    this.bindVisibilityCheckbox()
    this.bindValueRadioGroup()
  }

  bindAppbar() {
    const appbar = this.view.getComponent('AppbarBlock')
    appbar.onLeftIconClick(() => this.navigator.pop())
    appbar.setAttrs({ title: 'Image' })
  }

  bindDocLabel() {
    const openDocLabel = this.view.getComponent('openDocLabel')
    openDocLabel.onClick(() => this.notifier.snackbar({ msg: 'Open link WIP' }))
  }

  bindImages() {
    this.images = IMAGE_IDS.map(id => {
      const image = this.view.getComponent(id)
      if (id === 'clickableImage') {
        image.onClick(() =>
          this.notifier.alert({
            title: this.translation.get('attributes'),
            msg: JSON.stringify(image.getAttrs(), null, 2),
            cancelable: true
          })
        )
      }
      return image
    })
  }

  bindVisibilityCheckbox() {
    const visibilityCheckbox = this.view.getComponent('visibilityCheckbox')
    visibilityCheckbox.onChange(value => this.images.forEach(image => image.setAttrs({ visibility: value })))
  }

  bindValueRadioGroup() {
    const valueRadioGroup = this.view.getComponent('valueRadioGroup')
    valueRadioGroup.onSelect(item => this.images.forEach(image => image.setImage(item.value)))
  }
}
