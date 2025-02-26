document.addEventListener('DOMContentLoaded', function() {
    const oElement = document.querySelector('.o');
    const helloElement = document.querySelector('.hello');
    oElement.addEventListener('click', function() {
        oElement.classList.add('hide');
        setTimeout(function() {
            helloElement.classList.add('fire');
        }, 1000);
    });
});
