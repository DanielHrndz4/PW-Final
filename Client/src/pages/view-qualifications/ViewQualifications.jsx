import React, { useState, useEffect } from "react";
import RenderPage from "../../components/RenderPage";
import { formatGrade } from "../../utils/functions/format.text";
import { cyclesAndAsignatures } from "../../constants/cycleandasignatures";
import { Link, useLocation } from "react-router-dom";
import { RIGHT_ARROW } from "../../utils/Icons";

const ViewQualificationsContent = () => {
  const [cycles, setCycles] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [menuVisible, setMenuVisible] = useState(false);
  const [expandedCycle, setExpandedCycle] = useState(null);
  const location = useLocation().pathname.split("/");

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
      <div className="uppercase w-full px-4 py-1 border-b-[1px] border-gray-300 font-medium flex gap-1 text-gray-900">
        <Link to="/">
          <span className="hover:underline hover:cursor-pointer">Inicio</span>
        </Link>
        <span className="text-xl flex justify-center items-center">{RIGHT_ARROW()}</span>
        <Link to={`/${location[location.length - 1]}`}>
          <span className="hover:underline hover:cursor-pointer">
            {location[location.length - 1].replace("-", " ")}
          </span>
        </Link>
      </div>
      <div className="w-full flex flex-row min-h-screen bg-gray-50">
        <div
          className={`max-w-[250px] w-full min-h-full p-6 shadow-lg border-r-[1px] border-gray-300 text-gray-900 transition-all duration-300 ${
            menuVisible ? "block" : "hidden md:block"
          }`}
        >
          <button
            className="md:hidden text-gray-900 font-semibold mb-4"
            onClick={() => setMenuVisible(!menuVisible)}
          >
            {menuVisible ? "Cerrar Menú" : "Abrir Menú"}
          </button>

          {cycles.length === 0 ? (
            <p className="text-white">Cargando ciclos...</p>
          ) : (
            <>
              <h2
                className="text-xl font-semibold mb-4 text-gray-900"
                onClick={() => handleCycleClick(index)}
              >
                Ingenieria Informatica
              </h2>
              {cycles.map((cycle, index) => (
                <div key={index} className="mb-4">
                  <h3
                    className="text-lg p-2 rounded-sm shadow-xl font-medium text-white cursor-pointer bg-gray-900"
                    onClick={() => handleCycleClick(index)}
                  >
                    {cycle.cycle}
                  </h3>
                  {/* <hr className="border-1 w-[90%] m-auto border-gray-800"/> */}
                  {expandedCycle === index && (
                    <ul>
                      {cycle.subjects.map((subject, idx) => (
                        <li
                          key={idx}
                          className="cursor-pointer p-2 hover:bg-gray-50 border-b-[1px] font-medium border-black bg-gray-300 text-gray-800 hover:text-gray-900  transition duration-300 ease-in-out"
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

        <div className="w-[80%] mx-auto min-h-full px-8 py-6 bg-white">
          {selectedSubject ? (
            <div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                {selectedSubject.name}
              </h3>
              <table className="min-w-full rounded-lg table-auto bg-gray-100 border-2 border-gray-300 shadow-md">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="px-6 py-3 uppercase text-md font-bold text-gray-800 border-2 border-gray-300 text-center">
                      Tipo de Evaluación
                    </th>
                    <th className="px-6 py-3 uppercase text-md font-bold text-gray-800 border-2 border-gray-300 text-center">
                      Ponderacion
                    </th>
                    <th className="px-6 py-3 uppercase text-md font-bold text-gray-800 border-2 border-gray-300 text-center">
                      Fecha
                    </th>
                    <th className="px-6 py-3 uppercase text-md font-bold text-gray-800 border-2 border-gray-300 text-center">
                      Nota
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {selectedSubject.evaluations.map((evaluation, idx) => {
                    return (
                      <tr
                        key={idx}
                        className="hover:bg-gray-50 transition duration-300 ease-in-out"
                      >
                        <td className="px-6 py-2 text-sm text-gray-800 border-2 border-gray-300">
                          {evaluation.name || evaluation.type}
                        </td>
                        <td className="px-6 py-2 text-sm text-gray-800 border-2 border-gray-300">
                          {evaluation.weight}
                        </td>
                        <td className="px-6 py-2 text-sm text-gray-800 border-2 border-gray-300">
                          {evaluation.date}
                        </td>
                        <td className="px-6 py-2 text-sm text-gray-800 border-2 border-gray-300 font-semibold">
                          {evaluation.grade !== null ? evaluation.grade : ""}
                        </td>
                      </tr>
                    );
                  })}

                  {selectedSubject.evaluations
                    .filter((evaluation) => evaluation.subtasks)
                    .map((evaluation, idx) =>
                      evaluation.subtasks.map((subtask, subIdx) => (
                        <tr key={subIdx} className="hover:bg-gray-50">
                          <td className="px-6 py-2 text-sm text-gray-800 border-2 border-gray-300 pl-12">
                            {subtask.name}
                          </td>
                          <td className="px-6 py-2 text-sm text-gray-800 border-2 border-gray-300"></td>
                          <td className="px-6 py-2 text-sm text-gray-800 border-2 border-gray-300">
                            {subtask.date}
                          </td>
                          <td className="px-6 py-2 text-sm text-gray-800 border-2 border-gray-300 pl-12">
                            {subtask.grade !== null
                              ? formatGrade(subtask.grade)
                              : ""}
                          </td>
                        </tr>
                      ))
                    )}
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-2 text-sm text-gray-800 border-2 border-gray-300"></td>
                    <td className="px-6 py-2 text-sm text-gray-800 border-2 border-gray-300"></td>
                    <td className="px-6 py-2 text-md text-center text-gray-800 border-2 border-gray-300 font-semibold uppercase">
                      Total
                    </td>
                    <td className="px-6 py-2 text-md text-gray-800 border-2 border-gray-300 font-semibold">
                      {formatGrade(totalGrade / 10)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-gray-700">
              Selecciona una materia para ver las evaluaciones.
            </p>
          )}
        </div>
      </div>
    </>
  );
};

const ViewQualifications = () => {
  return <RenderPage component={<ViewQualificationsContent />} />;
};

export default ViewQualifications;
