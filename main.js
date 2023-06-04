
let wrap = document.querySelector('.wrapper');
let bgImg = document.getElementById('bg-img');
let adivceId =document.getElementById('advice-id');
let text = document.getElementById('text');
let btn = document.querySelector('.btn');
let search = document.querySelector('.search');

let xMove = 0
    yMove = 0

window.addEventListener( 'mousemove', (e)=>{
    xMove = e.clientX - window.innerWidth / 2;
    yMove = e.clientY - window.innerHeight / 2;
    let xSpeed = bgImg.dataset.xspeed;  
    bgImg.style.transform =` translateX(${xMove * xSpeed}px) translateY(${yMove * xSpeed}px)`
})


btn.addEventListener('click', () =>{
    fetch('https://api.adviceslip.com/advice')
    .then((re) => re.json())
    .then((data) => {
        console.log(data.slip)
        adivceId.innerText = `${data.slip.id}-`;
        text.innerText = `${data.slip.advice}`
    })
})

search.addEventListener('keydown', (e) =>{
    if(e.keyCode === 13){
        fetch(`https://api.adviceslip.com/advice/search/${search.value}`)
            .then((re) => re.json())
            .then((data) => {
                adivceId.innerText = `${data.slips[0].id}-`;
                text.innerText = `${data.slips[0].advice}`
            })
            .catch((error) =>{
                adivceId.innerText = '';
                text.innerText = "Sorry, no such information was found."
            })
        search.value = '';
    }
})