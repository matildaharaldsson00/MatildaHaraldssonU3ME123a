"use strict"; 

// global variabel för sökrutan
// let inputCourse = document.getElementById("courses");

//globala variabel för att komma åt studenterna, lärarna och kurserna i databasen
let allTeachers = DATABASE.teachers;
let allStudents = DATABASE.students;
let allCourses = DATABASE.courses;

// funktion för att rensa sökrutan när man uppdaterar sidan
// window.onload = function() {
//     document.getElementById("courses").value = "";
// };

// funktion för att hitta kurserna i databasen baserat på kurs id
// function findCoursesByTitle() {
//     let course = DATABASE.courses.filter((course) => 
//     course.title.toLowerCase().includes(inputCourse.value.toLowerCase())
//     );
//     return course;
// }

// 
// function renderCourse(course) {
//     let divCourse = document.createElement("div");

//     let courseDiv = document.getElementById("searchCourseResult");
//     courseDiv.appendChild(divCourse);

//     divCourse.classList.add("course")
    
//     divCourse.innerHTML = `
//     <div>${course.title} Totalt ${course.totalCredits} högksolepoäng</div>
//     <div id=teacher>Lärare: ${allTeacherInfo}</div>
//     <div id=students>Studenter som gått kursen: ${allStudentInfo}</div>
//     `;
// }

// funktion som ska gå igenom varje kurs och lägger till HTML
// function renderCourses(courses) {
//     courses.forEach((course) => {
//         renderCourse(course);
//     });
// }
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

// information om studenterna
// function allStudentInfo(id) {
//     let courseId = DATABASE.courses[id].courseId;
//     let students = [];

//     for(let student of allStudents) {
//         for(let course of student.courses) {
//             if(course.courseId == courseId) {
//                 students.push(student);
//             }
//         }
//     }
//     return students.toString().split(",").join("");
// }

function allStudentInfo() {
    let studentBox = [];

    for(let i = 0; i < DATABASE.students.length; i++) {
        let div = document.createElement("div");
        for(let x = 0; x < DATABASE.students[i].courses.length; x++) {
            if(DATABASE.students[i].courses[x].courseId == DATABASE.courses[x].courseId && DATABASE.students[i].courses[x].passedCredits == DATABASE.courses.totalCredits) {
                let info = div.innerHTML = 
                `<div class="done">
                <h5>
                ${DATABASE.students[i].firstName} ${DATABASE.students[i].lastName}
                (${DATABASE.students[i].courses[x]} högskolepoäng)<br>
                ${DATABASE.students[i].courses[x].started.semester} ${DATABASE.students[i].courses[x].started.year}
                </h5>
                </div>`
                studentBox.push (info);
            } else if(DATABASE.students[i].courses[x].courseId == DATABASE.courses[x].courseId) {
                let info = div.innerHTML = 
                `<div class="not-done">
                <h5>
                ${DATABASE.students[i].firstName} ${DATABASE.students[i].lastName}
                (${DATABASE.students[i].courses[x].passedCredits} högskolepoäng)<br>
                ${DATABASE.students[i].courses[x].started.semester} ${DATABASE.students[i].courses[x].started.year}
                </h5>
                </div>`
                studentBox.push(info);
            }
        }
    }
    return studentBox.toString().split(",").join(" ");
}

// event-listener för att kära funktionerna och filtrera genom kurserna varje gång sök trycks
// inputCourse.addEventListener("keyup", function() {
//     let course = renderCourses();
//     let coursesDiv = document.getElementById("searchCourseResult");

//     coursesDiv.innerHTML = "";
//     renderCourses(course);

//     if(inputCourse.value == 0) {
//         coursesDiv.innerHTML = "";
//     }
// });

// det här gick inte bra! kolla på det!!!
// function markCourseResponsible() {
//     let responsible = DATABASE.courses[i].courseResponsible;

//     for(let i = 0; i < responsible.length; i++) {
//         let teacherName = DATABASE.teachers[i].firstName + lastName;
//     } if(teacherName == )
// }

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