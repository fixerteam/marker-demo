/* eslint-disable class-methods-use-this */
class AccordionWidget {
  onCreate({ view, navigator, notifier }, data) {
    this.mainAccordion = view.getComponent('mainAccordion')
    const appbar = view.getComponent('appbar')
    appbar.onLeftIconClick(() => navigator.pop())
    this.accordionContent = view.getComponent('accordionContent')
    this.showAccordionAttrs()

    /** Эвенты кнопок * */
    const buttons = {
      title1: {
        title: 'titleAccordion'
      },
      title2: {
        title: 'titleAccordionWork'
      },
      visibilityTrue: {
        visibility: true
      },
      visibilityFalse: {
        visibility: false
      }
    }

    function eventsConstructor(componentId, buttonsConf) {
      for (const id in buttonsConf) {
        const dataComponent = view.getComponent(id)
        dataComponent.onClick(() => {
          console.log(`onClick button - ${id}`)
          if (typeof buttonsConf[id] === 'function') {
            view.getComponent(componentId).setAttrs(buttonsConf[id]())
          } else view.getComponent(componentId).setAttrs(buttonsConf[id])
        })
      }
    }

    eventsConstructor('mainAccordion', buttons)
    /** Эвенты кнопок * */

    // getAttrs
    view.getComponent('getAttrsBtn').onClick(() => this.showAccordionAttrs())

    // expand
    view.getComponent('expand').onClick(() => {
      console.log('onClick button - expand')
      this.mainAccordion.expand()
    })

    // collapse
    view.getComponent('collapse').onClick(() => {
      console.log('onClick button - collapse')
      this.mainAccordion.collapse()
    })

    // toggle
    view.getComponent('toggle').onClick(() => {
      console.log('onClick button - toggle')
      this.mainAccordion.toggle()
    })
  }

  showAccordionAttrs() {
    this.accordionContent.setText(`|${JSON.stringify(this.mainAccordion.getAttrs(), null, 4)}|`)
    this.mainAccordion.expand()
  }
}
