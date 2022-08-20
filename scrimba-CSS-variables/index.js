var root = document.querySelector(':root');
var rootStyles = getComputedStyle(root);
var red = rootStyles.getPropertyValue('--red');
var yellow =rootStyles.getPropertyValue('--yellow');

console.log(red)
root.style.setProperty('--red','blue')
root.style.setProperty('--yellow','#ffff00')
console.log(red)
