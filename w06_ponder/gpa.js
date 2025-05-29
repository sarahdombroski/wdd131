function getGrades(){
    // SARAH DOMBROSKI
    
    // get grades (string) from input
    // convert string to array string.split(',')
    const grades = document.getElementById('grades').value;
    const allGrades = grades.split(',');
    const clean = allGrades.map((grade) => grade.trim().toUpperCase());
    // console.log(clean);
    return clean;
}

function lookupGrade(grade) {
    // convert to point value
    let points = 0;
    if (grade === 'A') {
        points = 4;
    }
    else if (grade === 'B') {
        points = 3;
    }
    else if (grade === 'C') {
        points = 2;
    }
    else if (grade === 'D') {
        points = 1;
    }
    return points;
}

function calculateGPA(grades) {
    // total all point values, divide by number of grades to get GPA
    const totalGrades = grades.map((grade) => lookupGrade(grade));
    const counted = totalGrades.reduce((acc, cur) => acc + cur, 0);
    //console.log((counted / grades.length).toFixed(2));
    return (counted / grades.length).toFixed(2);
}

function displayGPA(gpa) {
    // output gpa
    const output = `Your GPA is ${gpa}`;
    document.getElementById('output').innerHTML = output;
}

function clickHandler() {
    const grades = getGrades();
    const gpa = calculateGPA(grades);
    displayGPA(gpa);
}

// event listener
document.querySelector('#submitButton').addEventListener('click', clickHandler);