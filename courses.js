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
    <h2>${allCourses.title} (Totalt ${allCourses.totalCredits} högskolepoäng)</h2>
    <h3>Lärare:</h3>
    <div id=teachers-div>
    ${allTeacherInfo(id)}
    </div>
    <h3>Studenter:</h3>
    <div id=course-div>
    ${allStudentInfo(id)}
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

function passedCredits(student) {
    let credits = [];
    for(let course of student.courses) {
        credits.push(course.passedCredits);
    }
    return credits;
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
function allStudentInfo(id) {
    let courseId = DATABASE.courses[id].courseId;
    let students = [];

    for(let student of allStudents) {
        for(let course of student.courses) {
            if(course.courseId == courseId) {
                students.push(student);
            }
        }
    }
    return students.toString().split(",").join("");
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