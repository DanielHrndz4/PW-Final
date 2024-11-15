import React, { useState, useEffect } from "react";
import RenderPage from "../../components/RenderPage";
import { formatGrade } from "../../utils/functions/format.text";
import { cyclesAndAsignatures } from "../../constants/cycleandasignatures";
import Navigator from "../../components/Navigator";
import Paragraph from "../../utils/Paragraph";

const ViewQualificationsContent = () => {
  const [cycles, setCycles] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [menuVisible, setMenuVisible] = useState(false);
  const [expandedCycle, setExpandedCycle] = useState(null);

  useEffect(() => {
    setCycles(cyclesAndAsignatures);
  }, []);

  const [totalGrade, setTotalGrade] = useState(0);

  const calculateTotalGrade = (subject) => {
    let total = 0;

    subject.evaluations.forEach((evaluation) => {
      let evaluationTotal = 0;

      if (evaluation.grade) {
        evaluationTotal += evaluation.grade * (evaluation.weight / 10);
      }
      total += evaluationTotal;
    });

    return total;
  };

  const handleSubjectClick = (subject) => {
    setSelectedSubject(subject);
    setTotalGrade(calculateTotalGrade(subject));
  };

  const handleCycleClick = (cycleIndex) => {
    setExpandedCycle(expandedCycle === cycleIndex ? null : cycleIndex);
  };

  return (
    <>
      <Navigator />
      <div className="w-full flex flex-row min-h-screen">
        {/* Sidebar */}
        <div
          className={`max-w-[300px] w-full min-h-full p-6 shadow-lg border-r-[1px] border-gray-300 text-gray-900 transition-all duration-300 ${menuVisible ? "block" : "hidden md:block"
            }`}
        >
          <button
            className="md:hidden text-gray-900 font-semibold mb-4"
            onClick={() => setMenuVisible(!menuVisible)}
          >
            {menuVisible ? "Cerrar Menú" : "Abrir Menú"}
          </button>

          {cycles.length === 0 ? (
            <p className="text-gray-600">Cargando ciclos...</p>
          ) : (
            <>
              <h2
                className="text-xl font-semibold mb-4 text-gray-900 text-center"
                onClick={() => handleCycleClick(index)}
              >
                Ingeniería Informática
              </h2>
              {cycles.map((cycle, index) => (
                <div key={index} className="mb-4">
                  <h3
                    className="text-lg p-2 rounded-sm shadow-xl font-medium text-white cursor-pointer bg-gray-900"
                    onClick={() => handleCycleClick(index)}
                  >
                    {cycle.cycle}
                  </h3>

                  {expandedCycle === index && (
                    <ul
                      className="overflow-hidden transition-all duration-300 ease-in-out max-h-[500px] opacity-100"
                      style={{ maxHeight: expandedCycle === index ? '500px' : '0px', opacity: expandedCycle === index ? 1 : 0 }}
                    >
                      {cycle.subjects.map((subject, idx) => (
                        <li
                          key={idx}
                          className="cursor-pointer p-2 hover:bg-gray-50 border-b-[1px] font-medium border-black bg-gray-300 text-gray-800 hover:text-gray-900 transition duration-300 ease-in-out"
                          onClick={() => handleSubjectClick(subject)}
                        >
                          {subject.name}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </>
          )}
        </div>

        {/* Main Content */}
        <div className="w-full flex justify-center">
          <div className="w-full mx-auto min-h-full px-8 py-10 bg-white shadow-lg">
            {selectedSubject ? (
              <div>
                {/* Consulta Details */}
                <h3 className="text-4xl font-semibold text-blue-800 mb-4 text-center">Consultar Notas</h3>
                <div className="flex flex-row pb-5 pt-3">
                  <div className="flex flex-col w-full">
                    <Paragraph paragraph={`Alumno: 00015322 JONATHAN DANIEL HERNANDEZ GODOY`} styles={`text-gray-800 text-md`} />
                    <Paragraph paragraph={`Carrera: 3160 INGENIERIA INFORMATICA`} styles={`text-gray-800 text-md`} />
                  </div>
                  <div className="flex flex-col w-full">
                    <Paragraph paragraph={`Profesor: RI11991 MIGUEL ERNESTO RIVAS SERRANO`} styles={`text-gray-800 text-md`} />
                    <Paragraph paragraph={`Materia: 190156 ${selectedSubject.name} - Sección 02`} styles={`text-gray-800 text-md upperc`} />
                  </div>
                </div>

                {/* Subject Details and Evaluation Table */}

                <div className="overflow-x-auto shadow-lg rounded-lg border border-gray-200">
                  <table className="min-w-full bg-white border-collapse">
                    <thead className="bg-blue-100 text-gray-700">
                      <tr>
                        <th className="px-6 py-4 text-md font-semibold text-left border border-gray-300">Tipo de Evaluación</th>
                        <th className="px-6 py-4 text-md font-semibold text-left border border-gray-300">Ponderación</th>
                        <th className="px-6 py-4 text-md font-semibold text-left border border-gray-300">Fecha</th>
                        <th className="px-6 py-4 text-md font-semibold text-left border border-gray-300">Nota</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedSubject.evaluations.map((evaluation, idx) => (
                        <tr key={idx} className="hover:bg-blue-50 transition duration-300 ease-in-out">
                          <td className="px-6 py-3 text-sm text-gray-800 border border-gray-300">{evaluation.name || evaluation.type}</td>
                          <td className="px-6 py-3 text-sm text-gray-800 border border-gray-300">{evaluation.weight}</td>
                          <td className="px-6 py-3 text-sm text-gray-800 border border-gray-300">{evaluation.date}</td>
                          <td className="px-6 py-3 text-sm text-gray-800 border border-gray-300 font-semibold">{evaluation.grade !== null ? evaluation.grade : ""}</td>
                        </tr>
                      ))}

                      {selectedSubject.evaluations
                        .filter((evaluation) => evaluation.subtasks)
                        .map((evaluation, idx) =>
                          evaluation.subtasks.map((subtask, subIdx) => (
                            <tr key={subIdx} className="hover:bg-blue-50">
                              <td className="px-6 py-3 text-sm text-gray-800 border border-gray-300 pl-12">{subtask.name}</td>
                              <td className="px-6 py-3 text-sm text-gray-800 border border-gray-300"></td>
                              <td className="px-6 py-3 text-sm text-gray-800 border border-gray-300">{subtask.date}</td>
                              <td className="px-6 py-3 text-sm text-gray-800 border border-gray-300 pl-12">{subtask.grade !== null ? formatGrade(subtask.grade) : ""}</td>
                            </tr>
                          ))
                        )}

                      <tr className="hover:bg-blue-50">
                        <td className="px-6 py-3 text-sm text-gray-800 border border-gray-300"></td>
                        <td className="px-6 py-3 text-sm text-gray-800 border border-gray-300"></td>
                        <td className="px-6 py-3 text-md text-center text-gray-800 border border-gray-300 font-semibold uppercase">Total</td>
                        <td className="px-6 py-3 text-md text-gray-800 border border-gray-300 font-semibold">{formatGrade(totalGrade / 10)}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center mt-12">
                <div className="text-center mb-6">
                  <h2 className="text-3xl font-extrabold text-gray-800 mb-4">
                    ¿Estás listo para ver tus evaluaciones? 🎓
                  </h2>
                  <p className="text-xl text-gray-700">
                    Haz clic sobre una materia para consultar sus notas. 📚
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

      </div>
    </>

  );
};

const ViewQualifications = () => {
  return <RenderPage component={<ViewQualificationsContent />} />
}

export default ViewQualifications;
