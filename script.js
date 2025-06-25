const subjectsDiv = document.getElementById('subjects');
const addSubjectBtn = document.getElementById('addSubjectBtn');
const removeSubjectBtn = document.getElementById('removeSubjectBtn');
const calculateBtn = document.getElementById('calculateBtn');
const result = document.getElementById('result');

const gradePoints = {
  'S': 10,
  'A+': 9,
  'A': 8.5,
  'B+': 8,
  'B': 7.5,
  'C+': 7,
  'C': 6.5,
  'D': 6,
  'P': 5.5,
  'F': 0
};

function createSubjectInput() {
    const subjectDiv = document.createElement('div');
    subjectDiv.classList.add('subject');

    let gradeOptions = '';
    for (let grade in gradePoints) {
    gradeOptions += `<option value="${grade}">${grade}</option>`;
    }

    subjectDiv.innerHTML = `
    <select>${gradeOptions}</select>
    <input type="number" placeholder="Credit" min="1" step="1">
    `;
    subjectsDiv.appendChild(subjectDiv);
}

createSubjectInput();

addSubjectBtn.addEventListener('click', () => {
  createSubjectInput();
});

removeSubjectBtn.addEventListener('click', () => {
  const subjects = document.querySelectorAll('.subject');
  if (subjects.length > 1) {
    subjects[subjects.length - 1].remove();
  } else {
    alert("At least one subject is required.");
  }
});

calculateBtn.addEventListener('click', () => {
  const subjects = document.querySelectorAll('.subject');
  let totalPoints = 0;
  let totalCredits = 0;

  for (let sub of subjects) {
    const select = sub.querySelector('select');
    const input = sub.querySelector('input');
    const grade = select.value;
    const credit = parseFloat(input.value);

    if (isNaN(credit)) continue;

    if (credit < 0) {
      result.textContent = "Negative credit values are not accepted!";
      return;
    }

    if (gradePoints.hasOwnProperty(grade)) {
      const gradePoint = gradePoints[grade];
      totalPoints += gradePoint * credit;
      totalCredits += credit;
    }
  }

  if (totalCredits === 0) {
    result.textContent = "Please enter valid data!";
  } else {
    const sgpa = (totalPoints / totalCredits).toFixed(2);
    result.textContent = `Your SGPA is: ${sgpa}`;
  }
});
