const DATETIMES = [
  {
    datetimeId: 'DF_datetime',
    attrsButtonId: 'DF_getAttrsButton',
    valueButtonId: 'DF_getValueButton',
    formattedValueButtonId: 'DF_getFormattedValueButton'
  },
  {
    datetimeId: 'TF_datetime',
    attrsButtonId: 'TF_getAttrsButton',
    valueButtonId: 'TF_getValueButton',
    formattedValueButtonId: 'TF_getFormattedValueButton'
  },
  {
    datetimeId: 'DTF_datetime',
    attrsButtonId: 'DTF_getAttrsButton',
    valueButtonId: 'DTF_getValueButton',
    formattedValueButtonId: 'DTF_getFormattedValueButton'
  },
  {
    datetimeId: 'DO_datetime',
    attrsButtonId: 'DO_getAttrsButton',
    valueButtonId: 'DO_getValueButton',
    formattedValueButtonId: 'DO_getFormattedValueButton'
  },
  {
    datetimeId: 'TO_datetime',
    attrsButtonId: 'TO_getAttrsButton',
    valueButtonId: 'TO_getValueButton',
    formattedValueButtonId: 'TO_getFormattedValueButton'
  },
  {
    datetimeId: 'DTO_datetime',
    attrsButtonId: 'DTO_getAttrsButton',
    valueButtonId: 'DTO_getValueButton',
    formattedValueButtonId: 'DTO_getFormattedValueButton'
  }
]

class DateTimeWidget {
  onCreate({ view, notifier, navigator, translation, logger }) {
    this.view = view
    this.notifier = notifier
    this.navigator = navigator
    this.translation = translation
    this.logger = logger

    this.bindAppbar()
    this.bindDocLabel()
    this.bindDatetimes()
    this.bindReadOnlyCheckbox()
    this.bindVisibilityCheckbox()
    this.bindErrorCheckbox()
    this.bindFormatRadioGroup()
    this.bindTitleRadioGroup()
    this.bindMaxDateRadioGroup()
    this.bindMinDateRadioGroup()
    this.bindOkLabelRadioGroup()
    this.bindCancelLabelRadioGroup()
    this.bindAddYearButton()
    this.bindSubYearButton()
    this.bindCleanValueButton()
    this.bindFirstDatetimeOnChange()
  }

  bindAppbar() {
    const appbar = this.view.getComponent('AppbarBlock')
    appbar.onLeftIconClick(() => this.navigator.pop())
    appbar.setAttrs({ title: 'Datetime' })
  }

  bindDocLabel() {
    const openDocLabel = this.view.getComponent('openDocLabel')
    openDocLabel.onClick(() => this.notifier.snackbar({ msg: 'Open link WIP' }))
  }

  bindDatetimes() {
    this.datetimes = DATETIMES.map(block => {
      const datetime = this.view.getComponent(block.datetimeId)

      const attrsButton = this.view.getComponent(block.attrsButtonId)
      attrsButton.onClick(() =>
        this.notifier.alert({
          title: this.translation.get('attributes'),
          msg: JSON.stringify(datetime.getAttrs(), null, 2),
          cancelable: true
        })
      )

      const valueButton = this.view.getComponent(block.valueButtonId)
      valueButton.onClick(() => {
        const datetimeValue = datetime.getValue()
        if (datetimeValue) {
          this.notifier.snackbar({ msg: datetimeValue.toString() })
        }
      })

      const formattedValueButton = this.view.getComponent(block.formattedValueButtonId)
      formattedValueButton.onClick(() => this.notifier.snackbar({ msg: datetime.getFormattedValue() }))

      return datetime
    })
  }

  bindReadOnlyCheckbox() {
    const isReadOnlyCheckbox = this.view.getComponent('isReadOnlyCheckbox')
    isReadOnlyCheckbox.onChange(value => {
      this.datetimes.forEach(datetime => datetime.setAttrs({ readonly: value }))
    })
  }

  bindVisibilityCheckbox() {
    const visibilityCheckbox = this.view.getComponent('visibilityCheckbox')
    visibilityCheckbox.onChange(value => {
      this.datetimes.forEach(datetime => datetime.setAttrs({ visibility: value }))
    })
  }

  bindErrorCheckbox() {
    const errorCheckbox = this.view.getComponent('errorCheckbox')
    errorCheckbox.onChange(value => {
      this.datetimes.forEach(datetime => {
        if (value) {
          datetime.setError('{datetimeError}')
        } else {
          datetime.clearError()
        }
      })
    })
  }

  bindFormatRadioGroup() {
    const formatRadioGroup = this.view.getComponent('formatRadioGroup')
    formatRadioGroup.setValue('0')
    formatRadioGroup.onSelect(item => this.datetimes.forEach(datetime => datetime.setAttrs({ format: item.value })))
  }

  bindTitleRadioGroup() {
    const titleRadioGroup = this.view.getComponent('titleRadioGroup')
    titleRadioGroup.setValue('1')
    titleRadioGroup.onSelect(item => this.datetimes.forEach(datetime => datetime.setAttrs({ title: item.value })))
  }

  bindMaxDateRadioGroup() {
    const maxDateRadioGroup = this.view.getComponent('maxDateRadioGroup')
    maxDateRadioGroup.setValue('1')
    maxDateRadioGroup.onSelect(item =>
      this.datetimes.forEach(datetime => datetime.setAttrs({ maxDate: item.value === 'now' ? new Date() : undefined }))
    )
  }

  bindMinDateRadioGroup() {
    const minDateRadioGroup = this.view.getComponent('minDateRadioGroup')
    minDateRadioGroup.setValue('1')
    minDateRadioGroup.onSelect(item =>
      this.datetimes.forEach(datetime =>
        datetime.setAttrs({ minDate: item.value === 'now' ? datetime.getValue() : undefined })
      )
    )
  }

  bindOkLabelRadioGroup() {
    const okLabelRadioGroup = this.view.getComponent('okLabelRadioGroup')
    okLabelRadioGroup.setValue('0')
    okLabelRadioGroup.onSelect(item =>
      this.datetimes.forEach(datetime =>
        datetime.setAttrs({ okLabel: item.value === 'default' ? '{okLabel}' : '{chooseDate}' })
      )
    )
  }

  bindCancelLabelRadioGroup() {
    const cancelLabelRadioGroup = this.view.getComponent('cancelLabelRadioGroup')
    cancelLabelRadioGroup.setValue('0')
    cancelLabelRadioGroup.onSelect(item =>
      this.datetimes.forEach(datetime =>
        datetime.setAttrs({ cancelLabel: item.value === 'default' ? '{cancelLabel}' : '{cancelDate}' })
      )
    )
  }

  bindAddYearButton() {
    const addYearButton = this.view.getComponent('addYearButton')
    addYearButton.onClick(() =>
      this.datetimes.forEach(datetime => {
        try {
          const currentValue = datetime.getValue()
          currentValue.setYear(currentValue.getFullYear() + 1)
          datetime.setAttrs({ value: currentValue })
        } catch (e) {
          datetime.setError('{enterDate}')
          this.logger.warn(e)
        }
      })
    )
  }

  bindSubYearButton() {
    const subYearButton = this.view.getComponent('subYearButton')
    subYearButton.onClick(() =>
      this.datetimes.forEach(datetime => {
        try {
          const currentValue = datetime.getValue()
          currentValue.setYear(currentValue.getFullYear() - 1)
          datetime.setAttrs({ value: currentValue })
        } catch (e) {
          datetime.setError('{enterDate}')
          this.logger.warn(e)
        }
      })
    )
  }

  bindCleanValueButton() {
    const cleanValueButton = this.view.getComponent('cleanValueButton')
    cleanValueButton.onClick(() => this.datetimes.forEach(datetime => datetime.setAttrs({ value: '' })))
  }

  bindFirstDatetimeOnChange() {
    const firstDatetime = this.datetimes[0]
    firstDatetime.onChange(() => this.notifier.snackbar({ msg: firstDatetime.getFormattedValue() }))
  }
}
