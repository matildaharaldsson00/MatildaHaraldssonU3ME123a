"use strict";

// global variabel för sökrutan
let input = document.getElementById("students");

// funktion för att rensa sökrutan när man uppdaterar sidan
window.onload = function() {
    document.getElementById("students").value = "";
};

// funktion för att hitta studenerna i databasen baserat på deras efternamn
function findStudentsByLastName() {
    let student = DATABASE.students.filter((student) =>
    student.lastName.toLowerCase().includes(input.value.toLowerCase())
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
        <div>${student.firstName} ${student.lastName} (Totalt ${credits} högskolepoäng)</div>
        <div id=courses>Kurser:</div>
    `;

    for(let i = 0; i < foundCourses.length; i++) {
        let foundCourse = foundCourses[i];

        let courseTitle = document.createElement("div");
        courseTitle.classList.add("course");
        div.appendChild(courseTitle);

        courseTitle.innerText = 
        foundCourse.title;

        for(let i = 0; i < foundCourses.length; i++) {
            let student = DATABASE.students[i];
        }

        let passedCredits = student.courses[i].passedCredits;
        let semester = student.courses[i].started.semester;
        let year = student.courses[i].started.year;

        let courseInfo = document.createElement("p");
        courseTitle.appendChild(courseInfo);
        courseInfo.innerText = semester + " " + year + " " + "(" + passedCredits + " " + "av" + " " + foundCourse.totalCredits + " " + "högskolepoäng" + ")";

        if(passedCredits == foundCourse.totalCredits) {
            let course = courseInfo.parentElement;
            course.style.backgroundColor = "green";
        }
    }
}

// funktion som ska gå igenom varje student och lägger till HTML
function renderStudents(students) {
    students.forEach((student) => {
        renderStudent(student);
    });
}

// funktion för att räkna ut de totala högskolepoängen för en student
function totalCredits(student) {
    let credit = [];
    for(let course of student.courses) {
        credit.push(course.passedCredits);
    }
    let totalSum = 0;
    for(let i = 0; i < credit.length; i++) {
        totalSum += credit[i];
    }
    return totalSum;
}

// funktion som hittar kurserna baserat på deras id
function findCourseById(student) {
    let foundCourses = [];
    for(let i = 0; i < student.courses.length; i++) {
        foundCourses.push(
            DATABASE.courses.find((course) => {
                return course.courseId == student.courses[i].courseId;
            })
        );
    }
    return foundCourses;
}

// event-listener för att köra funktionerna och filtrera genom studenterna varje gång sök trycks
input.addEventListener("keyup", function() {
    let student = findStudentsByLastName();
    let studentsDiv = document.getElementById("searchResult");

    studentsDiv.innerHTML = "";
    renderStudents(student);

    if(input.value == 0) {
        studentsDiv.innerHTML = "";
    }
});