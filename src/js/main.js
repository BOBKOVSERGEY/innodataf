// enable strict mode
'use strict';
document.addEventListener('DOMContentLoaded', () => {
    const elements = {
        navBar: document.querySelector('.navbar'),
    };
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
    
    
    
    
    
});
