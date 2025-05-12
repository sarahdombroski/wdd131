// Sarah Dombroski

const PI = 3.14;
let area = 0;
area = circleArea(3);
console.log("Area:", area)
area = circleArea(4);
console.log("Area:", area)

function circleArea(radius) {
    area = radius * radius * PI;
    return area
}