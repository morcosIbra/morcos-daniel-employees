import { getDiffinDays } from "./timeUtils";

export const getMaxTimeEmployeesPair = (employees) => {
  let pairs = {};
  for (let emp1Index = 0; emp1Index < employees.length - 1; emp1Index++) {
    const emp1 = employees[emp1Index];
    for (
      let emp2Index = emp1Index + 1;
      emp2Index < employees.length;
      emp2Index++
    ) {
      const emp2 = employees[emp2Index];
      if (emp1.ProjectID === emp2.ProjectID) {
        const projectId = emp1.ProjectID;
        const dateFromEmp1 = new Date(emp1.DateFrom);
        const dateToEmp1 =
          emp1.DateTo === "NULL" ? new Date() : new Date(emp1.DateTo);
        const dateFromEmp2 = new Date(emp2.DateFrom);
        const dateToEmp2 =
          emp2.DateTo === "NULL" ? new Date() : new Date(emp2.DateTo);
        const startDate =
          dateFromEmp1 <= dateFromEmp2 ? dateFromEmp2 : dateFromEmp1;
        const endDate = dateToEmp1 <= dateToEmp2 ? dateToEmp1 : dateToEmp2;
        if (startDate <= endDate) {
          const projectDays = getDiffinDays(startDate, endDate);
          if (pairs[`${emp1.EmpID}-${emp2.EmpID}`]) {
            if (pairs[`${emp1.EmpID}-${emp2.EmpID}`].projectsDays[projectId]) {
              pairs[`${emp1.EmpID}-${emp2.EmpID}`].projectsDays[projectId] = 0;
            }
            pairs[`${emp1.EmpID}-${emp2.EmpID}`].projectsDays[projectId] +=
              projectDays;
            pairs[`${emp1.EmpID}-${emp2.EmpID}`].totalDays += projectDays;
          } else {
            pairs[`${emp1.EmpID}-${emp2.EmpID}`] = {
              totalDays: projectDays,
              projectDays: {
                [projectId]: projectDays,
              },
              employeesIds: [emp1.EmpID, emp2.EmpID],
            };
          }
        }
      }
    }
  }
  return Object.keys(pairs).reduce(
    (maxTimePair, pairKey) => {
      return pairs[pairKey].totalDays > maxTimePair.totalDays
        ? pairs[pairKey]
        : maxTimePair;
    },
    { totalDays: 0 }
  );
};

export const getEmployeesRows = (maxTimeEmployeesPair) =>
  Object.keys(maxTimeEmployeesPair.projectDays).map((projectId) => {
    return {
      key: projectId,
      cols: [
        { key: "emp1", value: maxTimeEmployeesPair.employeesIds[0] },
        { key: "emp2", value: maxTimeEmployeesPair.employeesIds[1] },
        { key: "projectId", value: projectId },
        {
          key: "workingDays",
          value: maxTimeEmployeesPair.projectDays[projectId],
        },
      ],
    };
  });
