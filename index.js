
let body = document.querySelector('body');
let h1 = document.querySelector('h1');
let input = document.querySelector('input');

function night_button(button){
  if(button.value === '야간모드'){
    body.style.backgroundColor = '#1e1e1e';
    h1.style.color = '#f3f3f3';
    button.style.backgroundColor = '#242424';
    button.style.color = '#a7a7a7';
    button.value = '주간모드';


    let menu = document.querySelectorAll('.menu');
    for (let i = 0; i < menu.length; i++){
      menu[i].style.backgroundColor = '#242424';
      menu[i].style.color = '#f3f3f3';
    }
    
    let main = document.querySelectorAll('.main');
    for (let i = 0; i < main.length; i++){
      main[i].style.color = '#f3f3f3';
    }

    let alist = document.querySelectorAll('a');
    for (let i = 0; i < alist.length; i++){
      alist[i].style.color = '#a7a7a7';
    }

    let subtitle = document.querySelectorAll('.sub_title_style');
    for (let i = 0; i < subtitle.length; i++){
      subtitle[i].style.color = '#f3f3f3';
    }

  } else {
    body.style.backgroundColor = '#f3f3f3';
    h1.style.color = '#3d3d3d';
    button.style.backgroundColor = '#e9e9e9';
    button.style.color = '#b1b1b1';
    button.value = '야간모드';


    let menu = document.querySelectorAll('.menu');
    for (let i = 0; i < menu.length; i++){
      menu[i].style.backgroundColor = '#fff';
      menu[i].style.color = '#242424';
    }

    let main = document.querySelectorAll('.main');
    for (let i = 0; i < main.length; i++){
      main[i].style.color = '#242424';
    }

    let alist = document.querySelectorAll('a');
    for (let i = 0; i < alist.length; i++){
      alist[i].style.color = '#3d3d3d';
    }

    let subtitle = document.querySelectorAll('.sub_title_style');
    for (let i = 0; i < subtitle.length; i++){
      subtitle[i].style.color = '#242424';
    }
  }
};
