// enable strict mode
'use strict';
document.addEventListener('DOMContentLoaded', () => {
    
    function Tabs() {
        let bindAll = function() {
            let menuElements = document.querySelectorAll('[data-tab]');
            for(let i = 0; i < menuElements.length ; i++) {
                menuElements[i].addEventListener('click', change, false);
            }
        }
    
        let clear = function() {
            let menuElements = document.querySelectorAll('[data-tab]');
            for(let i = 0; i < menuElements.length ; i++) {
                menuElements[i].classList.remove('active');
                let id = menuElements[i].getAttribute('data-tab');
                document.getElementById(id).classList.remove('active');
            }
        }
    
        let change = function(e) {
            clear();
            e.target.classList.add('active');
            let id = e.currentTarget.getAttribute('data-tab');
            document.getElementById(id).classList.add('active');
        }
        
        bindAll();
    }
    
    let connectTabs = new Tabs();
    
    let productBtnMinus = document.querySelectorAll('.ticket-offer__qty-minus');
    let productBtnPlus = document.querySelectorAll('.ticket-offer__qty-plus');
    let productInputQty = document.querySelectorAll('.ticket-offer__qty-input');
    
    if (productBtnMinus) {
        productBtnMinus.forEach(item => {
            item.addEventListener('click', function () {
                if (item.nextElementSibling.value >= 1) {
                    item.nextElementSibling.value = +item.nextElementSibling.value-1;
                }
                
            });
        })
        
    }
    if (productBtnPlus) {
        productBtnPlus.forEach(item => {
            item.addEventListener('click', function () {
                console.log(item.previousElementSibling)
                item.previousElementSibling.classList.add('active');
                item.previousElementSibling.value = +item.previousElementSibling.value+1;
            });
        })
        
    }
    
    productInputQty.forEach(item => {
        if (item.value > 0) {
            item.classList.add("active")
        }
    })
});
