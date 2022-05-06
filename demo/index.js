import BloodyParallax from "../index.js";


window.onload = () => {
    //SPHERES GENERATION
    for(let i = 0; i < 300; i++){
        const wrapper = document.createElement("div");
        wrapper.classList.add("bubble");
        const inner = document.createElement("div");
        wrapper.append(inner);

        const zIndex = Math.random();
        const size = Math.random() * 1.7 + 0.1;
        const y = document.body.clientHeight * 2 * Math.random() - document.body.clientHeight/2 - 50;
        const x = window.innerWidth * 2 * Math.random() - window.innerWidth/2 - 50;

        wrapper.style.top = `${y}px`;
        wrapper.style.left = `${x}px`;
        wrapper.style.zIndex = `${Math.floor(zIndex * 100)}`;
        
        inner.style.background = `radial-gradient(rgba(255,0,43,${zIndex}), black 50px) no-repeat 10px -10px, black`;
        inner.style.transform = `scale(${size})`;


        wrapper.setAttribute("data-depth",zIndex);
        document.body.append(wrapper);
    }
    setTimeout(()=>{
        const parallax = new BloodyParallax({mouseIntensity: 0, scrollIntensity: 0.1, damping: 0.1});
    },10);


}