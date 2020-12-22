const box = document.getElementById('box');
const left = document.getElementById('left');
const right = document.getElementById('right');
const reset = document.getElementById('reset');
let xDeg = 0;
let angleX = 0;
var hammer = new Hammer(box);

/* ------------------------------------------------ */

left.addEventListener('click', function(){
    angleX += 10;
    box.style.transform = 'rotate(' + angleX + 'deg)';
});

right.addEventListener('click', function(){
    angleX -= 10;
    box.style.transform = 'rotate(' + angleX + 'deg)';
});

reset.addEventListener('click', function(){
    angleX = 0;
    box.style.transform = 'rotate(' + angleX + 'deg)';
});

/* ------------------------------------------------- */
hammer.on('panleft', function(){
    angleX += 10;
	box.style.transform= 'rotate(' + angleX + 'deg)';
});

hammer.on('panright', function(){
    angleX -= 10;
	box.style.transform= 'rotate(' + angleX + 'deg)';
});
