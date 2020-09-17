

export default class splash {
  constructor(el) {

    setTimeout(function(){
       document.body.classList.add('splash-anim');
     },
     1000);

     setTimeout(function(){
       document.getElementsByClassName("splash-screen")[0].style.display = "none"
      },
      1500);


  }
}
