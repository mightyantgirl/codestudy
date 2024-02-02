

let body = document.querySelector('body');
let h1 = document.querySelector('h1');
let input = document.querySelector('input');

function night_button(){
  if(this.value === '야간모드'){
    body.style.backgroundColor = '#1e1e1e';
    h1.style.color = '#f3f3f3';
    this.value = '주간모드';
    
    let menu = document.querySelectorAll('.menu');
    let i = 0;
    while(1 < menu.length){
        menu[i].style.backgroundColor = '#242424';
        menu[i].style.color = '#fff';
        i = i + 1;
    }
    } else {
    body.style.backgroundColor = '#f3f3f3';
    body.style.color = '#000000';
    h1.style.color = '#3d3d3d';
    this.value = '야간모드';
    
    let menu = document.querySelectorAll('.menu');
    let i = 0;
    while(1 < menu.length){
        menu[i].style.backgroundColor = '#fff';
        menu[i].style.color = '#242424';
        i = i + 1;
    }
    }
}
