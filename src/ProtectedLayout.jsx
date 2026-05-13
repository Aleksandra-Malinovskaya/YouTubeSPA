import { Outlet } from "react-router";
import Header from "./search/Header";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { loadFavorites } from "./RTK/favoriteSlice";
import { useEffect } from "react";

const ProtectedLayout = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();
  useEffect(() => {
    if (!token) {
      navigate("/");
    } else {
      dispatch(loadFavorites());
    }
  }, [token, navigate, dispatch]);

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
