import React from "react";
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";

export const ExportCSV = ({ csvData, csvData1, fileName }) => {
  const fileType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";

  const fileExtension = ".xlsx";

  const exportToCSV = (csvData, csvData1, fileName) => {
    const ws = XLSX.utils.json_to_sheet(csvData);

    const ws1 = XLSX.utils.json_to_sheet(csvData1);

    const ws_name = "SheetJS";
    const ws_data1 = [
      ["S", "h", "e", "e", "t", "J", "S"],
      [1, 2, 3, 4, 5],
    ];
    const ws3 = XLSX.utils.aoa_to_sheet(ws_data1);

    /* Add the worksheet to the workbook */

    const wb = {
      SheetNames: ["data", "data1"],
      Sheets: { data: ws, data1: ws1 },
      // Sheets: {
      //   Sheet: ws,
      //   // Sheet: {
      //   //   // <-- each sheet name is a key in the Sheets object
      //   //   // "!ref": "A1:B2",
      //   //   A1: { t: "n", v: 1 },
      //   //   B2: { t: "n", v: 4 },
      //   // },
      //   JS: {
      //     // <-- since "JS" is the second entry in SheetNames, it will be the second tab
      //     "!ref": "A1:B2",
      //     A2: { t: "s", v: "Sheet" },
      //     B1: { t: "s", v: "JS" },
      //   },
      // },
    };
    wb.SheetNames.push("Test Sheet");
    wb.SheetNames.push("haha");
    var ws_data = [["hello", "world"]];
    var ws2 = XLSX.utils.aoa_to_sheet(ws_data);
    wb.Sheets["Test Sheet"] = ws2;
    wb.Sheets["haha"] = ws3;

    wb.Props = {
      Title: "SheetJS Tutorial",
      Subject: "Test",
      Author: "Red Stapler",
      CreatedDate: new Date(2017, 12, 19),
    };

    // XLSX.utils.book_append_sheet(wb, ws3, ws_name);

    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });

    const data = new Blob([excelBuffer], { type: fileType });

    FileSaver.saveAs(data, fileName + fileExtension);
  };

  return (
    <button onClick={(e) => exportToCSV(csvData, csvData1, fileName)}>
      Export
    </button>
  );
};
//============================================
// var wb = XLSX.utils.book_new();
// wb.Props = {
//         Title: "SheetJS Tutorial",
//         Subject: "Test",
//         Author: "Red Stapler",
//         CreatedDate: new Date(2017,12,19)
// };
