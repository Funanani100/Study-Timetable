// Array to store subjects and default study hours per day
let subjects = [];
let studyHoursPerDay = 2; // Default study hours per day

// Function to add a new subject
function addSubject() {
  const subjectName = document.getElementById("subjectName").value;
  const difficulty = document.getElementById("difficulty").value;

  // Add subject to the subjects array
  subjects.push({ name: subjectName, difficulty: difficulty });
  
  // Update and display the timetable
  generateTimetable();
}

// Function to remove a subject by index
function removeSubject(index) {
  subjects.splice(index, 1);
  
  // Update and display the timetable
  generateTimetable();
}

// Function to generate and display the timetable
function generateTimetable() {
  const timetableDiv = document.getElementById("timetable");
  timetableDiv.innerHTML = "";

  // Create a table to display the timetable
  const table = document.createElement("table");
  table.classList.add("timetable");

  // Create header row for the table
  const headerRow = document.createElement("tr");
  const headers = ["Subject Name", "Study Hours", "Days Needed", "Remove"];

  // Populate header cells with text content
  headers.forEach(headerText => {
    const headerCell = document.createElement("th");
    headerCell.textContent = headerText;
    headerRow.appendChild(headerCell);
  });

  table.appendChild(headerRow);

  // Calculate total study hours and days needed
  const totalStudyHours = subjects.reduce(
    (acc, subject) => acc + calculateStudyHours(subject.difficulty),
    0
  );
  const totalDays = Math.ceil(totalStudyHours / studyHoursPerDay);

  // Populate rows with subject information
  subjects.forEach((subject, index) => {
    const studyHours = calculateStudyHours(subject.difficulty);
    const daysNeeded = Math.ceil(studyHours / studyHoursPerDay);

    const row = document.createElement("tr");

    // Create cells and populate with subject information
    const nameCell = document.createElement("td");
    nameCell.textContent = subject.name;
    row.appendChild(nameCell);

    const studyHoursCell = document.createElement("td");
    studyHoursCell.textContent = studyHours;
    row.appendChild(studyHoursCell);

    const daysNeededCell = document.createElement("td");
    daysNeededCell.textContent = daysNeeded;
    row.appendChild(daysNeededCell);

    const removeCell = document.createElement("td");
    const removeButton = document.createElement("button");
    removeButton.textContent = "Remove";
    removeButton.addEventListener("click", () => removeSubject(index));
    removeCell.appendChild(removeButton);
    row.appendChild(removeCell);

    table.appendChild(row);
  });

  // Display the timetable table
  timetableDiv.appendChild(table);

  // Display total days needed to cover all subjects
  const daysDiv = document.createElement("div");
  daysDiv.textContent = `Total days needed to cover all subjects: ${totalDays}`;
  daysDiv.style.color = "red";
  timetableDiv.appendChild(daysDiv);
}

// Function to calculate study hours based on difficulty level
function calculateStudyHours(difficulty) {
  if (difficulty === "easy") {
    return 1;
  } else if (difficulty === "medium") {
    return 2;
  } else {
    return 3;
  }
}

// Function to update study hours per day and regenerate timetable
function updateStudyHoursPerDay() {
  studyHoursPerDay = document.getElementById("studyHoursPerDay").value;
  generateTimetable();
}

// Function to save timetable data as a PDF
function saveTimetable() {
  // Map subjects array to get data for PDF
  const timetableData = subjects.map(subject => ({
    name: subject.name,
    studyHours: calculateStudyHours(subject.difficulty)
  }));

  // Save timetable data to local storage
  localStorage.setItem('timetable', JSON.stringify(timetableData));

  // Create a PDF document using jsPDF library
  const pdf = new jsPDF();
  pdf.text('Study Timetable', 20, 10);
  pdf.text('---------------------', 20, 15);

  // Add subject information to the PDF
  timetableData.forEach((subject, index) => {
    const yPos = 20 + index * 10;
    pdf.text(`${subject.name}: ${subject.studyHours} hours`, 20, yPos);
  });

  // Save the PDF file and show success alert
  pdf.save('study_timetable.pdf');
  alert('Timetable Saved Successfully as PDF!');
}
