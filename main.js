document.querySelectorAll('.js-tab-head').forEach(tab => {
    tab.addEventListener('click', openTab);
})

document.querySelectorAll('.js-close-tag').forEach(close => {
    close.addEventListener('click', closeTab)
})

document.querySelector('.js-bubble').addEventListener('click', changeClaim);

window.addEventListener('resize', recalcTabs);

function openTab(event) {
    event.preventDefault();

    // close active
    if(document.querySelector('.is-open')) {
        document.querySelector('.is-open').querySelector('.js-tab-content').style.height = 0;
        document.querySelector('.is-open').classList.remove('is-open');
    }

    // open new

    const target = event.currentTarget;
    const parent = target.closest('.js-tab');

    document.querySelector('main').style.backgroundColor = `var(--${parent.dataset.color})`

    parent.classList.add('is-open');
    parent.querySelector('.js-tab-content').style.height = `${parent.querySelector('.js-tab-text').offsetHeight}px`;
}

function closeTab(event) {
    event.preventDefault();
    event.stopPropagation();

    const target = event.currentTarget;
    const parent = target.closest('.js-tab');

    document.querySelector('main').style.backgroundColor = `var(--color1)`

    parent.classList.remove('is-open');
    parent.querySelector('.js-tab-content').style.height = 0;
}

function recalcTabs() {
    document.querySelector('.js-tabs').classList.add('no-transition')

    document.querySelectorAll('.is-open .js-tab-content').forEach(tab => {
        tab.style.height = `${tab.querySelector('.js-tab-text').offsetHeight}px`;
    });
    document.querySelector('.js-tabs').offsetHeight;

    document.querySelector('.js-tabs').classList.remove('no-transition')
}

let interval;

function changeClaim() {

    // reset claims
    document.querySelectorAll('.js-claim-text').forEach((text, index) => {
        if(index == 0) {
            text.classList.add('is-active-claim');
        } else {
            text.classList.remove('is-active-claim');
        }
        clearInterval(interval);
    });

    interval = setInterval(() => {
        const current = document.querySelector('.is-active-claim');
        if (current.nextElementSibling && current.nextElementSibling.classList.contains('js-claim-text')) {
            current.classList.remove('is-active-claim')
            current.nextElementSibling.classList.add('is-active-claim');
        } else {
            clearInterval(interval);
        }
        
    }, 500);
}

changeClaim();
