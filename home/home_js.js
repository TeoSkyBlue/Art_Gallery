const observer=new IntersectionObserver((entries)=> {
    entries.forEach((entry) => {
        
        if (entry.isIntersecting){
            entry.target.classList.add('show');
        }
    });
});

const borderElements=document.querySelectorAll('.border');
borderElements.forEach((el)=> observer.observe(el));


// slider 

var slides = document.querySelectorAll('.slide');
var btns = document.querySelectorAll('.btn');
let currentSlide = 1;
let active_i = 1;

// Javascript for image slider manual navigation
var manualNav = function(manual){
  slides.forEach((slide) => {
    slide.classList.remove('active');

    btns.forEach((btn) => {
      btn.classList.remove('active');
    });
  });

  slides[manual].classList.add('active');
  btns[manual].classList.add('active');
}

btns.forEach((btn, i) => {
  btn.addEventListener("click", () => {
    manualNav(i);
    currentSlide = i;
    active_i = i;
  });
});

// Javascript for image slider autoplay navigation
var repeat = function(activeClass){
  let active = document.getElementsByClassName('active');

  var repeater = () => {
    setTimeout(function(){
      [...active].forEach((activeSlide) => {
        activeSlide.classList.remove('active');
      });

    slides[active_i].classList.add('active');
    btns[active_i].classList.add('active');
    active_i++;

    if(slides.length == active_i){
      active_i = 0;
    }
    if(active_i >= slides.length){
      return;
    }
    repeater();
  }, 5000);
  }
  repeater();
}
repeat();