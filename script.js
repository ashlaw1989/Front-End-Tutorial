// make event listener to trigger when the DOM is loaded (when visiting webpage)
addEventListener("DOMContentLoaded", function() {
    loadCourses();

        document.getElementById("courseForm").addEventListener("submit", async function(e) {
        e.preventDefault();

        const name = document.getElementById("name").value;
        const instructor = document.getElementById("instructor").value;

        await fetch("http://localhost:3000/api/courses", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, instructor })
        })

        loadCourses();

    });

});

async function loadCourses() {
    const response = await fetch("http://localhost:3000/api/courses");
    const courses = await response.json();

    let html = "";

    for (let course of courses) {
        html += `
        <li>
        ${course.name} - ${course.instructor}
        <button onclick="editCourse(${course.id}, '${course.name}', '${course.instructor}')">Edit</button>
        <button onclick="deleteCourse(${course.id})">Delete</button>
        </li>
        `;
    }
    document.querySelector("#courseList").innerHTML = html;
}



async function deleteCourse(id) {
    await fetch(`http://localhost:3000/api/courses/${id}`, {
        method: "DELETE"
    });
    loadCourses();
}

async function editCourse(id, currentName, currentInstructor) {
    const newName = prompt("Enter new course name:", currentName);
    const newInstructor = prompt("Enter new instructor:", currentInstructor);

    if (!newName || !newInstructor) return;

    await fetch(`http://localhost:3000/api/courses/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
        name: newName,
        instructor: newInstructor
        })
    });
    loadCourses();
}