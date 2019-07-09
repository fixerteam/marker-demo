class AutocompletePopup {
  onCreate({ view }, { screenId }) {
    view.getComponent('screenContainer').changeNestedScreen(screenId)
  }
}
