const INPUT_BLOCKS = [
  {
    inputId: 'S_input',
    valueButtonId: 'S_valueButton',
    attrsButtonId: 'S_getAttrsButton',
    focusButtonId: 'S_focusButton',
    blurButtonId: 'S_blurButton'
  },
  {
    inputId: 'FF_input',
    valueButtonId: 'FF_valueButton',
    attrsButtonId: 'FF_getAttrsButton',
    focusButtonId: 'FF_focusButton',
    blurButtonId: 'FF_blurButton'
  },
  {
    inputId: 'F_input',
    valueButtonId: 'F_valueButton',
    attrsButtonId: 'F_getAttrsButton',
    focusButtonId: 'F_focusButton',
    blurButtonId: 'F_blurButton'
  },
  {
    inputId: 'FC_input',
    valueButtonId: 'FC_valueButton',
    attrsButtonId: 'FC_getAttrsButton',
    focusButtonId: 'FC_focusButton',
    blurButtonId: 'FC_blurButton'
  },
  {
    inputId: 'FO_input',
    valueButtonId: 'FO_valueButton',
    attrsButtonId: 'FO_getAttrsButton',
    focusButtonId: 'FO_focusButton',
    blurButtonId: 'FO_blurButton'
  },
  {
    inputId: 'O_input',
    valueButtonId: 'O_valueButton',
    attrsButtonId: 'O_getAttrsButton',
    focusButtonId: 'O_focusButton',
    blurButtonId: 'O_blurButton'
  },
  {
    inputId: 'OC_input',
    valueButtonId: 'OC_valueButton',
    attrsButtonId: 'OC_getAttrsButton',
    focusButtonId: 'OC_focusButton',
    blurButtonId: 'OC_blurButton'
  }
]

class InputWidget {
  onCreate({ view, navigator, notifier, translation }) {
    this.view = view
    this.notifier = notifier
    this.navigator = navigator
    this.translation = translation

    this.bindAppbar()
    this.bindDocLabel()
    this.bindInputs()
    this.bindReadOnlyCheckbox()
    this.bindVisibilityCheckbox()
    this.bindIsErrorCheckbox()
    this.bindValueCheckbox()
    this.bindInputTypeRadioGroup()
    this.bindReturnKeyTypeRadioGroup()
    this.bindOnChangeCase()
    this.bindLinesButton()
  }

  bindAppbar() {
    const appbar = this.view.getComponent('AppbarBlock')
    appbar.onLeftIconClick(() => this.navigator.pop())
    appbar.setAttrs({ title: 'Input' })
  }

  bindDocLabel() {
    const openDocLabel = this.view.getComponent('openDocLabel')
    openDocLabel.onClick(() => this.notifier.snackbar({ msg: 'Open link WIP' }))
  }

  bindInputs() {
    this.inputs = INPUT_BLOCKS.map(block => {
      const input = this.view.getComponent(block.inputId)

      const valueButton = this.view.getComponent(block.valueButtonId)
      valueButton.onClick(() => this.notifier.snackbar({ msg: input.getValue() }))

      const attrsButton = this.view.getComponent(block.attrsButtonId)
      attrsButton.onClick(() =>
        this.notifier.alert({
          title: this.translation.get('attributes'),
          msg: JSON.stringify(input.getAttrs(), null, 2),
          cancelable: true
        })
      )

      const focusButton = this.view.getComponent(block.focusButtonId)
      focusButton.onClick(() => input.focus())

      const blurButton = this.view.getComponent(block.blurButtonId)
      blurButton.onClick(() => input.blur())

      return input
    })
  }

  bindReadOnlyCheckbox() {
    const isReadOnlyCheckbox = this.view.getComponent('isReadOnlyCheckbox')
    isReadOnlyCheckbox.onChange(value => {
      this.inputs.forEach(input => input.setAttrs({ readonly: value }))
    })
  }

  bindVisibilityCheckbox() {
    const visibilityCheckbox = this.view.getComponent('visibilityCheckbox')
    visibilityCheckbox.onChange(value => {
      this.inputs.forEach(input => input.setAttrs({ visibility: value }))
    })
  }

  bindIsErrorCheckbox() {
    const isErrorCheckbox = this.view.getComponent('isErrorCheckbox')
    isErrorCheckbox.onChange(value => {
      this.inputs.forEach(input => {
        if (value) {
          input.setError('{inputError}')
        } else {
          input.clearError()
        }
      })
    })
  }

  bindValueCheckbox() {
    const valueCheckbox = this.view.getComponent('valueCheckbox')
    valueCheckbox.onChange(value => {
      this.inputs.forEach(input => {
        if (value) {
          input.setValue('{inputValue}')
        } else {
          input.clearValue()
        }
      })
    })
  }

  bindInputTypeRadioGroup() {
    const inputTypeRadioGroup = this.view.getComponent('inputTypeRadioGroup')
    inputTypeRadioGroup.onSelect(item => {
      this.inputs.forEach(input =>
        input.setAttrs({ inputType: item.value, isRightIconEnabled: item.value === 'password' })
      )
    })
  }

  bindReturnKeyTypeRadioGroup() {
    const returnKeyTypeRadioGroup = this.view.getComponent('returnKeyTypeRadioGroup')
    returnKeyTypeRadioGroup.onSelect(item => {
      this.inputs.forEach(input => input.setAttrs({ returnKeyType: item.value }))
    })
  }

  bindOnChangeCase() {
    const firstInput = this.inputs[0]
    firstInput.onChange(text => this.notifier.snackbar({ msg: text }))
    firstInput.onSubmit(text => this.notifier.snackbar({ msg: text }))
    firstInput.onFocus(() => this.notifier.snackbar({ msg: 'focused' }))
    firstInput.onBlur(() => this.notifier.snackbar({ msg: 'blured' }))
  }

  bindLinesButton() {
    const addLineButton = this.view.getComponent('addLineButton')
    addLineButton.onClick(() => {
      this.inputs.forEach(input => {
        const { lines } = input.getAttrs()
        input.setAttrs({ lines: lines + 1 })
      })
    })

    const removeLineButton = this.view.getComponent('removeLineButton')
    removeLineButton.onClick(() => {
      this.inputs.forEach(input => {
        const { lines } = input.getAttrs()
        input.setAttrs({ lines: lines - 1 })
      })
    })
  }
}
