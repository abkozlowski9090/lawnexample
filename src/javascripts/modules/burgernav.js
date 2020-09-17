

export default class BurgerNav {
  constructor(el) {

    el.addEventListener('click', (e) => {
      e.preventDefault()
      document.body.classList.toggle('nav-open')
    })

  }
}
