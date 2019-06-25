/* eslint-disable class-methods-use-this */
const ACCORDION_IDS = [{ id: 'simpleAccordion', contentId: 'simpleAccordionContent' }]

class AccordionWidget {
  onCreate({ view, navigator, notifier }) {
    this.view = view
    this.notifier = notifier
    this.navigator = navigator

    this.bindAppbar()
    this.bindDocLabel()
    this.bindAccordions()
    this.bindVisibility()
    this.bindExpandButton()
    this.bindCollapseButton()
    this.bindToggleButton()
    this.bindTitleRadioGroup()
  }

  bindAppbar() {
    const appbar = this.view.getComponent('appbar')
    appbar.onLeftIconClick(() => this.navigator.pop())
  }

  bindDocLabel() {
    const openDocLabel = this.view.getComponent('openDocLabel')
    openDocLabel.onClick(() => this.notifier.snackbar({ msg: 'Open link WIP' }))
  }

  bindAccordions() {
    this.accordions = ACCORDION_IDS.map(({ id, contentId }) => {
      const accordion = this.view.getComponent(id)
      const contentLabel = this.view.getComponent(contentId)
      contentLabel.setText(JSON.stringify(accordion.getAttrs(), null, 2))
      return accordion
    })
  }

  bindVisibility() {
    const visibilityCheckbox = this.view.getComponent('visibilityCheckbox')
    visibilityCheckbox.onChange(value => {
      this.accordions.forEach(accordion => accordion.setAttrs({ visibility: value }))
    })
  }

  bindExpandButton() {
    const expandButton = this.view.getComponent('expandButton')
    expandButton.onClick(() => {
      this.accordions.forEach(accordion => accordion.expand())
    })
  }

  bindCollapseButton() {
    const collapseButton = this.view.getComponent('collapseButton')
    collapseButton.onClick(() => {
      this.accordions.forEach(accordion => accordion.collapse())
    })
  }

  bindToggleButton() {
    const toggleButton = this.view.getComponent('toggleButton')
    toggleButton.onClick(() => {
      this.accordions.forEach(accordion => accordion.toggle())
    })
  }

  bindTitleRadioGroup() {
    const titleRadioGroup = this.view.getComponent('titleRadioGroup')
    titleRadioGroup.onClick(item => {
      this.accordions.forEach(accordion => accordion.setAttrs({ title: item.value }))
    })
  }
}
