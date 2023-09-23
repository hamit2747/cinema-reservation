// Tıklanılan koltuk tespiti için divi çağırma
const container = document.querySelector('.container');
// info-text classını çağırma
const infoText = document.querySelector('.info-text');
// movie id'sini çağırma
const select = document.getElementById('movie');
// count classını çağırma (selectedSeatsCount'a eşitlemek için aşağıda çıkan yazıda kaç tane seçili koltuk olduğunu gösteremek için)
const count = document.querySelector('#count');
// amount classını çağırma
const amount = document.querySelector('#amount');
// seat classlarına erişme
const seats = document.querySelectorAll('.seat:not(.reserved)');

// Sayfa yüklendiğinde verileri geri yükle
window.addEventListener('load', () => {
    getSeatsFromDatabase();
    // Tutar hesaplama işlemini çağır
    priceCalculator();
});

// seatsArray değişkenini tanımlama
const seatsArray = Array.from(seats);

// Veriyi kaydetme
const saveDatabase = () => {
    const selectedSeatArray = Array.from(container.querySelectorAll('.seat.selected'));
    const selectedSeatIndexes = selectedSeatArray.map((seat) => seatsArray.indexOf(seat));
    localStorage.setItem('selectedSeatIndexes', JSON.stringify(selectedSeatIndexes));
    localStorage.setItem('selectedMovie', JSON.stringify(select.value));
}

// Veriyi geri yükleme
const getSeatsFromDatabase = () => {
    const dbSelectedSeatIndexes = JSON.parse(localStorage.getItem('selectedSeatIndexes'));
    const dbSelectedMovie = JSON.parse(localStorage.getItem('selectedMovie'));
    select.value = dbSelectedMovie;

    if (dbSelectedSeatIndexes !== null && dbSelectedSeatIndexes.length > 0) {
        seatsArray.forEach((seat, index) => {
            if (dbSelectedSeatIndexes.indexOf(index) > -1) {
                seat.classList.add('selected');
            }
        });
    }
}

container.addEventListener('click', (e) => {
    const clickedSeat = e.target.offsetParent;

    if (clickedSeat.classList.contains('seat') && !clickedSeat.classList.contains('reserved')) {
        clickedSeat.classList.toggle('selected');
        // Koltuk durumunu kaydet
        saveDatabase();
        // Tutar hesaplama fonksiyonunu çağır
        priceCalculator();
    }
});

// Tutar hesaplama fonksiyonu
const priceCalculator = () => {
    // Tüm seçili koltukları seç
    const selectedSeats = container.querySelectorAll('.seat.selected');
    
    // Seçili koltuk sayısını al
    const selectedSeatsCount = selectedSeats.length;
    
    // Film fiyatını al
    const moviePrice = select.value;
    
    // Toplam tutarı hesapla
    const totalPrice = selectedSeatsCount * moviePrice;
    
    // Seçili koltuk sayısını ve toplam tutarı güncelle
    count.innerText = selectedSeatsCount;
    amount.innerText = totalPrice;
    
    // Seçili koltuk varsa dsiplay değiştirme sorgusu
    if (selectedSeatsCount > 0) {
        infoText.style.display = "block";
    } else {
        infoText.style.display = "none";
    }
}

select.addEventListener('change', () => {
    priceCalculator();
});
