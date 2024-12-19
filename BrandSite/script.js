//Removes the hidden class from elements when they are in view and adds the animated class to them
// Wait for the DOM to be fully loaded before running the script
document.addEventListener('DOMContentLoaded', () => {
    // Select all elements with the class 'hidden'
    const elements = document.querySelectorAll('.hidden');
    //console.log('Elements to observe:', elements);

    // Create a new IntersectionObserver instance
    const observer = new IntersectionObserver((entries, observer) => {
        //console.log('Entries:', entries);
        // Loop through each entry (observed element)
        entries.forEach(entry => {
            // Check if the element is intersecting (visible in the viewport)
            if (entry.isIntersecting) {
                //console.log('Intersecting:', entry.target);
                // Add the 'animated' class to the element
                entry.target.classList.add('animated');
                // Remove the 'hidden' class from the element
                entry.target.classList.remove('hidden');
                // Stop observing the element since it is now visible
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 1 }); // Set the threshold to 1 (100% visibility)

    // Observe each element with the 'hidden' class
    elements.forEach(element => {
        observer.observe(element);
        //console.log('Observing:', element);
    });
});
//Clock
function updateClock() {
    const clock = document.getElementById('clock');
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    clock.innerText = `${hours}:${minutes}:${seconds}`;
}

setInterval(updateClock, 1000);
updateClock(); // Initial call to display the clock immediately

//Image carousel
const images = document.querySelectorAll('.carousel-images img');
const prevButton = document.querySelector('.prev');
const nextButton = document.querySelector('.next');
let currentIndex = 0;

function showImage(index) {
    const width = window.innerWidth;
    let offset = -index * 600; // 600 is the width of each image
    if (width < 768) {
        offset = -index * 300; // 600 is the width of each image
    }
    //const offset = -index * 600; // 600 is the width of each image
    document.querySelector('.carousel-images').style.transform = `translateX(${offset}px)`;
}

prevButton.addEventListener('click', () => {
    if (currentIndex > 0) {
        currentIndex = currentIndex - 1;
    } else {
        currentIndex = images.length - 1;
    }
    showImage(currentIndex);
});

nextButton.addEventListener('click', () => {
    if (currentIndex < images.length - 1) {
        currentIndex = currentIndex + 1;
    } else {
        currentIndex = 0;
    }
    showImage(currentIndex);
});

// Auto-slide every 2 seconds
setInterval(() => {
    nextButton.click();
}, 4000);

//Form validation
let form = document.getElementById('registration-form');

form.addEventListener('submit', function (event) {
    event.preventDefault();
    let password = document.getElementById('password');
    let confirm_password = document.getElementById('confirm-password');
    let error = document.getElementById('password-error');
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{7,}$/;

    //Passed the username test now checks the password
    if (password.value !== confirm_password.value) {
        error.textContent = 'Password does not match';
    } else {
        error.textContent = '';
        console.log('Password is strong = ' + passwordPattern.test(password.value));
        if (passwordPattern.test(password.value)) {
            error.textContent = '';
            console.log('Password meets all criteria');
            form.reset();
        } else {
            console.log('Password not strong enough');
            error.textContent = 'Password is not strong enough'
        }
    }

});


//nav-links
const menu = document.getElementById('menu');
const navLinks = document.getElementById('nav-links');

menu.addEventListener('click', () => {
    navLinks.classList.toggle('show');
});

document.addEventListener('click', (event) => {
    if (event.target !== menu && event.target !== navLinks && event.target !== nextButton) {
        console.log(event);
        navLinks.classList.remove('show');
    }
});