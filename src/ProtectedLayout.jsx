import { Outlet } from "react-router";
import Header from "./search/Header";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { loadFavorites } from "./RTK/favoriteSlice";
import { useEffect } from "react";

const ProtectedLayout = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const userName = localStorage.getItem("userName");
  const dispatch = useDispatch();
  useEffect(() => {
    if (!token) {
      navigate("/");
    } else {
      const key = userName ? `favorites_${userName}` : null;
      if (key) {
        const savedData = localStorage.getItem(key);
        const parsedData = savedData ? JSON.parse(savedData) : [];
        dispatch(loadFavorites(parsedData));
      }
    }
  }, [token, navigate, dispatch, userName]);

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
