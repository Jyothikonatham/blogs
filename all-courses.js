let courseData = [];

async function fetchCourses() {
    try {
        const response = await fetch('http://localhost:3000/courses');
        const courses = await response.json();
        courseData = Object.values(courses[0]); // Extract course1, course2... from single object
        displayCourses(courseData); // Initial display all courses
    } catch (error) {
        console.error('Error fetching courses:', error);
    }
}

function displayCourses(filteredCourses) {
    const gallery = document.getElementById('gallery');
    gallery.innerHTML = ''; // Clear current content

    if (filteredCourses.length === 0) {
        gallery.innerHTML = '<p class="no-courses">No courses found in this category.</p>';
        return;
    }

    filteredCourses.forEach(course => {
        const card = document.createElement('div');
        card.className = 'doc-card';
        card.innerHTML = `
            <img class="doc_images" src="${course.image}" alt="${course.coursename}" />
            <h5>${course.coursename}</h5>
            <p>${course.description}</p>
            <p><strong>Duration:</strong> ${course.duration}</p>
            <p><strong>Rating:</strong> ${course.rating}</p>
        `;
        gallery.appendChild(card);
    });
}

function filterCourses(category) {
    // Add active class to selected button
    const buttons = document.querySelectorAll('.con1-buttons input[type="button"]');
    buttons.forEach(button => {
        if (button.value === category) {
            button.classList.add('active-filter');
        } else {
            button.classList.remove('active-filter');
        }
    });

    // Filter courses
    if (category === 'All') {
        displayCourses(courseData);
    } else {
        const filtered = courseData.filter(course => course.category === category);
        displayCourses(filtered);
    }
}

// Add event listeners to filter buttons
document.addEventListener('DOMContentLoaded', () => {
    fetchCourses();

    // Add click event listeners to all filter buttons
    const filterButtons = document.querySelectorAll('.con1-buttons input[type="button"]');
    filterButtons.forEach(button => {
        button.addEventListener('click', () => filterCourses(button.value));
    });
});