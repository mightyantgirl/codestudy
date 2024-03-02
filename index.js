
let body = document.querySelector('body');
let h1 = document.querySelector('h1');
let input = document.querySelector('input');

let Color = {
    mainColor: function(color){
      let main = document.querySelectorAll('.main');
      for (let i = 0; i < main.length; i++){
        main[i].style.color = color;
    }
  },
    listColor: function(color){
      let alist = document.querySelectorAll('a');
      for (let i = 0; i < alist.length; i++){
        alist[i].style.color = color;
    }
  },
    titleColor: function(color){
      let subtitle = document.querySelectorAll('.sub_title_style');
      for (let i = 0; i < subtitle.length; i++){
        subtitle[i].style.color = color;
    }
  },
    menuColor: function(color1, color2){
      let menu = document.querySelectorAll('.menu');
      for (let i = 0; i < menu.length; i++){
        menu[i].style.backgroundColor = color1;
        menu[i].style.color = color2;
    }
  },
    button: function(button, color1, color2, value){
      button.style.backgroundColor = color1;
      button.style.color = color2;
      button.value = value;  
  },
    body: function(color1, color2){
      body.style.backgroundColor = color1;
      h1.style.color = color2;
  }
}


function night_button(button){
  if(button.value === '야간모드'){
    Color.body('#1e1e1e', '#f3f3f3');
    Color.button(button, '#242424', '#a7a7a7', '주간모드');
    Color.mainColor('#f3f3f3');
    Color.listColor('#a7a7a7');
    Color.titleColor('#f3f3f3');
    Color.menuColor('#242424', '#f3f3f3');

  } else {
    Color.body('#f3f3f3', '#3d3d3d');
    Color.button(button, '#e9e9e9', '#b1b1b1', '야간모드');
    Color.mainColor('#242424'); 
    Color.listColor('#3d3d3d');
    Color.titleColor('#242424');
    Color.menuColor('#fff', '#242424');
  }
};
