//i first need to use fetch API to retrieve and display the details from local server
const movieDetails=
document.querySelector('#movie_details')
fetch('http://localhost:3000/films/1')
.then(res=>res.json())
.then(data=>{
    const availableTickets=data.capacity-data.tickets_sold
    const movieHtml=
    `<div>
    <img src='${data.poster}'
    alt='${data.title} poster'>
    <h2>${data.title}<h2>
    <p>Runtime:${data.runtime} minutes</p>
    <p>Showtime:${data.showtime}</p>
    <p>Available Tickets:${availableTickets}</p>
    </div>
    `
    movieDetails.innerHTML=movieHtml
})

const filmsList=
document.querySelector('#films')

fetch('http://localhost:3000/films')
.then(res=>res.json())
.then(data=>{
    data.forEach((movie)=>{
        const filmItem=
        document.createElement('li')
        filmItem.classList.add('film','item')
        filmItem.textContent=movie.title
        filmsList.appendChild(filmItem)
    })
})

fetch('http://localhost:3000/films')
.then(res=>res.json())
.then(data=>{
    const placeHolderLi=
    document.querySelector('#films li')
    if (placeHolderLi){
        filmsList.removeChild(placeHolderLi)
    }
    data.forEach((movie)=>{
        const availableTickets=movie.capacity-movie.tickets_sold

        const li=
        document.createElement('li')
        li.classList.add('film','item')
        li.innerHTML=`
        <img src='${movie.poster}'
        alt='${movie.title} poster'>
        <div class='movie_details'>
        <h2>${movie.title}</h2>
        <p>Runtime:${movie.runtime} minutes</p>
        <p>Showtime:${movie.showtime}</p>
    <p>Available Tickets:${availableTickets}</p>
    <button class='buy_ticket' data-id='${movie.id}' ${availableTickets ===0 ?
        'disabled' : ''}>Buy Ticket</button>
        </div>
        `
        filmsList.appendChild(li)
    })
})

filmsList.addEventListener('click', (e)=>{
    if(e.target.matches('.buy_ticket')){
        const movieId=
        e.target.getAttribute('data-id')
        fetch(`http://localhost:3000/films/${movieId}`,
        {
            method:'PATCH',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify()

        }
        )
      .then(res=>res.json())
      .then(data=>{
        const li=
        e.target.closest('.film.item')
        const availableTicketsEl=li.querySelector('p:last-child')
        const availableTickets=
        data.capacity-data.tickets_sold
        availableTicketsEl.textContent=`Available Tickets: ${availableTickets}`
        if(availableTickets===0){
            e.target.disabled=true

        }

      })
    .catch((error)=>{
        console.error(error)
    })
    }
})