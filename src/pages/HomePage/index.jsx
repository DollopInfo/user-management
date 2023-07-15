import { Container, Typography } from "@mui/material";
import MainTable from "../../components/Structure/Table";
import MainLayout from "../../layouts/MainLayout";

const HomePage = () => {
  return (
    <MainLayout>
      <Container>
        <Typography
          variant="h3"
          textAlign={"center"}
          margin={"16px"}
          component={"h3"}
        >
          User Management
        </Typography>
        <MainTable />
      </Container>
    </MainLayout>
  );
};
export default HomePage;
