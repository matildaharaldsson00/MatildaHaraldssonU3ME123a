"use strict";

// global variabel för sökrutan
let input = document.getElementById("searchBoxStudent");

// funktion för att hitta studenerna i databasen baserat på deras efternamn
function findStudentByLastName() {
    let student = DATABASE.students.filter((student) =>
    student.lastName.toLowerCase().includes(input.ariaValueMax.toLowerCase())
    );

    return student; 
}

// funktion för att skapa studenten med dennes information
function renderStudent(student) {
    let div = document.createElement("div");

    let studentsDiv = document.getElementById("searchResult");
    studentsDiv.appendChild(div);

    let credits = totalCredits(student);
    let foundCourses = findCourseById(student);

    div.classList.add("student")

    div.innerHTML = `
        <div>${student.firstName} ${student.lastName} (Totala: ${credits} högskolepoäng)</div>
        <div id=courses>Kurser:</div>
    `;

    for(let i = 0; i < foundCourses.length; i++) {
        let foundCourse = foundCourses[i];

        let courseTitle = document.createElement("div");
        courseTitle.classList.add("course");
        div.appendChild(courseTitle);

        courseTitle.innerText = foundCourse.title;

        for(let i = 0; i < foundCourses.length; i++) {
            let student = DATABASE.students[i];
        }

        let passedCredits = student.courses[i].passedCredits;
        let semester = student.courses[i].started.semester;
        let year = student.courses[i].started.year;

        let courseInfo = document.createElement("p");
        courseTitle.appendChild(courseInfo);
        courseInfo.innerText = termin + " " + år + " " + "(" + passedCredits + " " + "av" + " " + foundCourse.totalCredits + " " + "högskolepoäng" + ")";

        if(passedCredits == foundCourse.totalCredits) {
            let course = courseInfo.parentElement;
            course.style.backgroundColor = "green";
        }
    }
}