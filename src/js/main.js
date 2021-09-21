// enable strict mode
'use strict';

document.addEventListener('DOMContentLoaded', () => {
    
    //console.log(document.querySelector(".form").elements.fio);
    /*form validation*/
    class FormValidator {

        #error = 0;
        
        constructor(form, fields) {
            this.form = form
            this.fields = fields
        }
        
        initialize() {
            this.validateOnEntry()
            this.validateOnSubmit()
        }
    
        /*async getPosts() {
            try {
                const res = await fetch('/products/index');
                let posts = await res.json();
            
                posts.forEach(item => {
                    renderItem(item)
                });
            } catch (error) {
                console.log(error);
                alert('Something went wrong :(');
            }
        }*/
        
        validateOnSubmit() {
            let self = this
            
            this.form.addEventListener('submit', e => {
                e.preventDefault()
                this.#error = 0;
                self.fields.forEach(field => {
                    const input = this.form.elements[field];
                    if(input) {
                        self.validateFields(input)
                    }
                    
                })
    
    
                let formData = new FormData(this.form);
                if (this.#error === 0) {
                    const btnFormUploadFile = this.form.parentElement.querySelector('.form__upload-file');
                    const btnFormSend = this.form.parentElement.querySelector('.btn');
                    const popupActive = document.querySelector('.popup.popup-open');
                    const popupSuccess = document.querySelector('#successSend');
                    btnFormSend.classList.add('btn_point-none');
                    let response = fetch('/send-letter.php', {
                        method: 'POST',
                        body: formData
                    })
                        .then(response => {
                            console.log(response)
                            response.json()
                        })
                        .then(result => {
                            
                            if(btnFormUploadFile) {
                                btnFormUploadFile.innerHTML = 'Или прикрепить файл';
                            }
                            this.form.reset();
                            btnFormSend.classList.remove('btn_point-none');
                            setTimeout(function () {
                                popupOpen(popupSuccess);
                            }, 1000);
                            
                        })
                        .catch(err => {
                            console.error(err);
                            console.log('wrong');
                            btnFormSend.classList.remove('btn_point-none');
                        })
                    
                }
               
               
            })
        }
        
        validateOnEntry() {
            let self = this
            this.fields.forEach(field => {
                const input = this.form.elements[field]
                if(input) {
                    input.addEventListener('input', event => {
                        self.validateFields(input)
                    })
                }
                
            })
        }
        
        validateFields(field) {
            // Check presence of values
            if (field.value.trim() === "") {
                this.setStatus(field, `${field.nextElementSibling.innerText} не может быть пустым`, "error")
                this.#error++;
            } else if (field.type === "email") {
                const re = /\S+@\S+\.\S+/
                if (re.test(field.value)) {
                    this.setStatus(field, null, "success")
                } else {
                    this.setStatus(field, "Введите корректный email", "error")
                    this.#error++;
                }
            } else {
                this.setStatus(field, null, "success")
                
            }
          
           
            // Password confirmation edge case
            /*if (field.id === "password_confirmation") {
                const passwordField = this.form.querySelector('#password')
                
                if (field.value.trim() == "") {
                    this.setStatus(field, "Password confirmation required", "error")
                } else if (field.value != passwordField.value)  {
                    this.setStatus(field, "Password does not match", "error")
                } else {
                    this.setStatus(field, null, "success")
                }
            }*/
        }
        
        setStatus(field, message, status) {
            const successIcon = field.parentElement.querySelector('.icon-success')
            const errorIcon = field.parentElement.querySelector('.icon-error')
            const errorMessage = field.parentElement.querySelector('.error-message')
            
            if (status === "success") {
                if (errorIcon) { errorIcon.classList.add('hidden') }
                if (errorMessage) { errorMessage.innerText = "" }
                successIcon.classList.remove('hidden')
                field.classList.remove('input-error')
            }
            
            if (status === "error") {
                if (successIcon) { successIcon.classList.add('hidden') }
                field.parentElement.querySelector('.error-message').innerText = message
                errorIcon.classList.remove('hidden')
                field.classList.add('input-error')
            }
        }
    }
    
    const formOne = document.querySelector('#formOne')
    const fieldsFormOne = [
        "fio",
        "email",
        "company",
        "comment"
    ]
    if(formOne) {
        const validatorOneForm = new FormValidator(formOne, fieldsFormOne);
        validatorOneForm.initialize();
    }
    const formTwo = document.querySelector('#formTwo')
    const fieldsFormTwo = [
        "fio",
        "email",
        "company",
        "comment"
    ]
    if(formTwo) {
        const validatorTwoForm = new FormValidator(formTwo, fieldsFormTwo);
        validatorTwoForm.initialize();
    }
    const formThree = document.querySelector('#formThree')
    const fieldsFormThree = [
        "fio",
        "field_activity",
        "email",
        "company",
        "comment",
    ]
    if(formThree) {
        const validatorThreeForm = new FormValidator(formThree, fieldsFormThree);
        validatorThreeForm.initialize();
    }
    
    const formFour = document.querySelector('#formFour')
    const fieldsFormFour = [
        "fio",
        "email",
        "link",
        "phone",
    ]
    if(formFour) {
        const validatorFourForm = new FormValidator(formFour, fieldsFormFour);
        validatorFourForm.initialize();
    }
    
    const formFive = document.querySelector('#formFive')
    const fieldsFormFive = [
        "fio",
        "email",
        "link",
        "phone",
    ]
    if(formFive) {
        const validatorFiveForm = new FormValidator(formFive, fieldsFormFive);
        validatorFiveForm.initialize();
    }
    
    
    
    
    /*end form validation*/
    /**check policy **/
    const checkboxesPolicy = document.querySelectorAll('.js-policy');
    if(checkboxesPolicy) {
        checkboxesPolicy.forEach(item => {
            item.addEventListener('click', function () {
                const isChecked = item.checked;
                //console.log();
                let btnSend = item.parentNode.nextElementSibling.childNodes[1];
    
                if (!isChecked) {
                    if(btnSend) {
                        btnSend.setAttribute("disabled", "disabled");
                    }
                    
                } else {
                    if(btnSend) {
                        btnSend.removeAttribute("disabled");
                    }
                    
                }
            })
        })
    }
    /**end check policy**/
    /**form input type file**/
    let inputs = document.querySelectorAll( '.inputFile' );
    Array.prototype.forEach.call( inputs, function( input )
    {
        let label	 = input.nextElementSibling,
            labelVal = label.innerHTML;
        
        input.addEventListener( 'change', function( e )
        {
            let fileName = '';
            if( this.files && this.files.length > 1 )
                fileName = ( this.getAttribute( 'data-multiple-caption' ) || '' ).replace( '{count}', this.files.length );
            else
                fileName = e.target.value.split( '\\' ).pop();
            
            if( fileName )
                label.querySelector( 'span' ).innerHTML = fileName;
            else
                label.innerHTML = labelVal;
        });
    });
    
    
    /**end form input type file**/
    const siteTemplatePath = '/local/templates/innodata/';
    
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
                icon: siteTemplatePath + "dist/images/map-marker.svg",
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
    /*
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
    */
    
    /*bx-panel*/
    const bxPanel = document.querySelector('body #bx-panel');
    const header = document.querySelector('.header');
    if(bxPanel) {
        header.style.top = '40' + 'px';
    }
   
    /*end bx panel*/
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
    let swiperAnimation = new SwiperAnimation();
    const mainSlider = new Swiper('.slider-main', {
      
        //loop: true,
        speed: 1000,
        autoplay: {
            delay: 8000,
        },
        on: {
            init: function () {
                swiperAnimation.init(this).animate();
            },
            slideChange: function () {
                swiperAnimation.init(this).animate();
            }
        },
        /*effect: 'fade',
        fadeEffect: {
            crossFade: true
        },*/
    
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

    /** modal **/

    const popupLinks = document.querySelectorAll('.popup-link');
    const lockPadding = document.querySelectorAll('.lock-padding');

    body.classList.remove('preload');

    let unlock = true;

    const timeout = 800;

    if (popupLinks.length > 0) {
        for (let index = 0; index < popupLinks.length; index++) {
            const popupLink = popupLinks[index];
            popupLink.addEventListener('click', function (e) {
                const popupName = popupLink.getAttribute('data-modal').replace('#', '');
                console.log(popupName);
                const currentPopup = document.getElementById(popupName);
                popupOpen(currentPopup);
                e.preventDefault();
            })
        }
    }

    const popupCloseIcon = document.querySelectorAll('.popup__close-icon');
    if (popupCloseIcon.length > 0) {
        for (let index = 0; index < popupCloseIcon.length; index++) {
            const el = popupCloseIcon[index];
            el.addEventListener('click', function (e) {
                popupClose(el.closest('.popup'));
                e.preventDefault();
            })
        }
    }

    function popupOpen(currentPopup) {
        if (currentPopup && unlock) {
            const popupActive = document.querySelector('.popup.popup-open');
            if (popupActive) {
                popupClose(popupActive, false);
            } else {
                bodyLock();
            }
            currentPopup.classList.add('popup-open');
            currentPopup.addEventListener('click', function (e) {
                if (!e.target.closest('.popup__content')) {
                    popupClose(e.target.closest('.popup'))
                }
            })
        }
    }

    function popupClose(popupActive, doUnlock = true) {
        if (unlock) {
            popupActive.classList.remove('popup-open');
            if (doUnlock) {
                bodyUnLock();
            }
        }
    }

    function bodyLock() {
        const lockPaddingValue = window.innerWidth - document.querySelector('.layout').offsetWidth + 'px';
        //console.log(document.querySelector('.wrapper').offsetWidth);
        //console.log(document.querySelector('body').offsetWidth);
        if (lockPadding.length > 0) {
            for (let index = 0; index < lockPadding.length; index++) {
                const el = lockPadding[index];
                el.style.paddingRight = lockPaddingValue;
            }
        }


        body.style.paddingRight = lockPaddingValue;
        body.classList.add('lock');

        unlock = false;

        setTimeout(function () {
            unlock = true;
        }, timeout)
    }

    function bodyUnLock() {
        setTimeout(function () {
            if (lockPadding.length > 0 ) {
                for (let index = 0; index < lockPadding.length; index++) {
                    const el = lockPadding[index];
                    el.style.paddingRight = '0px';
                }
            }

            body.style.paddingRight = '0px';
            body.classList.remove('lock');
        }, timeout);

        unlock = false;

        setTimeout(function () {
            unlock = true;
        }, timeout)
    }

    document.addEventListener('keydown', function (e) {
        if (e.which === 27){
            const popupActive = document.querySelector('.popup.popup-open');
            if (popupActive) {
                popupClose(popupActive);
            }

        }
    });
    /** end modal**/
    
    /* header search*/
    const btnSearch = document.querySelector('.navbar-search__icon');
    const formSearch = document.querySelector('.navbar-search__form');
    const btnSearchClose = document.querySelector('.navbar-search__close');
    if(btnSearch) {
        btnSearch.addEventListener('click', function () {
            formSearch.classList.add('open');
        })
        body.addEventListener('click', function (e) {
            if (!e.target.closest('.navbar-search')) {
                formSearch.classList.remove('open');
            }
        })
        btnSearchClose.addEventListener('click', function () {
            formSearch.classList.remove('open');
        })
    }
    
   
    
    /*end header search*/
    
    /**load more*/
   
    
    /*const height = Math.max(
    document.body.scrollHeight, document.documentElement.scrollHeight,
    document.body.offsetHeight, document.documentElement.offsetHeight,
    document.body.clientHeight, document.documentElement.clientHeight
    );*/
    let load_more = false;
    function getPage() {
        return document.querySelector('body #ajax_next_page');
    }
    window.addEventListener('scroll', function () {
        let btn =  getPage();
        if(btn && !load_more) {
            let  url = btn.getAttribute('href');
            let offset_button = btn.offsetTop;
            if(window.pageYOffset >= offset_button - window.screen.height) {
                load_more = true;
                let id_product = 'Y';
                let data_body = "IS_AJAX=" + id_product;
                fetch(
                    url, {
                    method: "POST",
                    body: data_body,
                    headers:{"content-type": "application/x-www-form-urlencoded"}
                }).then(response =>{
                    //console.log(response);
                    response.text().then(text => {
                        btn.insertAdjacentHTML('beforebegin',text);
                        btn.remove();
                        load_more = false;
                    })
                })
            }
        }
    })
    /*window.addEventListener('scroll', function () {
        if(ajax_next_page && !load_more) {
            let  url = ajax_next_page.getAttribute('href');
            let offset_button = ajax_next_page.offsetTop;
            if(window.pageYOffset >= offset_button - window.screen.height) {
                console.log('++')
                load_more = true;
                fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json;charset=utf-8'
                    },
                    body: "inputs=" + JSON.stringify({IS_AJAX: 'Y'}),
                    
                }).then(response =>{
                    //console.log(response);
                    
                    response.text().then(text => {
                        // console.log(text);
                        ajax_next_page.insertAdjacentHTML('beforebegin',text);
                        //ajax_next_page.remove();
                        load_more = false;
                    })
                })
            }
        }
    })*/
    /**end load more*/
    
    
});
