import React, { useState } from "react";
import "./App.css";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import "./index.css";
import { Typography, Button } from "@mui/material/";
import "@fontsource/roboto/300.css";

function App() {
  const [keyword, setKeyword] = useState("");
  const [data, setData] = useState([]);
  const fetchData = () => {
    fetch(
      "https://wft-geo-db.p.rapidapi.com/v1/geo/cities?offset=0&limit=10&namePrefix=" +
        keyword,
      {
        method: "GET",
        headers: {
          "X-RapidAPI-Key":
            "xxx",
          "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com",
        },
      }
    )
      .then((response) => response.json())
      .then((data) => setData(data.data))
      .catch((err) => console.error(err));
  };

  const columns = [
    {
      field: "name",
      headerName: "Name City",
      sortable: true,
      filter: true,
      width: 250,
      headerHeight: 50,
      rowHeight: 40,
    },
    {
      field: "country",
      sortable: true,
      filter: true,
      width: 250,
      headerHeight: 20,
      rowHeight: 40,
    },
    {
      field: "region",
      sortable: true,
      filter: true,
      width: 250,
      headerHeight: 20,
      rowHeight: 40,
    },
    {
      field: "population",
      sortable: true,
      filter: true,
      width: 250,
      headerHeight: 20,
      rowHeight: 40,
    },
    {
      field: "latitude",
      sortable: true,
      filter: true,
      width: 250,
      headerHeight: 20,
      rowHeight: 40,
    },
    {
      field: "longitude",
      sortable: true,
      filter: true,
      width: 250,
      headerHeight: 20,
      rowHeight: 40,
    },
    {
      field: "Link",
      cellRenderer: (columns) => (
        <Button
          onClick={() => {
            window.open(
              "https://www.google.com/maps/@" +
                columns.data.latitude +
                "," +
                columns.data.longitude +
                ",14z"
            );
          }}
        >
          Location
        </Button>
      ),
    },
  ];

  return (
    <div className="App">
      <Typography
        variant="h2"
        align="center"
        color="terciary"
                    

        style={{ align: "center", marginBottom: 4 }}
      >
        City Finder
      </Typography>

      <input style={{height: "20px", marginRight:3}} value={keyword} onChange={(e) => setKeyword(e.target.value)} />
      <Button color="inherit" variant="outlined" onClick={fetchData}>Search</Button>
      <div
        className="ag-theme-alpine-dark"
        style={{ height: 500, width: "100%", align: "center", marginTop: 30 }}
      >
        <AgGridReact
          defaultColDef={{
            cellStyle: () => ({
              display: "flex",
              alignItems: "left",
              justifyContent: "left",
            }),
          }}
          rowData={data}
          columnDefs={columns}
          pagination={true}
          paginationPageSize={8}
        />
      </div>
    </div>
  );
}

export default App;
