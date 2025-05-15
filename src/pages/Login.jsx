import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useSnackbar } from "../context/SnackbarContext";
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Backdrop,
  CircularProgress,
} from "@mui/material";
import { useNavigate, Link } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const { showSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
  });

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      console.log(data);
      showSnackbar("Login successful!", "success");
      reset();
      navigate("/feed");
    } catch (err) {
      showSnackbar(err?.response?.data?.message || "Login failed", "error");
      reset();
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Container
        maxWidth="xs"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          px: 2,
        }}
      >
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Typography gutterBottom align="center" sx={{ marginBottom: "20px" }}>
            <span className="bg-gradient-to-t from-[#B372CF] to-[#FFFFFF] bg-clip-text text-transparent text-3xl lg:text-5xl">
              Login
            </span>
          </Typography>

          <TextField
            data-test="email-field"
            fullWidth
            margin="normal"
            label="Email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Invalid email address",
              },
            })}
            error={!!errors.email}
            helperText={errors.email?.message}
            sx={{
              "& label": {
                background: "linear-gradient(to top, #B372CF, #FFFFFF)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              },
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "#B372CF",
                },
                "&:hover fieldset": {
                  borderColor: "#FFFFFF",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#FFFFFF",
                },
                color: "#FFFFFF", // input text color
              },
              "& input:-webkit-autofill": {
                WebkitBoxShadow: "0 0 0 1000px transparent inset",
                WebkitTextFillColor: "#FFFFFF",
                caretColor: "#FFFFFF",
                transition: "background-color 9999s ease-in-out 0s",
              },
            }}
          />

          <TextField
            data-test="password-field"
            fullWidth
            margin="normal"
            label="Password"
            type="password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
            error={!!errors.password}
            helperText={errors.password?.message}
            sx={{
              "& label": {
                background: "linear-gradient(to top, #B372CF, #FFFFFF)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              },
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "#B372CF",
                },
                "&:hover fieldset": {
                  borderColor: "#FFFFFF",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#FFFFFF",
                },
                color: "#FFFFFF",
              },
              "& input:-webkit-autofill": {
                WebkitBoxShadow: "0 0 0 1000px transparent inset",
                WebkitTextFillColor: "#FFFFFF",
                caretColor: "#FFFFFF",
                transition: "background-color 9999s ease-in-out 0s",
              },
            }}
          />

          <Button
            color="secondary"
            data-test="login-button"
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              mt: 2,
              py: 1.5,
              fontSize: "1rem",
              color: "#b89ac5",
              borderColor: "#B372CF",
            }}
            disabled={!isValid || loading}
          >
            {loading ? "Logging in..." : "Login"}
          </Button>

          <Typography
            variant="body1"
            align="center"
            sx={{ mt: 2, display: "flex", justifyContent: "center" }}
          >
            <span className="bg-gradient-to-t from-[#B372CF] to-[#FFFFFF] bg-clip-text text-transparent">
              Not a member yet?{" "}
            </span>

            <Link
              to="/signup"
              passHref
              style={{
                textDecoration: "underline",
                color: "white",
                marginLeft: "4px",
              }}
            >
              Sign up
            </Link>
          </Typography>
        </Box>
      </Container>

      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
};

export default Login;
