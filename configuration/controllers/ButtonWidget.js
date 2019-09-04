const BUTTON_IDS = [
  'iconStyledButton',
  'iconDefaultButton',
  'textStyledButton',
  'textDefaultButton',
  'outlinedStyledButton',
  'outlinedDefaultButton',
  'containedStyledButton',
  'containedDefaultButton',
  'customStyledButton',
  'customDefaultButton'
]

class ButtonWidget {
  onCreate({ view, notifier, navigator, translation }) {
    this.view = view
    this.notifier = notifier
    this.navigator = navigator
    this.translation = translation

    this.bindAppbar()
    this.bindButtons()
    this.bindDocLabel()
    this.bindLoadingCheckbox()
    this.bindReadOnlyCheckbox()
    this.bindVisibilityCheckbox()
    this.bindIconRadioGroup()
    this.bindTitleRadioGroup()
  }

  onResume() {
    this.notifier.snackbar({ msg: 'Resumed' })
  }

  onPause() {
    this.notifier.snackbar({ msg: 'Paused' })
  }

  bindAppbar() {
    const appbar = this.view.getComponent('AppbarBlock')
    appbar.onLeftIconClick(() => this.navigator.pop())
    appbar.setAttrs({ title: 'Button' })
  }

  bindButtons() {
    this.buttons = BUTTON_IDS.map(id => {
      const button = this.view.getComponent(id)
      button.onClick(() =>
        this.notifier.alert({
          title: this.translation.get('attributes'),
          msg: JSON.stringify(button.getAttrs(), null, 2),
          cancelable: true
        })
      )
      return button
    })
  }

  bindDocLabel() {
    const openDocLabel = this.view.getComponent('openDocLabel')
    openDocLabel.onClick(() => this.notifier.snackbar({ msg: 'Open link WIP' }))
  }

  bindLoadingCheckbox() {
    const isLoadingCheckbox = this.view.getComponent('isLoadingCheckbox')
    isLoadingCheckbox.onChange(value => {
      this.buttons.forEach(button => button.setAttrs({ loading: value }))
    })
  }

  bindReadOnlyCheckbox() {
    const isReadOnlyCheckbox = this.view.getComponent('isReadOnlyCheckbox')
    isReadOnlyCheckbox.onChange(value => {
      this.buttons.forEach(button => button.setAttrs({ readonly: value }))
    })
  }

  bindVisibilityCheckbox() {
    const visibilityCheckbox = this.view.getComponent('visibilityCheckbox')
    visibilityCheckbox.onChange(value => {
      this.buttons.forEach(button => button.setAttrs({ visibility: value }))
    })
  }

  bindIconRadioGroup() {
    const iconRadioGroup = this.view.getComponent('iconRadioGroup')
    iconRadioGroup.onSelect(item => {
      this.buttons.forEach(button => button.setAttrs({ icon: item.value }))
    })
  }

  bindTitleRadioGroup() {
    const titleRadioGroup = this.view.getComponent('titleRadioGroup')
    titleRadioGroup.onSelect(item => {
      this.buttons.forEach(button => button.setAttrs({ title: item.value }))
    })
  }
}
