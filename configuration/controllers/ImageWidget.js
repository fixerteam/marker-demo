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
    this.bindFitRadioGroup()
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
    this.simpleImage = this.view.getComponent('simpleImage')
    this.clickableImage = this.view.getComponent('clickableImage')
    this.clickableImage.onClick(() =>
      this.notifier.alert({
        title: this.translation.get('attributes'),
        msg: JSON.stringify(this.clickableImage.getAttrs(), null, 2),
        cancelable: true
      })
    )
  }

  bindVisibilityCheckbox() {
    const visibilityCheckbox = this.view.getComponent('visibilityCheckbox')
    visibilityCheckbox.onChange(value => {
      this.simpleImage.setAttrs({ visibility: value })
      this.clickableImage.setAttrs({ visibility: value })
    })
  }

  bindValueRadioGroup() {
    const valueRadioGroup = this.view.getComponent('valueRadioGroup')
    valueRadioGroup.onSelect(item => {
      this.simpleImage.setImage(item.value)
      this.clickableImage.setImage(item.value)
    })
  }

  bindFitRadioGroup() {
    const fitRadioGroup = this.view.getComponent('fitRadioGroup')
    fitRadioGroup.onSelect(item => {
      this.simpleImage.setFit(item.value)
      this.clickableImage.setFit(item.value)
    })
  }
}
