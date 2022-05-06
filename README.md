# BloodyParallax
A quick to setup Javascript ES6 Parallax Library
## Usage
```
npm install @llagache/bloody-parallax
```

### Example :
index.js : 
```javascript
import Seedable from "@llagache/bloody-parallax";
const parallax = new BloodyParallax({mouseIntensity: 0.2, scrollIntensity: 0.5, damping: 0.1, attribute: "data-depth"});
```
index.html : 
```html
<div data-depth="0.1">I have parallax</div>
```
### Constructor :
```javascript
/**
 * @param {object} config { 
 *   {number} scrollIntensity : 0.1, 
 *   {number} mouseIntensity : 0.1, 
 *   {number} damping : 0.1, 
 *   {string} attribute : "data-depth"
 * }
 */
new BloodyParallax(seed)
```
### Methods :
```javascript
/**
 * Query all the elements with the parallax attribute
 * must be called after when new elements are createds
 */
queryElements()
```
## Author

Lagache Louis ([@llagache_dev](https://twitter.com/llagache_dev))
