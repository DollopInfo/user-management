import Header from "../../components/Structure/Header";

const MainLayout = ({ children }) => {
  return (
    <>
      <Header />
      {children}
    </>
  );
};

export default MainLayout;
