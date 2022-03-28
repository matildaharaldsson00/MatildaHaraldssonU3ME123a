"use strict"; 

// global variabel för sökrutan
let inputCourse = document.getElementById("courses");

//global variabel för att komma åt lärarna i databasen
let allTeachers = DATABASE.teachers;

// funktion för att rensa sökrutan när man uppdaterar sidan
window.onload = function() {
    document.getElementById("courses").value = "";
};

// funktion för att hitta kurserna i databasen baserat på kurs id
function findCoursesByTitle() {
    let course = DATABASE.courses.filter((course) => 
    course.title.toLowerCase().includes(inputCourse.value.toLowerCase())
    );
    return course;
}

// funktion för att skapa kursen med information
function renderCourse(course) {
    let divCourse = document.createElement("div");

    let courseDiv = document.getElementById("searchCourseResult");
    courseDiv.appendChild(divCourse);

    divCourse.classList.add("course")
    
    divCourse.innerHTML = `
    <div>${course.title} Totalt ${course.totalCredits} högksolepoäng</div>
    <div id=teacher>Lärare:</div>
    `;
}

function allTeacherInfo(id) {
    let course = DATABASE.courses[i];
    let teachersNames = allTeachers.map((teacher) => teacher.firstName + " " + teacher.lastName + " " + `(${teacher.post})`);
    let teachers = [];

    for(let i = 0; i < teachersNames.length; i++) {
        if(course.teachers.some((value) => value == i)) {
            let div = document.createElement("div");
            let info = div.innerHTML = `<p>${teachersNames[i]}</p>`
        }
    }
    return teachers.toString().split(",").join(" ");
}

// funktion som ska gå igenom varje kurs och lägger till HTML
function renderCourses(courses) {
    courses.forEach((course) => {
        renderCourse(course);
    });
}

// funktion som hittar kursansvarig
function courseResponsible(id) {
    let course = DATABASE.courses[i];
    let teachersNames = allTeachers.map((teacher) => teacher.firstName + " " + teacher.lastName + " " + `(${teacher.post})`);
    let res = course.courseResponsible;
    return teachersNames[res];
}

// info om lärarna
function allTeacherInfo(id) {
    let course = DATABASE.courses[i];
    let teachersNames = allTeachers.map((teacher) => teacher.firstName + " " + teacher.lastName + " " + `(${teacher.post})`);
    let teacher = [];

    for(let i = 0; i < teachersNames.length; i++) {
        if(course.teachers.some((value) => value == i)) {
            let div = document.createElement("div");
            let info = div.innerHTML = `<p>${teachersNames[i]}</p>`
        }
    }
    return teachers.toString().split(",").join(" ");
}

// student information

// funktion för att hitta lärare 
function allCourseTheachers(id) {
    let course = DATABASE.courses[i];
    let teachersNames = allTeachers.map((teacher) => teacher.firstName + " " + teacher.lastName + " " + `(${teacher.post})`);
    let teachers = [];
    for(let i = 0; i < teachers.length; i++) {
        if(course.teachers.some((value) => value == i)){
            let div = document.createElement("div");
            let content = div.innerHTML = `<p>${teachersNames[i]}</p>`
            teachers.push(content);
        }
    }
    return teachers.toString().split(".").join(" ");
}

//funktion för att hitta studenterna för varje kurs
function allCourseStudents(id) {
    let courseId = DATABASE.courses[i].courseId;
    let students = [];
    for(let student of allstudents) {
        console.log(courses.courseId, courseId)
            if(courses.courseId == courseId) {
                students.push(student);
            }
    }
}



// event-listener för att kära funktionerna och filtrera genom kurserna varje gång sök trycks
inputCourse.addEventListener("keyup", function() {
    let course = findCoursesByTitle();
    let coursesDiv = document.getElementById("searchCourseResult");

    coursesDiv.innerHTML = "";
    renderCourses(course);

    if(inputCourse.value == 0) {
        coursesDiv.innerHTML = "";
    }
});