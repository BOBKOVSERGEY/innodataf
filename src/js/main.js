// enable strict mode
'use strict';
document.addEventListener('DOMContentLoaded', () => {
    let elMap = document.querySelector('#google-map');
    if (elMap) {
        let map;
        const popupInfoMap = document.querySelector('.rd-google-map__locations').innerHTML;
        let InfoObj = [];
        let centerCords = {
            lat:55.7518373,
            lng:48.7522174
        };
        const icons = {
            info: {
                icon: "dist/images/map-marker.svg",
            },
        };
        const markersOnMap = [
            {   popupInfo: popupInfoMap,
                LatLng: [
                    {
                        lat:centerCords.lat,
                        lng:centerCords.lng
                    }
                ],
                type: 'info'
            }
        ];
    
        function addMarkerInfo() {
            markersOnMap.forEach(item => {
                const marker = new google.maps.Marker({
                    position:item.LatLng[0],
                    icon: icons[item.type].icon,
                    map: map
                });
            
                const infowindow = new google.maps.InfoWindow({
                    content: item.popupInfo
                });
            
                marker.addListener('click', function () {
                    infowindow.open(map, marker)
                })
            })
        }
        function initMap() {
            map = new google.maps.Map(elMap, {
                zoom: 17,
                center: centerCords,
                scrollwheel: !1,
            
            });
            addMarkerInfo();
        }
        initMap();
    
    }
    
    let triggerTabList = [].slice.call(
        document.querySelectorAll('#tech button'),
        document.querySelectorAll('#completed-projects button'),
    )
    triggerTabList.forEach(function (triggerEl) {
        let tabTrigger = new bootstrap.Tab(triggerEl)
        
        triggerEl.addEventListener('click', function (event) {
            event.preventDefault()
            tabTrigger.show()
        })
    })
    
    const sliderTeam = new Swiper(".team", {
        slidesPerView: 3,
        spaceBetween: 30,
        navigation: {
            nextEl: ".team__btn-next",
            prevEl: ".team__btn-prev",
        },
        pagination: {
            el: ".team__pagination",
            clickable: true,
            //dynamicBullets: true,
        },
        breakpoints: {
            // when window width is >= 320px
            320: {
                slidesPerView: 1,
            },
            // when window width is >= 640px
            480: {
                slidesPerView: 2,
            },
            // when window width is >= 640px
            992: {
                slidesPerView: 3,
            }
        }
    });
    const sliderHistoryCompany = new Swiper(".history-company", {
        effect: "cube",
        grabCursor: true,
        cubeEffect: {
            shadow: true,
            slideShadows: true,
            shadowOffset: 20,
            shadowScale: 0.94,
        },
        navigation: {
            nextEl: ".history-company__btn-next",
            prevEl: ".history-company__btn-prev",
        },
        pagination: {
            el: ".history-company__pagination",
            clickable: true,
        },
    });
    const awardsSlider = new Swiper('.awards', {
        slidesPerView : 5,
        loop: true,
        speed: 1000,
        spaceBetween : 30,
        //grabCursor: true,
        navigation: {
            nextEl: ".awards__btn-next",
            prevEl: ".awards__btn-prev",
        },
        autoplay: {
            delay: 3000,
        },
        breakpoints: {
            
            
            991:{
                slidesPerView : 5
            },
            
            767:{
                slidesPerView : 3
                
            },
            
            575:{
                slidesPerView : 2
            },
            320: {
                slidesPerView: 1,
            },
        }
    });
    const partnersSlider = new Swiper('.partners__brand', {
        slidesPerView : 5,
        loop: true,
        speed: 3000,
        spaceBetween : 30,
        //grabCursor: true,
        
        autoplay: {
            delay: 5000,
        },
        breakpoints: {
            
            
            991:{
                slidesPerView : 5
            },
            
            767:{
                slidesPerView : 3
                
            },
            
            575:{
                slidesPerView : 2
            },
            320: {
                slidesPerView: 1,
            },
        }
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
           //preloader.addEventListener('transitionend', () => preloader.remove());
           preloader.addEventListener('transitionend', () => preloader.style.display = 'none');
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
