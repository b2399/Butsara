import React, { useEffect } from "react";

import { Link as RouterLink } from "react-router-dom";

import Typography from "@mui/material/Typography";

import Button from "@mui/material/Button";

import Container from "@mui/material/Container";

import Box from "@mui/material/Box";

//import { UsersInterface } from "../models/IUser";

import { DataGrid, GridColDef } from "@mui/x-data-grid";

import { OvertimeInterface } from "../models/IOvertime";

import { createTheme, ThemeProvider } from "@mui/material/styles";

import { green } from "@mui/material/colors";

const theme = createTheme({
  palette: {
    primary: {
      // Purple and green play nicely together.
      main: green[500],
    },
    secondary: {
      // This is green.A700 as hex.
      main: "#e8f5e9",
    },
  }
});

function Users() {

 const [overtimes, setOvertimes] = React.useState<OvertimeInterface[]>([]);


 const getOvertimes = async () => {

   const apiUrl = "http://localhost:8080/overtimes";

   const requestOptions = {

     method: "GET",

     headers: { "Content-Type": "application/json" },

   };


   fetch(apiUrl, requestOptions)

     .then((response) => response.json())

     .then((res) => {

       console.log(res.data);

       if (res.data) {

         setOvertimes(res.data);

       }

     });

 };


 const columns: GridColDef[] = [

   { field: "ID", headerName: "ID", width: 50 },

   { field: "Doctor", headerName: "ชื่อ-นามสกุล", width: 150 , valueFormatter: (params) => params.value.Name},

   { field: "Activity", headerName: "กิจกรรมที่ทำ", width: 150 , valueFormatter: (params) => params.value.Name},

   { field: "Workplace", headerName: "สถานที่ทำงาน", width: 200 , valueFormatter: (params) => params.value.Name},

   { field: "Num", headerName: "จำนวนชั่วโมงที่ทำ", width: 100 },

   { field: "Time", headerName: "วันที่และเวลา", width: 200 },

 ];


 useEffect(() => {

   getOvertimes();

 }, []);


 return (

   <div>
     <ThemeProvider theme={theme}>
     <Container maxWidth="md">

       <Box

         display="flex"

         sx={{

           marginTop: 2,

         }}

       >

        <Box flexGrow={1}>
            <Typography // ตารางเวลา
              component="h1"
              variant="h6"
              color="inherit"
              gutterBottom
            >

            ข้อมูลล่วงเวลางานของแพทย์

           </Typography>

         </Box>

         <Box>

         <Button //ตัวบันทึก
                component={RouterLink} //ลิ้งหน้าต่อไป
                to="/Overtime"
                variant="contained"
                color="primary"
              >
                <Typography
                  color="secondary"
                  component="div"
                  sx={{ flexGrow: 1 }}
                >
             บันทึกข้อมูลล่วงเวลางาน

             </Typography>
           </Button>

         </Box>

       </Box>

       <div style={{ height: 400, width: "100%", marginTop: '20px'}}>

         <DataGrid

           rows={overtimes}

           getRowId={(row) => row.ID}

           columns={columns}

           pageSize={5}

           rowsPerPageOptions={[5]}

         />

       </div>

     </Container>
     </ThemeProvider>
   </div>

 );

}

export default Users;