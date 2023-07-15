import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box, Button, LinearProgress, TableFooter } from "@mui/material";
import MainModal from "../Modal";
import { useState } from "react";
import { ArrowLeft, ArrowRight, Edit } from "@mui/icons-material";
import { useSearchParams } from "react-router-dom";

export default function MainTable() {
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [skip, setSkip] = useState(0);
  const [currentData, setCurrentData] = useState(null);

  const getUsers = async () => {
    setLoading(true);
    const response = await fetch(
      "https://64b221a638e74e386d54b3f0.mockapi.io/users"
    );
    if (response.ok) {
      const data = await response.json();
      setUserData(data);
      setLoading(false);
    } else {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    setSkip((page - 1) * limit);
  }, [page, limit]);

  React.useEffect(() => {
    getUsers();
  }, []);

  const nextPage = () => {
    setSearchParams({ page: Number(page) + 1 });
  };

  const prevPage = () => {
    setSearchParams({ page: Number(page) - 1 });
  };

  React.useEffect(() => {
    const pageNumber = searchParams.get("page");
    if (pageNumber) {
      setPage(pageNumber);
    }
  }, [searchParams]);

  return (
    <>
      <Button
        variant="contained"
        className="d-flex justify-content-end my-3 ms-auto"
        onClick={handleOpen}
      >
        Add User
      </Button>
      {loading && (
        <Box sx={{ width: "100%" }}>
          <LinearProgress />
        </Box>
      )}

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>S.No</TableCell>
              <TableCell align="right">Name</TableCell>
              <TableCell align="right">Email</TableCell>
              <TableCell align="right">Contact</TableCell>
              <TableCell align="right">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {userData && userData.slice(skip, skip + limit).length ? (
              userData.slice(skip, skip + limit).map((user, index) => (
                <TableRow
                  key={user._id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {Number(skip) + index + 1}
                  </TableCell>
                  <TableCell align="right">{user.name}</TableCell>
                  <TableCell align="right">{user.email}</TableCell>
                  <TableCell align="right">{user.contact}</TableCell>
                  <TableCell align="right">
                    <Button
                      variant="outlined"
                      onClick={() => {
                        handleOpen();
                        setCurrentData(user);
                      }}
                    >
                      <Edit />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row" />
                <TableCell component="th" scope="row" />
                <TableCell component="th" scope="row">
                  No Data
                </TableCell>
                <TableCell component="th" scope="row" />
                <TableCell component="th" scope="row" />
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell className="px-5 py-2">
                <Button
                  variant="outlined"
                  className="me-3"
                  disabled={Number(page) === 1}
                  onClick={prevPage}
                >
                  <ArrowLeft />
                </Button>
                <Button
                  variant="outlined"
                  disabled={userData.length / limit <= Number(page)}
                  onClick={nextPage}
                >
                  <ArrowRight />
                </Button>
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
      {open && (
        <MainModal
          open={open}
          handleClose={handleClose}
          getUsers={getUsers}
          currentData={currentData}
        />
      )}
    </>
  );
}
