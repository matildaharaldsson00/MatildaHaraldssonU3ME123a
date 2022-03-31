"use strict"; 

//globala variabel för att komma åt studenterna, lärarna och kurserna i databasen
let allTeachers = DATABASE.teachers;
let allStudents = DATABASE.students;
let allCourses = DATABASE.courses;

// funktion som ska gå igenom varje kurs och lägger till HTML, info om lärare och mera
function renderCourse(id) {
    let div = document.createElement("div");
    div.id = "course-div";
    div.innerHTML += `
    <h2>${coursesTitle(id)} (Totalt ${totalCourseCredits(id)} högskolepoäng)</h2>
   <div id="techer-div">
    <h3>Lärare:</h3>
    <div>${allTeacherInfo(id)}</div>
    </div>
    <div id="resp-div">
    <h3>Kursansvarig</h3>
    <div id="resp-info">${courseResponsible(id)}</div>
    </div>
    <div id="students-div">
    <h3>Studenter:</h3>
    <div>${allStudentInfo(id)}</div>
    </div>
    `;
    return div;
}

// funktion för att hitta alla kurserna
function renderCourses(courses) {
    let coursesElement = document.getElementById("searchCourseResult");

    for(let course of courses) {
        let courseElement = renderCourse(course.courseId);
        coursesElement.appendChild(courseElement);
    }
}

// funktion för att hitta titlarna på kurserna
function coursesTitle(id) {
    let course = DATABASE.courses[id];
    return course.title;
}

// funktion för att få fram hur många högskolepoäng varje kurs har
function totalCourseCredits(id) {
    let course = allCourses[id];
    return course.totalCredits;
}

// funktion för att få fram hur många högskolepoäng varje elev har
function passedCredits(takenCourse, student) {
    let passedCredit = student.courses.filter((course) => course.courseId == takenCourse.courseId).map((course) => course.passedCredits);
    return passedCredit;
}

// funktion som hittar kursansvarig
function courseResponsible(id) {
    let course = DATABASE.courses[id];
    let teachersNames = allTeachers.map((teacher) => teacher.firstName + " " + teacher.lastName + " " + `(${teacher.post})`);
    let resp = course.courseResponsible;
    return teachersNames[resp];
}

// info om lärarna
function allTeacherInfo(id) {
    let course = DATABASE.courses[id];
    let teachersNames = allTeachers.map((teacher) => teacher.firstName + " " + teacher.lastName + " " + `(${teacher.post})`);
    let teachers = [];

    for(let i = 0; i < teachersNames.length; i++) {
        if(course.teachers.some((value) => value == i)) {
            let div = document.createElement("div");
            let info = div.innerHTML = `<p>${teachersNames[i]}</p>`
            teachers.push(info);
        }
    }
    return teachers.toString().split(",").join(" ");
}

// funktion för att se när kursen startar
function courseStarted(takenCourse, student) {
    let courseStart = student.courses.filter((course) => course.courseId == takenCourse.courseId).map((course) => `${course.started.semester} ${course.started.year}`);
    return courseStart;
}

// funktion för informationen om studenterna, se vilka studenter som är klara med kurserna och inte
function allStudentInfo(id) {
    let courseId = DATABASE.courses[id].courseId;
    let students = allStudents.filter((student) => student.courses.some((course) => course.courseId == courseId));
    let studentsDiv = [];
        for(let student of students) {
            let courseById = student.courses.filter((course) => course.courseId == courseId);
            for(let i = 0; i < courseById.length; i++) {
                if(passedCredits(courseById[i], student)[i] == DATABASE.courses[id].totalCredits) {
                    let div = document.createElement("div");
                    let info = div.innerHTML = `<div class="done">
                    <p>${student.firstName} ${student.lastName} (${passedCredits(courseById[i], student)[i]} högskolepoäng)</p>
                    <h5>${courseStarted(courseById[i], student)[i]}</h5>
                    </div>`
                    studentsDiv.push(info);
                } else {
                    let div = document.createElement("div");
                    let info = div.innerHTML = `<div class="not-done">
                    <p>${student.firstName} ${student.lastName} (${passedCredits(courseById[i], student)[i]} högskolepoäng)</p>
                    <h5>${courseStarted(courseById[i], student)[i]}</h5>
                    </div>`
                    studentsDiv.push(info);
                }
            }
        }
    return studentsDiv.toString().split(",").join(" ");
}

// funktion för att få upp sökresutlatet på sidan, rätt info 
function inputResult() {
    let arrayResult = [];
    let input = document.getElementById("courses");

    for(let i = 0; i < allCourses.length; i++) {
        document.querySelector("#searchCourseResult").innerHTML = "";
        if("" == input.value) {
            document.querySelector("#searchCourseResult").innerHTML = "";
        } else if (allCourses[i].title.toLowerCase().includes(input.value.toLowerCase())) {
            arrayResult.push(allCourses[i]);
        }
    }
    renderCourses(arrayResult);
}

document.getElementById("courses").addEventListener("keyup", inputResult);