const navBar = document.querySelector('.navbar')
const allLi = document.querySelectorAll('li')


allLi.forEach((li, main) => {

    li.addEventListener("click", e => {
        navBar.querySelector(".active-list").classList.remove("active-list")
        li.classList.add("active-list")

        const indicator = document.querySelector(".indicator")
        indicator.style.transform = `translateX(calc(${main * 90}px))`
    })
})