
const medias = document.querySelectorAll('.bulle');


window.addEventListener('load', () => {

    const TL = gsap.timeline({paused: true});

    TL
    .staggerFrom(medias, 1, {left: -200, ease: "power2.out"}, 0.3, '-=1');

    
    

    TL.play();
})