import { useForm } from "react-hook-form";
import { Button, TextField, Card, CardContent, Box } from "@mui/material";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";

function AuthForm() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const config = {
    headers: { accept: "application/json", "Content-Type": "application/json" },
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/search");
    }
  }, []);
  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        "https://todo-redev.herokuapp.com/api/auth/login",
        data,
        config
      );
      const { token } = response.data;
      localStorage.setItem("token", token);
      navigate("/search");
    } catch (error) {
      console.log(
        error.response.data.message || error.response.data.errors[0].msg
      );
    }
  };
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#f5f5f5",
      }}
    >
      <Card
        variant="outlined"
        sx={{ minWidth: 275, maxWidth: 400, p: 2, padding: "8vh 8vw" }}
      >
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="main">
            <h1>Авторизация</h1>
            <div className="task">
              <p>Email:</p>
              <TextField
                id="outlined-basic"
                label="Email"
                variant="outlined"
                {...register("email", {
                  required: "Поле обязательно для заполнения",
                  pattern: {
                    value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/,
                    message: "Введите корректный email",
                  },
                })}
              />
            </div>
            <p>{errors.email?.message}</p>

            <div className="task">
              <p>Пароль:</p>
              <TextField
                id="outlined-basic"
                label="Password"
                variant="outlined"
                type="password"
                {...register("password", {
                  required: "Поле обязательно для заполнения",
                  minLength: {
                    value: 6,
                    message: "Введите корректный пароль",
                  },
                  pattern: {
                    value: /[A-Z]/,
                    message: "Введите корректный пароль",
                  },
                })}
              />
            </div>
            <p>{errors.password?.message}</p>
            <Button variant="contained" type="submit">
              Войти
            </Button>
          </form>
        </CardContent>{" "}
      </Card>
    </Box>
  );
}

export default AuthForm;
