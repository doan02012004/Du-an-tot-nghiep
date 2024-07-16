//---------------------------------------HOME PAGE -------------------------------------
// icon-menu
let subTops = document.querySelectorAll('.sub-top')
let subMenus = document.querySelectorAll('.sub-menu')
subTops.forEach((subTop, index) => {
  subTop.addEventListener('click', () => {
    subMenus.forEach((subMenu, i) => {
      if (index != i) {
        subMenu.classList.add('hidden')
        subMenu.classList.remove('block')
      }
    })
    subMenus[index].classList.toggle('hidden')
    subMenus[index].classList.toggle('block')
  })
})


//mini cart
let open = document.querySelector('.open-mini-cart')
let close = document.querySelector('.close-mini-cart')
let miniCart = document.querySelector('.mini-cart')
open.addEventListener('click', () => {
  miniCart.style.right = '0';
  miniCart.style.opacity = '1'
})
close.addEventListener('click', () => {
  miniCart.style.right = '-100%';
  miniCart.style.opacity = '0'
})

// responsive navbar
let open_menu = document.querySelector('.open-menu')
let close_menu = document.querySelector('.close-menu')
let menu = document.querySelector('.menu')
open_menu.addEventListener('click', () => {
  menu.classList.remove('hidden');
  menu.style.opacity = '1'
})
close_menu.addEventListener('click', () => {
  menu.classList.add('hidden');
  menu.style.opacity = '0'
})
// search wrapper
let content_menu_bottom = document.querySelectorAll('.content-menu-bottom')
let menus_bottom_item = document.querySelectorAll('.menu-bottom-item')
menus_bottom_item.forEach((btn_menu_bottom, index) => {
  btn_menu_bottom.addEventListener('click', () => {
    content_menu_bottom.forEach((item, i) => {
      if (index != i) {
        item.classList.add('hidden')
        item.classList.remove('block')
      }
    })
    content_menu_bottom[index].classList.toggle('hidden')
    content_menu_bottom[index].classList.toggle('block')
  })
})
// footer
let footer_contents = document.querySelectorAll('.footer-infomation-content')
let footer_icons = document.querySelectorAll('.footer-infomation-icon ')
let footer_infors = document.querySelectorAll('.footer-information')
footer_infors.forEach((footer_infor, index) => {
  footer_infor.addEventListener('click', () => {
    footer_contents.forEach((item, i) => {
      if (index != i) {
        item.classList.add('hidden')
        item.classList.remove('block')
        footer_icons[i].classList.remove('active')
      }
    })
    footer_contents[index].classList.toggle('hidden')
    footer_contents[index].classList.toggle('block')
    footer_icons[index].classList.toggle('active')
  })
})

// banner
var swiper = new Swiper(".myBanner", {
  loop: true
});

// Arrival
var swiper = new Swiper(".myArrival", {
  slidesPerView: 5,
  spaceBetween: 30,
  navigation: {
    nextEl: ".arrival-next",
    prevEl: ".arrival-prev",
  },
  breakpoints: {
    576: {
      slidesPerView: 5,
      spaceBetween: 30,
    },
    0: {
      slidesPerView: 2,
      spaceBetween: 20,
    },
  },
});

// Add to cart of Card

let btns_card_addtocart = document.querySelectorAll('.card-add-to-cart')
let lists_card_size = document.querySelectorAll('.card-list-size')
btns_card_addtocart.forEach((btn, i) => {
  btn.addEventListener('click', () => {
    lists_card_size.forEach((item, index) => {
      if (index != i) {
        item.classList.add('hidden')
        btns_card_addtocart[index].classList.remove('active')
      }
    })
    btn.classList.toggle('active')
    lists_card_size[i].classList.toggle('hidden')
  })
})
// ----------------------------------products---------------------------//
document.getElementById('toggleSizeIcon').addEventListener('click', function() {
  var sizeOptions = document.getElementById('sizeOptions');
  sizeOptions.classList.toggle('hidden');
  var icon = this.querySelector('i');
  icon.classList.toggle('fa-plus');
  icon.classList.toggle('fa-minus');
});

document.getElementById('toggleColorIcon').addEventListener('click', function() {
  var colorOptions = document.getElementById('colorOptions');
  colorOptions.classList.toggle('hidden');
  var icon = this.querySelector('i');
  icon.classList.toggle('fa-plus');
  icon.classList.toggle('fa-minus');
});

document.getElementById('togglePriceIcon').addEventListener('click', function() {
  var priceOptions = document.getElementById('priceOptions');
  priceOptions.classList.toggle('hidden');
  var icon = this.querySelector('i');
  icon.classList.toggle('fa-plus');
  icon.classList.toggle('fa-minus');
});

document.querySelectorAll('.size-btn').forEach(function(button) {
  button.addEventListener('click', function() {
      document.querySelectorAll('.size-btn').forEach(function(btn) {
          btn.classList.remove('highlighted');
      });
      this.classList.add('highlighted');
  });
});

document.querySelectorAll('.color-btn').forEach(function(button) {
  button.addEventListener('click', function() {
      if (this.classList.contains('highlighted')) {
          this.classList.remove('highlighted');
          this.innerHTML = '';
      } else {
          this.classList.add('highlighted');
          if (this.style.backgroundColor === 'white') {
              this.innerHTML = '<i class="fa-solid fa-check absolute inset-0 flex items-center justify-center text-black"></i>';
          } else {
              this.innerHTML = '<i class="fa-solid fa-check absolute inset-0 flex items-center justify-center text-white"></i>';
          }
      }
  });
});

document.getElementById('priceRange').addEventListener('input', function() {
  var value = this.value;
  document.getElementById('minPrice').innerText = value + 'đ';
});

document.getElementById('resetBtn').addEventListener('click', function() {
  document.querySelectorAll('.size-btn').forEach(function(btn) {
      btn.classList.remove('highlighted');
  });
  document.querySelectorAll('.color-btn').forEach(function(btn) {
      btn.classList.remove('highlighted');
      btn.innerHTML = '';
  });
  document.getElementById('priceRange').value = 0;
  document.getElementById('minPrice').innerText = '0đ';
});

document.getElementById('applyBtn').addEventListener('click', function() {
  // Implement your filter logic here
  alert('Filters applied!');
});

function toggleDropdown() {
document.getElementById("myDropdown").classList.toggle("show");
}

// Close the dropdown if the user clicks outside of it
window.onclick = function(event) {
if (!event.target.matches('.dropbtn')) {
  var dropdowns = document.getElementsByClassName("dropdown-content");
  for (var i = 0; i < dropdowns.length; i++) {
    var openDropdown = dropdowns[i];
    if (openDropdown.classList.contains('show')) {
      openDropdown.classList.remove('show');
    }
  }
}
}

