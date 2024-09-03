let couCount = 1;
let error = document.querySelector(".error");
let time = null;
let result = document.querySelector('.result');


function addcourse() {
    couCount++;
    
    const courses = document.querySelector('.courses');

    let courDiv = document.createElement('div');
    courDiv.className = 'course';
    courDiv.innerHTML = `
        <div class="he" style="padding: 5px;">
        <h3 class="coursecunt">Course ${couCount}</h3>
        </div>
        <div class="text">
        <input type="text" placeholder="Enter course name" class="tex">
        </div>
        <div class="in">
        <input type="number" placeholder="Credit hour" min="1" max="100" id="credit-${couCount}" name="credit-${couCount}">
        <select>
            <option disabled selected>Choose Grade</option>
            <option value="4.00">A+</option>
            <option value="4.00">A</option>
            <option value="3.75">A-</option>
            <option value="3.50">B+</option>
            <option value="3.00">B</option>
            <option value="2.75">B-</option>
            <option value="2.50">C+</option>
            <option value="2.00">C</option>
            <option value="1.75">C-</option>
            <option value="1.00">D</option>
            <option value="0.00">F</option>
        </select>
            </div>`;
    courses.appendChild(courDiv);

    let gon = document.createElement("span");
    gon.className = 'x';
    gon.innerHTML = `X`;
    courDiv.appendChild(gon);
}

let more = document.querySelector(".more");
let moregpa = document.querySelector(".moregpa");


document.getElementById('gpaForm').addEventListener('submit', function (e) {
    e.preventDefault();
    
    result.style.display = "block";
    let totalPoints = 0;
    let totalCredits = 0;

    const courses = document.querySelectorAll('.course');

    let tableHtml = `
    <table>
        <thead>
            <tr>
                <th>No</th>
                <th>Course (optional)</th>
                <th>Credit Hours</th>
                <th>Grade</th>
            </tr>
        </thead>
        <tbody>`;

    let tbCount = 0;

    courses.forEach((course) => {
        let courseName = course.querySelector('input[type="text"]').value;
        let selectElement = course.querySelector('select');
        let creditElement = course.querySelector('input[type="number"]');

        let gradeValue = parseFloat(selectElement.value);
        let creditHour = parseFloat(creditElement.value);

        if (isNaN(gradeValue) || isNaN(creditHour)) {
            selectElement.classList.add("inva");
            creditElement.classList.add("inva");
            ka();

        } else {
            selectElement.classList.remove("inva");
            creditElement.classList.remove("inva");

            totalPoints += gradeValue * creditHour;
            totalCredits += creditHour;

            courseName.trim();
            tbCount++;
            tableHtml += `
            <tr>
                <td>${tbCount}.</td>
                <td>${courseName}</td>
                <td>${creditHour}</td>
                <td>${selectElement.options[selectElement.selectedIndex].text}</td>
            </tr>`;
        }
    });

    tableHtml += `</tbody> </table>`;

    const gpa = totalCredits > 0 ? (totalPoints / totalCredits).toFixed(2) : 0;
    result.innerHTML = `Your GPA is <span class="gpacolor">${gpa}</span>`;
    gpacolor = document.querySelector(".gpacolor");
    if (gpa >= 4.00) {
        gpacolor.style.backgroundColor = "green";
        gpacolor.style.color = "#fff";
    }
    else if (gpa >= 3.50) {
        gpacolor.style.backgroundColor = "#3bf00e";
    }
    else if (gpa >= 3.00) {
        gpacolor.style.backgroundColor = "#83e90f";
    }
    else if (gpa >= 2.50) {
        gpacolor.style.backgroundColor = "yellow";
    } else {
        gpacolor.style.color = "#fff";
        gpacolor.style.backgroundColor = "red";
    }


    more.innerHTML = `${tableHtml}`;
    moregpa.innerHTML = `<p class="tableGPA">TotalCredits: ${totalCredits}</p>
                         <p class="tableGPA">TotalPoints:${totalPoints}</p>
                         <p class="tableGPA">GPA : ${gpa}</p>`;

    showinfo.style.display = "block";
    reset.style.display = "block";


});

document.querySelector('.courses').addEventListener('click', function (event) {
    if (event.target.classList.contains('x')) {
        event.target.parentElement.remove();
        couCount--;
    }
});
let showmo = document.getElementById("showmore");
let exitt = document.querySelector('.exit');
let showinfo = document.querySelector('.Showinfo');
let reset = document.querySelector('.reset');

function showmor() {
    showmo.style.display = "flex";
    showinfo.style.display = "none";
}

function exit() {
    exitt.style.display = "block";
    showmo.style.display = "none";
    showinfo.style.display = "block";
}
function rese() {
    showmo.style.display = "none";
    showinfo.style.display = "none";
    reset.style.display = "none";
    result.style.display = "none";
}
function clearerror() {

    error.classList.add('erkanu');
    clearTimeout(time);
}
function ka() {
    if (time !== null) {
        clearTimeout(time);
    }
    error.classList.add("erkanu1");

    time = setTimeout(() => {
        error.classList.add('erkanu');

    }, 3000);
}
