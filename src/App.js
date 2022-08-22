import { useState } from "react";

import {
  getEmployeesRows,
  getMaxTimeEmployeesPair,
} from "./utilities/employees";

import CsvInput from "./components/CsvInput/CsvInput";
import Table from "./components/Table/Table";
import Layout from "./components/Layout/Layout";

function App() {
  const [maxTimeEmployeesPair, setMaxTimeEmployeesPair] = useState(null);
  const onFileSelect = (csvData) => {
    setMaxTimeEmployeesPair(getMaxTimeEmployeesPair(csvData));
  };
  const headers = [
    { key: "emp1", value: "Employee ID #1" },
    { key: "emp2", value: "Employee ID #2" },
    { key: "projectId", value: "Project ID" },
    { key: "workingDays", value: "Days worked" },
  ];
  let rows = [];
  if (maxTimeEmployeesPair) {
    rows = getEmployeesRows(maxTimeEmployeesPair);
  }
  return (
    <Layout>
      <h1>Smira Challenge</h1>
      <CsvInput onFileSelect={onFileSelect} />
      {<Table headers={headers} rows={rows} />}
    </Layout>
  );
}

export default App;
