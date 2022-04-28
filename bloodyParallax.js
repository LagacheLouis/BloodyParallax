// Copyright (c) 2022 Lagache Louis.
// All rights reserved.
//
// This code is licensed under the MIT License.
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files(the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and / or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions :
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.

class BloodyParallax {
    constructor(scrollIntensity, mouseIntensity, smoothing) {
        this.scrollIntensity = scrollIntensity;
        this.mouseIntensity = mouseIntensity;
        this.smoothing = smoothing;
        this.mouse = { x: -1, y: -1 };
        this.scrollTop = window.scrollY + window.innerHeight/2;
        this.currentTop = window.scrollY + window.innerHeight/2;
        this.mouseDelta = { x: 0, y: 0 };
        this.currentDelta = { x: 0, y: 0 };

        this.queryElements();

        window.addEventListener("mousemove", (event) => {
            this.mouse = { x: event.clientX, y: event.clientY };
            let origin = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
            this.mouseDelta = { x: event.clientX - origin.x, y: event.clientY - origin.y };
        });
        window.addEventListener("scroll", (event) => {
            this.scrollTop = window.scrollY + window.innerHeight/2;
        });

        this.update();
    }

    getScrollMovement(element) {
        let rect = element.getBoundingClientRect();
        let posY = rect.top + rect.height/2 + window.scrollY - element._gsTransform.y;
        return (posY - this.currentTop) * this.scrollIntensity;
    }

    getMouseMovement() {

        return { x: -this.currentDelta.x * this.mouseIntensity, y: -this.currentDelta.y * this.mouseIntensity };
    }

    queryElements() {
        this.elements = document.querySelectorAll("[data-bloody-depth]");
        TweenMax.set("[data-depth]", { x: 0, y: 0, force3D: true });
    }

    update() {

        this.currentDelta.x += (this.mouseDelta.x - this.currentDelta.x) * this.smoothing;
        this.currentDelta.y += (this.mouseDelta.y - this.currentDelta.y) * this.smoothing;
        this.currentTop += (this.scrollTop - this.currentTop) * this.smoothing;

        let mOffset = this.getMouseMovement();
        this.elements.forEach((element) => {
            let sOffset = this.getScrollMovement(element);
            let depth = element.getAttribute("data-bloody-depth");
            let target = { x: mOffset.x * depth, y: mOffset.y * depth + sOffset * depth};
            TweenMax.set(element, { x: target.x + "px", y: target.y + "px", force3D: true });
        });

        requestAnimationFrame(() => {
            this.update();
        });
    }
}
