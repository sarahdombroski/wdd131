// Sarah Dombroski

const grades = ['A', 'B', 'C'];

function getGPA(grade) {
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
    return points
}

const gpa = grades.map(getGPA);
const total = gpa.reduce((acc, curr) => acc + curr, 0);
const totalgpa = total / gpa.length;

console.log(totalgpa);