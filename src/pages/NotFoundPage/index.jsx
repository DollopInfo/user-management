import { Container } from "@mui/material";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    setInterval(() => {
      navigate("/");
    }, 5000);
  }, [navigate]);

  return (
    <Container>
      <img
        src="https://drudesk.com/sites/default/files/2018-02/404-error-page-not-found.jpg"
        alt="not found"
        style={{ maxWidth: "100%" }}
      />
    </Container>
  );
};
export default NotFoundPage;
