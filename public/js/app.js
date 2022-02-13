
const weatherform = document.querySelector('form')
const search = document.querySelector('input')
const massageOne = document.querySelector('#massage-1')
const massageTwo = document.querySelector('#massage-2')

weatherform.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value
    massageOne.textContent = "Loading..."
    massageTwo.textContent = ""

    fetch("/weather?address=" + location).then((res) => {
        res.json().then((data) => {
            if (data.error) {
                massageOne.textContent = data.error


            } else {
                massageOne.textContent = data.location
                massageTwo.textContent = data.forcast

            }

        })


    })

})

