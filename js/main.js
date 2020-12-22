
//변수 선언
let wrapper = document.querySelector('.wrapper'), //전체 페이지를 감싸는 틀
    page = document.querySelectorAll('.page'), //각 페이지 요소
    indicator = document.getElementById('indicator'), //인디케이터를 담는 틀
    indicator_li = indicator.querySelectorAll('li'); //인디케이터 목록

let yDeg = 0,
    indicator_num = 1,
    indicator_length = page.length,
    w = page[0].offsetWidth,
    page_angle = 0;

//해머 객체 생성
const hammer = new Hammer(wrapper);

//페이지 초기화 함수 
function init_page() {  
    w = page[0].offsetWidth; //-->(1)

    //3D page 4면체 위치 정의  //-->(2)
    for (let i = 0; i < page.length; i++) {
        page[i].style.transform = 'rotateY(' + page_angle + 'deg) translateZ('+(w/2)+'px)';
        page_angle += 90;
    }

    //page wrapper 정면으로 초기화  //-->(3)
    wrapper.style.transform = 'translateZ(' + (-w/2) + 'px) rotateY(' + yDeg + 'deg)';
}

//인디케이트 초기화 함수
function init_indicator() {  
    //인디케이터 표시 //--> (1)
    for (let i = 0; i < indicator_length; i++) {
        indicator.innerHTML += '<li>' + (i+1) + '</li>';
    }

    indicator_li = indicator.querySelectorAll('li');
    change_page(indicator_num); //--> (2)
}

//페이지 전환 함수 
function change_page(inum) {  
    indicator_li[inum-1].setAttribute('class', 'active');  //--> (1)
    yDeg = -90 * (inum -1);  //--> (2)
    wrapper.style.transform = 'translateZ(' + (-w/2) + 'px) rotateY('+ yDeg + 'deg)';

    //인디케이터 표시  //--> (3)
    for (let i = 0; i < indicator_li.length; i++) {
        indicator_li[i].removeAttribute('class');        
    }
    indicator_li[inum-1].setAttribute('class', 'active');  //--> (4)
}

/* ---------------------------------------------------------------------------------------- */

init_page(); //-->(4)
init_indicator();

//이벤트 핸들러 
for (let i = 0; i < indicator_li.length; i++) {
    indicator_li[i].addEventListener('click', function(){
        indicator_num = parseInt(this.innerText);  //--> (1)
        change_page(indicator_num);  //--> (2)
    });
}

/* ---------------------------------------------------------------------------------------- */

//터치 swipe left
hammer.on('swifeleft', function(e){ // --> (1)
    //인디케이터(페이지) 이동 범위 내이면 
    if(indicator_num < indicator_length) {  // --> (2)
        page_vector = 1;  // --> (3)
    } else page_vector = 0;

    indicator_num += page_vector;  // --> (4)
    change_page(indicator_num);  // --> (5)
});

//터치 swipe right
hammer.on('swiferight', function(e){
    //인디케이터(페이지) 이동 범위 내이면 
    if(indicator_num > 1) {
        page_vector = -1;        
    } else page_vector = 0;

    indicator_num += page_vector;
    change_page(indicator_num);
});