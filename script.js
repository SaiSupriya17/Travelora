
/* =========================================================
   TRAVELORA - MAIN JAVASCRIPT
========================================================= */


/* =========================================================
   NOTIFICATION SYSTEM
   Notifications are created only after successful bookings.
========================================================= */

const TRAVELORA_NOTIFICATION_KEY = "traveloraNotifications";


function getTraveloraNotifications() {

    try {

        const notifications = JSON.parse(
            localStorage.getItem(TRAVELORA_NOTIFICATION_KEY) || "[]"
        );

        return Array.isArray(notifications) ? notifications : [];

    } catch (error) {

        console.error("Could not read notifications:", error);

        return [];

    }

}


function getBookingServiceType(bookingName) {

    const name = String(bookingName || "").toLowerCase();

    if (
        name.includes("flight") ||
        name.includes("indigo") ||
        name.includes("air india") ||
        name.includes("akasa air")
    ) {
        return "flight";
    }

    if (
        name.includes("hotel") ||
        name.includes("resort") ||
        name.includes("grand wander") ||
        name.includes("city comfort")
    ) {
        return "hotel";
    }

    if (
        name.includes("cab") ||
        name.includes("taxi") ||
        name.includes("car rental")
    ) {
        return "cab";
    }

    if (
        name.includes("bus") ||
        name.includes("travels")
    ) {
        return "bus";
    }

    if (
        name.includes("train") ||
        name.includes("express") ||
        name.includes("superfast")
    ) {
        return "train";
    }

    if (
        name.includes("package") ||
        name.includes("holiday")
    ) {
        return "package";
    }

    if (
        name.includes("activity") ||
        name.includes("adventure")
    ) {
        return "activity";
    }

    return "booking";

}


/*
   Call this function only after a booking succeeds.
   It saves the notification for notifications.html.
*/

function createBookingNotification(
    bookingName,
    destination,
    bookingId
) {

    const notifications = getTraveloraNotifications();

    const uniqueBookingId =
        bookingId ||
        "booking-" + Date.now() + "-" +
        Math.random().toString(36).slice(2, 9);


    /*
       Prevent duplicate notifications for the same booking.
    */

    const alreadyExists = notifications.some(function(notification) {

        return notification.bookingId === uniqueBookingId;

    });

    if (alreadyExists) {
        return;
    }


    const serviceType = getBookingServiceType(bookingName);

    const place =
        destination ||
        localStorage.getItem("selectedDestination") ||
        "your selected destination";


    const notification = {

        id: "notification-" + uniqueBookingId,

        bookingId: uniqueBookingId,

        title: "Booking Confirmed",

        message:
            "Your " +
            String(bookingName || "travel service") +
            " booking for " +
            place +
            " has been confirmed successfully.",

        type: serviceType,

        category: "booking",

        service: serviceType,

        bookingName: String(bookingName || "Travel Booking"),

        destination: place,

        date: new Date().toISOString(),

        time: Date.now(),

        read: false

    };


    notifications.unshift(notification);


    localStorage.setItem(
        TRAVELORA_NOTIFICATION_KEY,
        JSON.stringify(notifications)
    );


    /*
       Notify other open pages in the same browser.
       The storage event is handled by other tabs.
    */

}


/* =========================================================
   HOME SEARCH
========================================================= */

function searchTravel() {

    const from = document.getElementById("from")?.value.trim();

    const to = document.getElementById("to")?.value.trim();

    const date = document.getElementById("date")?.value;


    if (!from || !to) {

        alert("Please enter From and To locations.");

        return;

    }


    localStorage.setItem("from", from);

    localStorage.setItem("to", to);

    localStorage.setItem("date", date || "");


    window.location.href = "flights.html";

}


/* =========================================================
   FLIGHTS
========================================================= */

function searchFlights() {

    const from = document.getElementById("flightFrom")?.value.trim();

    const to = document.getElementById("flightTo")?.value.trim();


    if (!from || !to) {

        alert("Please enter departure and destination.");

        return;

    }


    localStorage.setItem("bookingFrom", from);

    localStorage.setItem("bookingTo", to);

    localStorage.setItem("bookingService", "flight");


    const results = document.getElementById("flightResults");

    if (!results) return;


    results.innerHTML = `

        <div class="result-box">

            <h2>Available Flights</h2>

            <div class="result">

                <h3>IndiGo</h3>

                <p>${from} → ${to}</p>

                <p>09:30 AM → 11:45 AM</p>

                <h3>₹4,999</h3>

                <button
                    onclick="bookService('IndiGo Flight')"
                >
                    Book Now
                </button>

            </div>


            <div class="result">

                <h3>Air India</h3>

                <p>${from} → ${to}</p>

                <p>02:00 PM → 04:20 PM</p>

                <h3>₹5,499</h3>

                <button
                    onclick="bookService('Air India Flight')"
                >
                    Book Now
                </button>

            </div>


            <div class="result">

                <h3>Akasa Air</h3>

                <p>${from} → ${to}</p>

                <p>06:30 PM → 08:40 PM</p>

                <h3>₹4,799</h3>

                <button
                    onclick="bookService('Akasa Air Flight')"
                >
                    Book Now
                </button>

            </div>

        </div>

    `;

}


/* =========================================================
   HOTELS
========================================================= */

function searchHotels() {

    const city = document.getElementById("hotelCity")?.value.trim();


    if (!city) {

        alert("Please enter a city.");

        return;

    }


    localStorage.setItem("bookingTo", city);

    localStorage.setItem("bookingService", "hotel");


    const results = document.getElementById("hotelResults");

    if (!results) return;


    results.innerHTML = `

        <div class="result-box">

            <h2>Hotels in ${city}</h2>


            <div class="result">

                <h3>Grand Wander Hotel</h3>

                <p>★★★★★</p>

                <p>
                    Free Wi-Fi • Breakfast • Swimming Pool
                </p>

                <h3>₹3,499 / night</h3>

                <button
                    onclick="bookService('Grand Wander Hotel')"
                >
                    Book Hotel
                </button>

            </div>


            <div class="result">

                <h3>City Comfort Hotel</h3>

                <p>★★★★☆</p>

                <p>
                    Wi-Fi • Restaurant • Parking
                </p>

                <h3>₹2,799 / night</h3>

                <button
                    onclick="bookService('City Comfort Hotel')"
                >
                    Book Hotel
                </button>

            </div>

        </div>

    `;

}


/* =========================================================
   BUSES
========================================================= */

function searchBuses() {

    const from = document.getElementById("busFrom")?.value.trim();

    const to = document.getElementById("busTo")?.value.trim();


    if (!from || !to) {

        alert("Please enter From and To.");

        return;

    }


    localStorage.setItem("bookingFrom", from);

    localStorage.setItem("bookingTo", to);

    localStorage.setItem("bookingService", "bus");


    const results = document.getElementById("busResults");

    if (!results) return;


    results.innerHTML = `

        <div class="result-box">

            <h2>Available Buses</h2>


            <div class="result">

                <h3>Orange Travels</h3>

                <p>${from} → ${to}</p>

                <p>
                    AC Sleeper • 10:00 PM
                </p>

                <h3>₹899</h3>

                <button
                    onclick="bookService('Orange Travels Bus')"
                >
                    Book Bus
                </button>

            </div>


            <div class="result">

                <h3>VRL Travels</h3>

                <p>${from} → ${to}</p>

                <p>
                    AC Seater • 09:00 PM
                </p>

                <h3>₹799</h3>

                <button
                    onclick="bookService('VRL Travels Bus')"
                >
                    Book Bus
                </button>

            </div>

        </div>

    `;

}


/* =========================================================
   TRAINS
========================================================= */

function searchTrains() {

    const from = document.getElementById("trainFrom")?.value.trim();

    const to = document.getElementById("trainTo")?.value.trim();


    if (!from || !to) {

        alert("Please enter From and To.");

        return;

    }


    localStorage.setItem("bookingFrom", from);

    localStorage.setItem("bookingTo", to);

    localStorage.setItem("bookingService", "train");


    const results = document.getElementById("trainResults");

    if (!results) return;


    results.innerHTML = `

        <div class="result-box">

            <h2>Available Trains</h2>


            <div class="result">

                <h3>Express 12001</h3>

                <p>${from} → ${to}</p>

                <p>
                    06:00 AM → 12:30 PM
                </p>

                <h3>₹1,299</h3>

                <button
                    onclick="bookService('Express 12001 Train')"
                >
                    Book Train
                </button>

            </div>


            <div class="result">

                <h3>Superfast 12845</h3>

                <p>${from} → ${to}</p>

                <p>
                    08:30 PM → 03:00 AM
                </p>

                <h3>₹1,499</h3>

                <button
                    onclick="bookService('Superfast 12845 Train')"
                >
                    Book Train
                </button>

            </div>

        </div>

    `;

}


/* =========================================================
   BOOKING NAVIGATION
========================================================= */

function bookPackage(name, price) {

    localStorage.setItem("bookingName", name);

    localStorage.setItem("bookingPrice", price);

    localStorage.setItem("bookingService", "package");

    window.location.href = "booking.html";

}


function bookService(name) {

    localStorage.setItem("bookingName", name);


    /*
       Retain the service type and route selected on the
       search page. Infer the type if it was not saved.
    */

    const serviceType = getBookingServiceType(name);

    localStorage.setItem("bookingService", serviceType);


    window.location.href = "booking.html";

}


/* =========================================================
   BOOKING PAGE INITIALIZATION
========================================================= */

window.addEventListener("DOMContentLoaded", function() {

    const bookingName = localStorage.getItem("bookingName");

    const element = document.getElementById("bookingName");


    if (bookingName && element) {

        element.innerText = bookingName;

    }

});


/* =========================================================
   CONFIRM BOOKING
========================================================= */

function confirmBooking() {

    const name =
        document.getElementById("customerName")?.value.trim();

    const email =
        document.getElementById("customerEmail")?.value.trim();

    const phone =
        document.getElementById("customerPhone")?.value.trim();


    if (!name || !email || !phone) {

        alert("Please fill all details.");

        return;

    }


    const booking =
        localStorage.getItem("bookingName") ||
        "Travel Booking";


    const destination =
        localStorage.getItem("bookingTo") ||
        localStorage.getItem("selectedDestination") ||
        "your selected destination";


    const bookingId =
        "TRV-" +
        Date.now() +
        "-" +
        Math.random().toString(36).slice(2, 7).toUpperCase();


    const trip = {

        id: bookingId,

        bookingId: bookingId,

        name: booking,

        service: getBookingServiceType(booking),

        destination: destination,

        from: localStorage.getItem("bookingFrom") || "",

        customer: name,

        email: email,

        phone: phone,

        date: new Date().toLocaleDateString(),

        timestamp: Date.now()

    };


    /*
       Save the successful booking first.
       Create a notification only after saving succeeds.
    */

    try {

        localStorage.setItem("myTrip", JSON.stringify(trip));


        const savedTrips = JSON.parse(
            localStorage.getItem("traveloraTrips") || "[]"
        );


        const tripsArray = Array.isArray(savedTrips) ? savedTrips : [];

        tripsArray.unshift(trip);


        localStorage.setItem(
            "traveloraTrips",
            JSON.stringify(tripsArray)
        );


        createBookingNotification(
            booking,
            destination,
            bookingId
        );


    } catch (error) {

        console.error("Booking could not be saved:", error);

        alert(
            "We could not save your booking. Please try again."
        );

        return;

    }


    alert(
        "Booking successful!\n\n" +
        "Thank you " +
        name +
        "!"
    );


    window.location.href = "trips.html";

}


/* =========================================================
   LOGIN
========================================================= */

function loginUser() {

    const name =
        document.getElementById("loginName")?.value.trim();

    const email =
        document.getElementById("loginEmail")?.value.trim();

    const password =
        document.getElementById("loginPassword")?.value;


    if (!name || !email || !password) {

        alert("Please fill all login details.");

        return;

    }


    localStorage.setItem("userName", name);

    localStorage.setItem("userEmail", email);

    localStorage.setItem("isLoggedIn", "true");


    alert("Login successful! Welcome " + name);


    window.location.href = "index.html";

}


/* =========================================================
   GOOGLE LOGIN DEMO
========================================================= */

function googleLogin() {

    alert(
        "Google login demonstration.\n" +
        "Connect Firebase/Google OAuth for real authentication."
    );

}


/* =========================================================
   LOGOUT
========================================================= */

function logoutUser() {

    localStorage.removeItem("isLoggedIn");

    localStorage.removeItem("userName");

    localStorage.removeItem("userEmail");

    localStorage.removeItem("userPhone");

    localStorage.removeItem("userGender");


    alert("You have been logged out.");


    window.location.href = "login.html";

}


/* =========================================================
   LOGIN STATE
========================================================= */

function isUserLoggedIn() {

    return localStorage.getItem("isLoggedIn") === "true";

}


/* =========================================================
   HOME PAGE LOGIN STATE AND WISHLIST PROTECTION
========================================================= */

document.addEventListener("DOMContentLoaded", function() {

    const loggedIn = isUserLoggedIn();

    const guestNavigation =
        document.getElementById("homeGuestNavigation");

    const userNavigation =
        document.getElementById("homeUserNavigation");

    const wishlistLink =
        document.getElementById("homeWishlistLink");


    if (guestNavigation) {

        guestNavigation.style.display =
            loggedIn ? "none" : "flex";

    }


    if (userNavigation) {

        userNavigation.style.display =
            loggedIn ? "flex" : "none";

    }


    if (wishlistLink) {

        wishlistLink.addEventListener("click", function(event) {

            event.preventDefault();


            if (isUserLoggedIn()) {

                window.location.href = "wishlist.html";

            } else {

                alert("Please login or sign up to view your wishlist.");

                window.location.href = "login.html";

            }

        });

    }

});


/* =========================================================
   UPDATE HOME NAVIGATION
========================================================= */

function updateNavigation() {

    const loggedIn = isUserLoggedIn();


    const loggedInNavigation =
        document.getElementById("loggedInNavigation");

    const loggedOutNavigation =
        document.getElementById("loggedOutNavigation");


    if (loggedInNavigation) {

        loggedInNavigation.style.display =
            loggedIn ? "flex" : "none";

    }


    if (loggedOutNavigation) {

        loggedOutNavigation.style.display =
            loggedIn ? "none" : "flex";

    }

}


/* =========================================================
   WISHLIST
========================================================= */

function addWishlist(item) {

    let wishlist = [];

    try {

        wishlist = JSON.parse(
            localStorage.getItem("wishlist") || "[]"
        );

        if (!Array.isArray(wishlist)) {

            wishlist = [];

        }

    } catch (error) {

        wishlist = [];

    }


    if (!wishlist.includes(item)) {

        wishlist.push(item);


        localStorage.setItem(
            "wishlist",
            JSON.stringify(wishlist)
        );


        alert(item + " added to Wishlist!");

    } else {

        alert(item + " is already in Wishlist.");

    }

}


window.addEventListener("DOMContentLoaded", function() {

    const wishlistElement =
        document.getElementById("wishlistItems");


    if (!wishlistElement) {

        return;

    }


    let wishlist = [];

    try {

        wishlist = JSON.parse(
            localStorage.getItem("wishlist") || "[]"
        );

        if (!Array.isArray(wishlist)) {

            wishlist = [];

        }

    } catch (error) {

        wishlist = [];

    }


    if (wishlist.length === 0) {

        wishlistElement.innerHTML =
            "<p>Your wishlist is empty.</p>";

        return;

    }


    wishlistElement.innerHTML = "";


    wishlist.forEach(function(item) {

        const result = document.createElement("div");

        result.className = "result";


        const heading = document.createElement("h2");

        heading.textContent = item;


        const button = document.createElement("button");

        button.textContent = "Book Now";

        button.addEventListener("click", function() {

            bookService(item);

        });


        result.appendChild(heading);

        result.appendChild(button);

        wishlistElement.appendChild(result);

    });

});


/* =========================================================
   DESTINATION
========================================================= */

function chooseDestination(place) {

    localStorage.setItem("selectedDestination", place);


    alert(place + " selected!\nLet's plan your trip.");


    window.location.href = "planner.html";

}


/* =========================================================
   OFFERS
========================================================= */

function applyOffer(code) {

    localStorage.setItem("coupon", code);


    alert("Coupon " + code + " applied successfully!");


    window.location.href = "packages.html";

}


/* =========================================================
   ACTIVITIES
========================================================= */

function bookActivity(activity) {

    localStorage.setItem("bookingName", activity);

    localStorage.setItem("bookingService", "activity");


    window.location.href = "booking.html";

}


/* =========================================================
   TRIP PLANNER
========================================================= */

function generateTrip() {

    const destination =
        document.getElementById("plannerDestination")?.value.trim();

    const budget =
        document.getElementById("plannerBudget")?.value;

    const style =
        document.getElementById("plannerStyle")?.value;


    if (!destination) {

        alert("Please enter a destination.");

        return;

    }


    const plan = document.getElementById("tripPlan");

    if (!plan) return;


    plan.innerHTML = `

        <div class="plan-result">

            <h2>
                Your Trip Plan ✨
            </h2>

            <h3>
                ${destination}
            </h3>

            <p>
                <b>Budget:</b> ${budget || "Not specified"}
            </p>

            <p>
                <b>Travel Style:</b> ${style || "Not specified"}
            </p>

            <hr>

            <p>
                Day 1: Arrival and local sightseeing
            </p>

            <p>
                Day 2: Explore famous attractions
            </p>

            <p>
                Day 3: Adventure and activities
            </p>

            <p>
                Day 4: Shopping and local food
            </p>

            <p>
                Day 5: Relaxation and departure
            </p>

            <button
                onclick="bookService('${destination.replace(/'/g, "\\'")} Trip')"
            >
                Book This Trip
            </button>

        </div>

    `;

}


/* =========================================================
   CONTACT
========================================================= */

function sendMessage() {

    const name =
        document.getElementById("contactName")?.value.trim();

    const email =
        document.getElementById("contactEmail")?.value.trim();

    const message =
        document.getElementById("contactMessage")?.value.trim();


    if (!name || !email || !message) {

        alert("Please fill all fields.");

        return;

    }


    alert(
        "Message sent successfully!\n" +
        "Our support team will contact you."
    );


    document.getElementById("contactName").value = "";

    document.getElementById("contactEmail").value = "";

    document.getElementById("contactMessage").value = "";

}


/* =========================================================
   PROFILE INFORMATION
========================================================= */

function loadProfileInformation() {

    const name = localStorage.getItem("userName");

    const email = localStorage.getItem("userEmail");

    const phone = localStorage.getItem("userPhone");

    const gender = localStorage.getItem("userGender");


    document.querySelectorAll(".profile-user-name").forEach(
        function(element) {

            element.innerText = name || "Travelora Traveller";

        }
    );


    document.querySelectorAll(".profile-user-email").forEach(
        function(element) {

            element.innerText = email || "Not available";

        }
    );


    document.querySelectorAll(".profile-user-phone").forEach(
        function(element) {

            element.innerText = phone || "Not available";

        }
    );


    document.querySelectorAll(".profile-user-gender").forEach(
        function(element) {

            element.innerText = gender || "Not specified";

        }
    );

}


/* =========================================================
   PAGE INITIALIZATION
========================================================= */

window.addEventListener("DOMContentLoaded", function() {

    updateNavigation();

    loadProfileInformation();

});
