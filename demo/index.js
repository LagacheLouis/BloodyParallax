import BloodyParallax from "../index.js";


window.onload = () => {
    const bubbles = document.getElementById("bubbles");
    //SPHERES GENERATION
    for(let i = 0; i < 100; i++){
        const wrapper = document.createElement("div");
        wrapper.classList.add("bubble");
        const inner = document.createElement("div");
        wrapper.append(inner);

        const zIndex = Math.random();
        const size = Math.random() * 1.7 + 0.1;
        const y = Math.random() * 100;
        const x = Math.random() * 100;

        wrapper.style.top = `${y}%`;
        wrapper.style.left = `${x}%`;
        wrapper.style.zIndex = `${Math.floor(zIndex * 100)}`;
        
        inner.style.background = `radial-gradient(rgba(255,0,43,${zIndex}), black 50px) no-repeat 10px -10px, black`;
        inner.style.transform = `scale(${size})`;


        wrapper.setAttribute("data-depth",zIndex);
        bubbles.append(wrapper);
    }
    setTimeout(()=>{
        const parallax = new BloodyParallax({mouseIntensity: 0.1, scrollIntensity: 0.2, damping: 0.1});
    },10);


}