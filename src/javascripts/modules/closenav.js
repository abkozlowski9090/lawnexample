

export default class closenav {
  constructor(el) {
    el.addEventListener('click', (e) => {
      document.body.classList.toggle('nav-open')
    })

  }
}
