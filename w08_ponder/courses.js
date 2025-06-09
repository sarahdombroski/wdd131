// courses.js
// SARAH DOMBROSKI
const aCourse = {
  code: "CSE121b",
  name: "Javascript Language",
  sections: [ 
    { sectionNum: 1, roomNum: 'STC 353', enrolled: 26, days: 'TTh', instructor: 'Bro T'},
    { sectionNum: 2, roomNum: 'STC 347', enrolled: 28, days: 'TTh', instructor: 'Sis A'}],
    enrollStudent: function(sectionNum) {
        const index = this.sections.findIndex((section) => section.sectionNum == sectionNum);
        if (index >= 0) {
            this.sections[index].enrolled ++;
            sectionTable(this.sections);
        }
    },
    dropStudent: function(sectionNum) {
        const index = this.sections.findIndex((section) => section.sectionNum == sectionNum);
        if (index >= 0) {
            this.sections[index].enrolled --;
            sectionTable(this.sections);
        }
    }
};

function setCourse(course) {
    const name = document.getElementById('courseName');
    const code = document.getElementById('courseCode');

    name.textContent = course.name;
    code.textContent = course.code;
}

function singleSection(s) {
    const html =  `
        <tr>
          <th>${s.sectionNum}</th>
          <th>${s.roomNum}</th>
          <th>${s.enrolled}</th>
          <th>${s.days}</th>
          <th>${s.instructor}</th>
        </tr>
        `;
    return html;
}

function sectionTable(sections) {
    const allSections = sections.map(singleSection);
    document.getElementById('sections').innerHTML = allSections.join('');
}

document.querySelector("#enrollStudent").addEventListener('click', function() {
    const sectionNum = document.getElementById("sectionNumber").value;
    aCourse.enrollStudent(sectionNum);
})
document.querySelector("#dropStudent").addEventListener('click', function() {
    const sectionNum = document.getElementById("sectionNumber").value;
    aCourse.dropStudent(sectionNum);
})

setCourse(aCourse);
sectionTable(aCourse.sections);