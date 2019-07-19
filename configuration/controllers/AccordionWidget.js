class AccordionWidget {
  onCreate({ view, navigator, notifier }) {
    this.view = view
    this.notifier = notifier
    this.navigator = navigator

    this.bindAppbar()
    this.bindDocLabel()
    this.bindAccordion()
    this.bindVisibilityCheckbox()
    this.bindReadOnlyCheckbox()
    this.bindExpandButton()
    this.bindCollapseButton()
    this.bindToggleButton()
    this.bindTitleRadioGroup()
    this.bindIconRadioGroup()
  }

  bindAppbar() {
    const appbar = this.view.getComponent('AppbarBlock')
    appbar.onLeftIconClick(() => this.navigator.pop())
    appbar.setAttrs({ title: 'Accordion' })
  }

  bindDocLabel() {
    const openDocLabel = this.view.getComponent('openDocLabel')
    openDocLabel.onClick(() => this.notifier.snackbar({ msg: 'Open link WIP' }))
  }

  bindAccordion() {
    this.accordion = this.view.getComponent('simpleAccordion')
    const contentLabel = this.view.getComponent('simpleAccordionContent')
    this.accordion.onChange(expanded => {
      if (expanded) {
        contentLabel.setText(JSON.stringify(this.accordion.getAttrs(), null, 2))
      }
      this.accordion.setAttrs({
        rightIcon: {
          kind: 'icon',
          color: expanded ? '#fafafa' : '#607D8B',
          icon: expanded ? 'chevron-up' : 'chevron-down',
          size: 30
        }
      })
    })
  }

  bindVisibilityCheckbox() {
    const visibilityCheckbox = this.view.getComponent('visibilityCheckbox')
    visibilityCheckbox.onChange(value => {
      this.accordion.setAttrs({ visibility: value })
    })
  }

  bindReadOnlyCheckbox() {
    const isReadOnlyCheckbox = this.view.getComponent('isReadOnlyCheckbox')
    isReadOnlyCheckbox.onChange(value => {
      this.accordion.setAttrs({ readonly: value })
    })
  }

  bindExpandButton() {
    const expandButton = this.view.getComponent('expandButton')
    expandButton.onClick(() => {
      this.accordion.expand()
    })
  }

  bindCollapseButton() {
    const collapseButton = this.view.getComponent('collapseButton')
    collapseButton.onClick(() => {
      this.accordion.collapse()
    })
  }

  bindToggleButton() {
    const toggleButton = this.view.getComponent('toggleButton')
    toggleButton.onClick(() => {
      this.accordion.toggle()
    })
  }

  bindTitleRadioGroup() {
    const titleRadioGroup = this.view.getComponent('titleRadioGroup')
    titleRadioGroup.onSelect(item => {
      this.accordion.setAttrs({ title: item.value })
    })
  }

  bindIconRadioGroup() {
    const iconRadioGroup = this.view.getComponent('iconRadioGroup')
    iconRadioGroup.onSelect(item => {
      this.accordion.setAttrs({ leftIcon: item.value })
    })
  }
}
