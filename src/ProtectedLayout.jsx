import { Navigate, Outlet } from "react-router";
import Header from "./search/Header";
import { useNavigate } from "react-router";

const ProtectedLayout = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  if (!token) {
    navigate("/");
  }

  return (
    <>
      <Header />
      <main style={{ padding: "20px" }}>
        <Outlet />
      </main>
    </>
  );
};
export default ProtectedLayout;
