import React, { useState, useEffect } from "react";
import RenderPage from "../../components/RenderPage";

const cyclesAndAsignatures = [
  {
    cycle: "Ciclo 01/2024",
    subjects: [
      {
        name: "Mathematics",
        section: "A",
        schedule: "Mon-Wed-Fri 9:00 AM - 11:00 AM",
        students: [
          { name: "John Doe", id: "12345" },
          { name: "Jane Smith", id: "67890" },
        ],
      },
      {
        name: "Science",
        section: "B",
        schedule: "Tue-Thu 1:00 PM - 3:00 PM",
        students: [
          { name: "Alice Brown", id: "54321" },
          { name: "Bob White", id: "98765" },
        ],
      },
    ],
  },
  {
    cycle: "Ciclo 02/2024",
    subjects: [
      {
        name: "History",
        section: "C",
        schedule: "Mon-Wed-Fri 10:00 AM - 12:00 PM",
        students: [
          { name: "Charlie Black", id: "11223" },
          { name: "David Green", id: "44556" },
        ],
      },
      {
        name: "Geography",
        section: "D",
        schedule: "Tue-Thu 2:00 PM - 4:00 PM",
        students: [
          { name: "Eva Blue", id: "66778" },
          { name: "Frank Yellow", id: "99001" },
        ],
      },
    ],
  },
];

const ViewEnrolledStudents = () => {
  const [subjects, setSubjects] = useState([]);  // Estado para las materias
  const [selectedSubject, setSelectedSubject] = useState(null);  // Estado para la materia seleccionada

  const currentCycle = "01/2024";  // Ciclo actual

  // Aquí se cargan las materias correspondientes al ciclo
  useEffect(() => {
    const subjectsInCycle = cyclesAndAsignatures
      .find(cycle => cycle.cycle === `Ciclo ${currentCycle}`)
      ?.subjects;

    setSubjects(subjectsInCycle || []);  // Asegúrate de asignar un array vacío si no hay materias
  }, [currentCycle]);

  // Función para mostrar los estudiantes de una asignatura
  const showStudentsInSubject = (subjectName) => {
    const subject = cyclesAndAsignatures
      .find(cycle => cycle.cycle === `Ciclo ${currentCycle}`)  // Buscar el ciclo actual
      ?.subjects.find(subject => subject.name === subjectName);  // Buscar la asignatura dentro del ciclo actual

    return subject ? subject.students : [];
  };

  // Función para obtener los detalles de una asignatura
  const getSubjectDetails = (subjectName) => {
    const subject = cyclesAndAsignatures
      .find(cycle => cycle.cycle === `Ciclo ${currentCycle}`)
      ?.subjects.find(subject => subject.name === subjectName);

    return subject || {};
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-6">View Enrolled Students</h1>

      {/* Lista de asignaturas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {subjects && subjects.length > 0 ? (
          subjects.map((subject, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
              onClick={() => setSelectedSubject(subject.name)}  // Actualizar la materia seleccionada
            >
              <h2 className="text-xl font-semibold text-gray-800">{subject.name}</h2>
            </div>
          ))
        ) : (
          <p className="text-gray-600">No subjects available for this cycle.</p>
        )}
      </div>

      {/* Detalles de la asignatura seleccionada */}
      {selectedSubject && (
        <div className="mt-8 p-6 bg-gray-50 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Subject: {selectedSubject}
          </h2>

          {/* Mostrar los detalles de la asignatura */}
          {getSubjectDetails(selectedSubject) && (
            <>
              <p className="text-lg text-gray-600 mb-2">
                <strong>Section:</strong> {getSubjectDetails(selectedSubject).section}
              </p>
              <p className="text-lg text-gray-600 mb-4">
                <strong>Schedule:</strong> {getSubjectDetails(selectedSubject).schedule}
              </p>
            </>
          )}
          
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Enrolled Students</h3>

          {/* Mostrar los estudiantes de la asignatura seleccionada */}
          {showStudentsInSubject(selectedSubject).length === 0 ? (
            <p className="text-gray-600">No students enrolled in this subject.</p>
          ) : (
            <ul className="space-y-4">
              {showStudentsInSubject(selectedSubject).map((student, index) => (
                <li key={index} className="flex justify-between items-center p-4 bg-white rounded-lg shadow-sm hover:bg-gray-100">
                  <span className="text-gray-800">{student.name}</span>
                  <span className="text-gray-500 text-sm">{student.id}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

const ViewStudents = () => {
  return <RenderPage component={<ViewEnrolledStudents />} />;
};

export default ViewStudents;
