import { useForm } from "react-hook-form";
import MyLogo from "../assets/sibdev-logo.svg";
import {
  Button,
  TextField,
  Card,
  CardContent,
  Box,
  Alert,
  Typography,
  Stack,
} from "@mui/material";
import { useNavigate } from "react-router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  authRequest,
  selectError,
  selectLoading,
  selectSuccess,
} from "../RTK/authSlice";

function AuthForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const error = useSelector(selectError);
  const isLoading = useSelector(selectLoading);
  const isSuccess = useSelector(selectSuccess);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/search");
    }
  }, []);
  useEffect(() => {
    if (isSuccess) {
      navigate("/search");
    }
  }, [isSuccess, navigate]);
  const onSubmit = (data) => {
    dispatch(authRequest(data));
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
        sx={{
          width: "100%",
          maxWidth: 450,
          p: 3,
          borderRadius: "8px",
          boxShadow: "0px 4px 10px rgba(0,0,0,0.05)",
        }}
      >
        <CardContent>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              mb: 4,
            }}
          >
            <Box
              component="img"
              src={MyLogo}
              alt="Logo"
              sx={{
                width: 80,
                height: "auto",
                mb: 2,
              }}
            />
            <Typography variant="h5" sx={{ fontWeight: 600 }}>
              Вход
            </Typography>
          </Box>

          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={2.5}>
              <Box>
                <Typography
                  variant="body2"
                  sx={{ mb: 0.5, color: "text.secondary" }}
                >
                  Логин
                </Typography>
                <TextField
                  fullWidth
                  id="email-auth-input"
                  variant="outlined"
                  size="small"
                  autoComplete="email"
                  error={!!errors.email}
                  helperText={errors.email?.message}
                  {...register("email", {
                    required: "Поле обязательно для заполнения",
                    pattern: {
                      value:
                        /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/,
                      message: "Введите корректный email",
                    },
                  })}
                />
              </Box>

              <Box>
                <Typography
                  variant="body2"
                  sx={{ mb: 0.5, color: "text.secondary" }}
                >
                  Пароль
                </Typography>
                <TextField
                  fullWidth
                  id="password-auth-input"
                  variant="outlined"
                  size="small"
                  type="password"
                  autoComplete="current-password"
                  error={!!errors.password}
                  helperText={errors.password?.message}
                  {...register("password", {
                    required: "Поле обязательно для заполнения",
                    minLength: { value: 6, message: "Минимум 6 символов" },
                  })}
                />
              </Box>
              {error && (
                <Alert severity="error" sx={{ mt: 1 }}>
                  {error}
                </Alert>
              )}
              <Button
                type="submit"
                variant="contained"
                fullWidth
                disabled={isLoading}
                sx={{
                  mt: 3,
                  py: 1.5,
                  textTransform: "none",
                  fontSize: "16px",
                  boxShadow: "none",
                  fontWeight: 500,
                }}
              >
                {isLoading ? "Вход..." : "Войти"}
              </Button>
            </Stack>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
}

export default AuthForm;
