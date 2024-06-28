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