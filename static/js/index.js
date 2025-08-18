window.HELP_IMPROVE_VIDEOJS = false;


$(document).ready(function () {
    // Check for click events on the navbar burger icon

    var options = {
        slidesToScroll: 1,
        slidesToShow: 1,
        loop: true,
        infinite: true,
        autoplay: true,
        autoplaySpeed: 5000,
    }

    // Initialize all div with carousel class
    var carousels = bulmaCarousel.attach('.carousel', options);

    bulmaSlider.attach();


    // --- CONFIGURATION ---
    const itemsPerPage = 4; // Set how many videos to show per page

    // --- DOM ELEMENTS ---
    const videoGrid = document.getElementById('video-grid');
    const videoItems = videoGrid.querySelectorAll('.video-item');
    const paginationList = document.getElementById('pagination-list');

    // --- CALCULATIONS ---
    const totalItems = videoItems.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    let currentPage = 1;

    /**
     * Displays the items for a specific page.
     * @param {number} page The page number to display.
     */
    function showPage(page) {
        // Calculate the start and end index of items for the current page
        const startIndex = (page - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;

        // Hide all items first
        videoItems.forEach(item => {
            item.classList.remove('is-visible');
        });

        // Show only the items for the current page
        for (let i = startIndex; i < endIndex && i < totalItems; i++) {
            videoItems[i].classList.add('is-visible');
        }

        // Update the active state of the pagination buttons
        updatePaginationButtons();
    }

    /**
     * Creates the pagination buttons dynamically.
     */
    function setupPagination() {
        // Clear any existing buttons
        paginationList.innerHTML = '';

        for (let i = 1; i <= totalPages; i++) {
            const pageItem = document.createElement('li');
            const pageLink = document.createElement('a');

            pageLink.className = 'pagination-link';
            pageLink.textContent = i;
            pageLink.setAttribute('aria-label', 'Goto page ' + i);

            // Add click event to switch pages
            pageLink.addEventListener('click', (event) => {
                event.preventDefault();
                currentPage = i;
                showPage(currentPage);
            });

            pageItem.appendChild(pageLink);
            paginationList.appendChild(pageItem);
        }
    }

    /**
     * Updates which pagination button is marked as 'current'.
     */
    function updatePaginationButtons() {
        const pageLinks = paginationList.querySelectorAll('.pagination-link');
        pageLinks.forEach(link => {
            // Remove 'is-current' class from all buttons
            link.classList.remove('is-current');

            // Add 'is-current' class to the button of the current page
            if (parseInt(link.textContent) === currentPage) {
                link.classList.add('is-current');
            }
        });
    }

    // --- INITIALIZATION ---
    setupPagination(); // Create the page buttons
    showPage(currentPage); // Show the first page initially
    // Find the button and the code element
    const copyButton = document.querySelector('.copy-btn');
    const codeToCopy = document.getElementById('bibtex-code');

    copyButton.addEventListener('click', () => {
        // Use the Clipboard API to copy the text
        navigator.clipboard.writeText(codeToCopy.textContent).then(() => {
            // Provide user feedback
            copyButton.textContent = 'copied!';
            setTimeout(() => {
                copyButton.textContent = 'copy';
            }, 2000); // Reset text after 2 seconds
        }).catch(err => {
            console.error('Failed to copy text: ', err);
        });
    });

    // 1. Select the elements we need to work with
    // The navigation bar at the foot of the first block
    const navBar = document.querySelector('#block1 .hero-foot nav');
    // The second block of content
    const block2 = document.getElementById('block2');

    // Make sure both elements exist before running the code
    if (!navBar || !block2) {
        console.error("Sticky navigation elements not found. Please check your HTML IDs and structure.");
        return;
    }

    // 2. Get the initial position and height of the navigation bar
    // This is the point where the nav should become sticky
    const stickyPoint = navBar.offsetTop;
    const navHeight = navBar.offsetHeight;

    // 3. Create a function to handle the scroll event
    function handleScroll() {
        // Check if the user has scrolled past the nav bar's original position
        if (window.scrollY >= stickyPoint) {
            // If so, add the 'sticky-nav' class to make it stick
            navBar.classList.add('sticky-nav');

            // IMPORTANT: Add padding to the top of the next block (block2)
            // to prevent the content from jumping up when the nav is taken out of the document flow.
            block2.style.paddingTop = navHeight + 'px';

        } else {
            // If not, remove the class to un-stick it
            navBar.classList.remove('sticky-nav');

            // Remove the padding from block2
            block2.style.paddingTop = '0';
        }
    }

    // 4. Attach the function to the window's scroll event
    window.addEventListener('scroll', handleScroll);
})
