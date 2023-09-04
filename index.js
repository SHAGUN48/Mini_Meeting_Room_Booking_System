
const rooms = [
    { name: "Room A", bookings: [] },
    { name: "Room B", bookings: [] },
    { name: "Room C", bookings: [] },
    
];
const timeSlots = [
    "9:00-9:30",
    "9:30-10:00",
    "10:00-10:30",    
];
const userBookings = [];

function displayAvailableRooms() {
    const roomSelect = document.getElementById("room-select");
    const timeSelect = document.getElementById("time-select");
    roomSelect.innerHTML = "";
    const selectedTimeSlotIndex = timeSelect.value;
    rooms.forEach((room, roomIndex) => {
        const option = document.createElement("option");
        option.value = roomIndex;
        option.textContent = room.name;
        if (!room.bookings.includes(timeSlots[selectedTimeSlotIndex])) {
            roomSelect.appendChild(option);
        }
    });
}
function populateTimeSlots() {
    const timeSelect = document.getElementById("time-select");

    timeSelect.innerHTML = "";

    timeSlots.forEach((timeSlot, index) => {
        const option = document.createElement("option");
        option.value = index;
        option.textContent = timeSlot;
        timeSelect.appendChild(option);
    });
}
function displayUserBookings() {
    const userBookingsList = document.getElementById("my-bookings-list");
    userBookingsList.innerHTML = "";

    userBookings.forEach(booking => {
        const roomName = rooms[booking.roomIndex].name;
        const timeSlot = timeSlots[booking.timeSlotIndex];

        const bookingItem = document.createElement("li");
        bookingItem.textContent = `${roomName} - ${timeSlot}`;

        const cancelButton = document.createElement("button");
        cancelButton.textContent = "Cancel";
        cancelButton.addEventListener("click", () => {
            cancelBooking(booking.roomIndex, booking.timeSlotIndex);
        });
        bookingItem.appendChild(cancelButton);

        userBookingsList.appendChild(bookingItem);
    });
}

function bookRoomWithDetails(roomIndex, timeSlotIndex, date, name, email, notes) {
    const selectedRoom = rooms[roomIndex];
    const selectedTimeSlot = timeSlots[timeSlotIndex];

    if (selectedRoom.bookings.includes(selectedTimeSlot)) {
        alert("This room is already booked for this time slot.");
    } else {
        selectedRoom.bookings.push(selectedTimeSlot);
        displayAvailableRooms();

        const bookingDetails = {
            roomName: selectedRoom.name,
            timeSlot: selectedTimeSlot,
            date: date,
            name: name,
            email: email,
            notes: notes,
        };

        
        document.getElementById("booking-form").reset();

        userBookings.push({ roomIndex, timeSlotIndex });

        displayUserBookings();
        const messageContainer = document.getElementById("booking-message");
        messageContainer.textContent = `Booking for ${selectedRoom.name} at ${selectedTimeSlot} has been successfully made.`;
        messageContainer.classList.remove("hidden"); 
    }
}
function cancelBooking(roomIndex, timeSlotIndex) {
    const room = rooms[roomIndex];
    const timeSlot = timeSlots[timeSlotIndex];

    if (room.bookings.includes(timeSlot)) {

        const bookingIndex = room.bookings.indexOf(timeSlot);
        room.bookings.splice(bookingIndex, 1);

    
        const userBookingIndex = userBookings.findIndex(booking => booking.roomIndex === roomIndex && booking.timeSlotIndex === timeSlotIndex);
        if (userBookingIndex !== -1) {
            userBookings.splice(userBookingIndex, 1);
        }

        
        displayAvailableRooms();

        displayUserBookings();

        const messageContainer = document.getElementById("booking-message");
        messageContainer.textContent = `Booking for ${room.name} at ${timeSlot} has been canceled.`;
        messageContainer.classList.remove("hidden");

        setTimeout(() => {
            messageContainer.textContent = "";
            messageContainer.classList.add("hidden");
        }, 5000); 
    }
}

document.getElementById("booking-form").addEventListener("submit", function (e) {
    e.preventDefault();

    const roomSelect = document.getElementById("room-select");
    const timeSelect = document.getElementById("time-select");
    const dateInput = document.getElementById("date");
    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const notesInput = document.getElementById("notes");

    const selectedRoomIndex = roomSelect.value;
    const selectedTimeSlotIndex = timeSelect.value;
    const date = dateInput.value;
    const name = nameInput.value;
    const email = emailInput.value;
    const notes = notesInput.value;

    const existingBooking = userBookings.find(booking => booking.roomIndex === selectedRoomIndex && booking.timeSlotIndex === selectedTimeSlotIndex);

    if (existingBooking) {
        alert("You have already booked this room for the selected time slot.");
    } else {
        bookRoomWithDetails(selectedRoomIndex, selectedTimeSlotIndex, date, name, email, notes);
    }
    
});


document.addEventListener("DOMContentLoaded", function () {
    
    displayAvailableRooms();
    displayUserBookings();
    populateTimeSlots();
});
