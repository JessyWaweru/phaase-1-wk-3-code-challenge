fetch('http://localhost:3000/films')
.then(res=>res.json())
.then(filmData=>console.log(filmData))


//now I want to populate the movie details on the webpage
const filmPoster=
document.getElementById('film_poster')
filmPoster.src=filmData[0].poster 

const filmTitle=
document.getElementById('film_title')
filmTitle.innerHTML=filmData.title 

const filmRuntime=
document.getElementById('film_runtime')
filmRuntime.innerHTML=
`${filmData.runtime} min`

const filmShowtime=
document.getElementById('film_showtime')
filmShowtime.innerHTML=
filmData.showtime 

const filmAvailableTickets=
document.getElementById('film_available_tickets')
filmAvailableTickets.innerHTML=
filmData.capacity-filmData.tickets_sold


