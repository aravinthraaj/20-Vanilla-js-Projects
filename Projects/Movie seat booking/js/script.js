const seat = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const theaterSeats = document.querySelector('.theater__seats');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');
let ticketPrice = +movieSelect.value;
retriveData();

function seatSelectedCount() {
	const seatsSelected = document.querySelectorAll('.row .seat.selected');
	const selectedSeatIndex = [...seatsSelected].map((seats) => {
		return [...seat].indexOf(seats);
	});

	localStorage.setItem('selectedseats', JSON.stringify(selectedSeatIndex));
	const seatsCount = seatsSelected.length;
	count.innerText = seatsCount;
	total.innerText = seatsCount * ticketPrice;

	//console.log(selectedSeatIndex);
}

function retriveData() {
	const selectedSeats = JSON.parse(localStorage.getItem('selectedseats'));
	if (selectedSeats !== null && selectedSeats.length > 0) {
		seat.forEach((seats, index) => {
			if (selectedSeats.indexOf(index) > -1) {
				seats.classList.add('selected');
			}
		});
	}

	const selectedMovie = localStorage.getItem('selectedMovie');

	if (selectedMovie !== null) {
		movieSelect.selectedIndex = selectedMovie;
	}
}

function setMovieData(movieName, moviePrice) {
	localStorage.setItem('selectedMovie', JSON.stringify(movieName));
	localStorage.setItem('moviePrice', JSON.stringify(moviePrice));
}

movieSelect.addEventListener('change', (e) => {
	ticketPrice = +e.target.value;
	console.log(e.target.selectedIndex);
	setMovieData(e.target.selectedIndex, e.target.value);
	seatSelectedCount();
});

theaterSeats.addEventListener('click', (e) => {
	if (
		e.target.classList.contains('seat') &&
		!e.target.classList.contains('occupied')
	) {
		e.target.classList.toggle('selected');
		seatSelectedCount();
	}
});

seatSelectedCount();
