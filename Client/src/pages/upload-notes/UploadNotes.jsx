import React, { useState } from "react";
import * as XLSX from "xlsx";
import { useTable } from "react-table";
import RenderPage from "../../components/RenderPage";
import Navigator from "../../components/Navigator";

const UploadNotesComponent = () => {
  const [data, setData] = useState([]);
  const [columns, setColumns] = useState([]);
  const [error, setError] = useState("");

  const REQUIRED_HEADERS = ["Número de Carnet", "Evaluación", "Nota"];

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const fileName = file.name.toLowerCase();
    if (!fileName.endsWith(".xlsx") && !fileName.endsWith(".xls")) {
      setError("Solo se permiten archivos Excel (.xlsx, .xls).");
      setData([]);
      setColumns([]);
      return;
    }

    setError(""); // Limpia errores previos
    const reader = new FileReader();
    reader.onload = (e) => {
      const binaryStr = e.target.result;
      const workbook = XLSX.read(binaryStr, { type: "binary" });
      const sheetName = workbook.SheetNames[0]; // Leer la primera hoja
      const sheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });

      if (jsonData.length === 0) {
        setError("El archivo está vacío o tiene un formato inválido.");
        setData([]);
        setColumns([]);
        return;
      }

      const headers = jsonData[0]; // Primera fila como encabezados
      const rows = jsonData.slice(1); // Filas restantes como datos

      // Validar encabezados requeridos
      const missingHeaders = REQUIRED_HEADERS.filter(
        (header) => !headers.includes(header)
      );

      if (missingHeaders.length > 0) {
        setError(
          `El archivo no contiene las siguientes columnas requeridas: ${missingHeaders.join(
            ", "
          )}.`
        );
        setData([]);
        setColumns([]);
        return;
      }

      setColumns(
        headers.map((header) => ({ Header: header, accessor: header }))
      );
      setData(
        rows.map((row) =>
          Object.fromEntries(headers.map((header, i) => [header, row[i]]))
        )
      );
    };
    reader.readAsBinaryString(file);
  };

  const handleSave = () => {
    console.log("Notas guardadas:", data);
    alert("Las notas se han guardado exitosamente.");
  };

  const tableInstance = useTable({ columns, data });

  return (
    <>
      <Navigator />
      <div className="flex justify-center items-center px-8 my-12">
        <div className="max-w-4xl w-full p-6 bg-gray-50 rounded-lg shadow-2xl">
          <h1 className="text-3xl font-bold text-center mb-6">Subir Notas</h1>

          <div className="mb-6">
            <input
              type="file"
              accept=".xlsx, .xls"
              onChange={handleFileUpload}
              className="block w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-sm file:border-0 file:bg-gray-900 file:text-white hover:file:bg-gray-800"
            />
          </div>

          {error && <p className="text-red-600 mb-4">{error}</p>}

          {data.length > 0 && (
            <>
              <div className="overflow-auto max-h-96 mb-6 border border-gray-300 rounded-lg shadow-sm bg-white">
                <table
                  {...tableInstance.getTableProps()}
                  className="min-w-full table-auto"
                >
                  <thead className="bg-gray-200">
                    {tableInstance.headerGroups.map((headerGroup) => (
                      <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map((column) => (
                          <th
                            {...column.getHeaderProps()}
                            className="px-4 py-2 text-left text-sm font-medium text-gray-700"
                          >
                            {column.render("Header")}
                          </th>
                        ))}
                      </tr>
                    ))}
                  </thead>
                  <tbody {...tableInstance.getTableBodyProps()}>
                    {tableInstance.rows.map((row) => {
                      tableInstance.prepareRow(row);
                      return (
                        <tr
                          {...row.getRowProps()}
                          className="odd:bg-gray-50 even:bg-gray-100"
                        >
                          {row.cells.map((cell) => (
                            <td
                              {...cell.getCellProps()}
                              className="px-4 py-2 text-sm text-gray-600"
                            >
                              {cell.render("Cell")}
                            </td>
                          ))}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              <div className="w-full mx-auto flex justify-center items-center">
                <button
                  onClick={handleSave}
                  className="px-8 py-2 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-700 transition-all"
                >
                  Guardar Notas
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

const UploadNotes = () => {
  return <RenderPage component={<UploadNotesComponent />} />;
};

export default UploadNotes;
