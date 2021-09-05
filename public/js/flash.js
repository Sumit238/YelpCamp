const alert = document.getElementsByClassName('alerter')
setTimeout(() => {
    alert[0].classList.remove('widthZero');
}, 200);

document.getElementsByClassName('closeCustom')[0].addEventListener('click', (e) => {
    document.getElementsByClassName('alerter')[0].remove()
})