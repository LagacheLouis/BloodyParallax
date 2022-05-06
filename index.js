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

export default class BloodyParallax {
    /**
     * @param {object} config { 
     *   {number} scrollIntensity : 0.1, 
     *   {number} mouseIntensity : 0.1, 
     *   {number} damping : 0.1, 
     *   {string} attribute : "data-depth"
     * }
     */
    constructor({ scrollIntensity, mouseIntensity, damping, attribute}) {
        this.scrollIntensity = scrollIntensity || .1;
        this.mouseIntensity = mouseIntensity || .1;
        this.damping = damping || .1;
        this.attribute = attribute || "data-depth";
        this.attributeTag = `[${this.attribute}]`;
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

        this._update();
    }

    _isElementInViewport (element) {
        const r = element.getBoundingClientRect();
        const top = r.top;
        const bottom = top + r.height;
        return (
            bottom >= 0 &&
            top <= (window.innerHeight || document.documentElement.clientHeight)
        )
    }

    _getScrollMovement(element) {
        const r = element.getBoundingClientRect();
        const posY = r.top + r.height/2 + window.scrollY - element._parallax.target.y;
        return (posY - this.currentTop) * this.scrollIntensity;
    }

    _getMouseMovement() {
        return { x: -this.currentDelta.x * this.mouseIntensity, y: -this.currentDelta.y * this.mouseIntensity };
    }

    /**
     * Query all the elements with the parallax attribute
     * must be called after when new elements are created
     */
    queryElements() {
        this.elements = document.querySelectorAll(this.attributeTag);
        this.elements.forEach((element) => {
            element._parallax = { target: {x: 0, y: 0}, init: true };
        });
    }

    _update() {

        this.currentDelta.x += (this.mouseDelta.x - this.currentDelta.x) * this.damping;
        this.currentDelta.y += (this.mouseDelta.y - this.currentDelta.y) * this.damping;
        this.currentTop += (this.scrollTop - this.currentTop) * this.damping;

        let mOffset = this._getMouseMovement();
        this.elements.forEach((element) => {
            let sOffset = this._getScrollMovement(element);
            let depth = element.getAttribute(this.attribute);
            let target = { x: Math.floor(mOffset.x * depth), y: Math.floor(mOffset.y * depth + sOffset * depth)};
            element._parallax.target = target;

            if(this._isElementInViewport(element) || element._parallax.init){
                element._parallax.init = false;
                element.style.transform = `translate3d(${target.x}px, ${target.y}px, 0px)`;
            }
         
        });

        requestAnimationFrame(() => {
            this._update();
        });
    }
}