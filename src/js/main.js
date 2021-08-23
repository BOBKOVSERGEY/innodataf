// enable strict mode
'use strict';
document.addEventListener('DOMContentLoaded', () => {
    
    var swiper = new Swiper(".about-page__team", {
        slidesPerView: 3,
        spaceBetween: 30,
        
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
    });
    /*
    * slidesPerView: 3,
        spaceBetween: 30,
        slidesPerGroup: 3,
        loop: true,
        loopFillGroupWithBlank: true,
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },*/
    
    const preloader = document.getElementById("preloader");
   if(preloader) {
       setInterval(function () {
           preloader.style.opacity = '0';
           //preloader.style.display = 'none';
           preloader.addEventListener('transitionend', () => preloader.remove());
       }, 200);
   }
   
    const elements = {
        navBar: document.querySelector('.navbar'),
        navBarMenu: document.querySelector('.navbar__nav'),
        navBarBurger: document.querySelector('.navbar__burger'),
        navBarChevron: document.querySelectorAll('.navbar__nav-dropdown-chevron'),
    };
    // mobile menu expand
    elements.navBarChevron.forEach((btn) => {
        btn.addEventListener("click", () => {
            btn.classList.toggle("open");
        });
    });
    const body = document.querySelector('body');
    if(body) {
        body.classList.remove('preload');
    }
    
    function headerStyle() {
        const elBtnToTop = document.querySelector('.scroll-top');
        window.addEventListener('scroll', function () {
            //console.log(pageYOffset);
            if(pageYOffset >= 110) {
                elBtnToTop.classList.add('open');
            } else {
                elBtnToTop.classList.remove('open');
            }
        })
    }
    headerStyle();
    if (elements.navBar) {
        window.addEventListener('scroll', function () {
            //console.log(pageYOffset);
            if(window.pageYOffset > elements.navBar.offsetTop) {
                elements.navBar.classList.add('scroll');
            } else {
                elements.navBar.classList.remove('scroll');
            }
        })
    }
    
    /*init smooth scroll*/
    const elsScrollTo = document.querySelectorAll("[data-waypoint-to]");
    elsScrollTo.forEach(item => {
        item.addEventListener('click', function (e) {
            e.preventDefault()
            const targetId = '#'+item.getAttribute("data-waypoint-to");
            /*if( targetId) {
                document.querySelector(targetId).scrollIntoView({behavior:"smooth"});
            }*/
            if( targetId) {
                const targetPosition = document.querySelector(targetId).offsetTop;
                const startPosition = window.pageYOffset;
                const distance = targetPosition - startPosition;
                const duration = 1000;
                let start = null;
                window.requestAnimationFrame(step);
                function step(timestamp) {
                    if (!start) start = timestamp;
                    const progress = timestamp - start;
                    window.scrollTo(0, easeInOutQuad(progress, startPosition, distance, duration));
                    if (progress < duration) window.requestAnimationFrame(step);
                }
            }
            
        })
    })
    function linear(t, b, c, d) {
        return c*t/d + b;
    }
    function easeInOutQuad(t, b, c, d) {
        t /= d/2;
        if (t < 1) return c/2*t*t + b;
        t--;
        return -c/2 * (t*(t-2) - 1) + b;
    }
    function easeInOutCubic(t, b, c, d) {
        t /= d/2;
        if (t < 1) return c/2*t*t*t + b;
        t -= 2;
        return c/2*(t*t*t + 2) + b;
    }
    /*end init smooth scroll*/
    
    /**menu**/
    
    const showMenu = (burger, nav)=>{
        if(burger && nav){
            burger.addEventListener('click', (e)=>{
                nav.classList.toggle('show');
                burger.classList.toggle('active');
                e.stopPropagation();
            })
        }
    };
    showMenu(elements.navBarBurger,elements.navBarMenu);
    if (elements.navBarMenu) {
        body.addEventListener('click', function (e) {
            if (!e.target.closest('.navbar__nav')) {
                elements.navBarMenu.classList.remove('show')
                elements.navBarBurger.classList.remove('active')
            }
        })
    }
    /**end menu**/
    
    
    
});
