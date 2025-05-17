import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormLabel,
  FormControl,
  Backdrop,
  CircularProgress,
} from "@mui/material";
import { AiOutlineClose } from "react-icons/ai";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSnackbar } from "../context/SnackbarContext";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

import api from "../services/api";

const Signup = () => {
  const { showSnackbar } = useSnackbar();
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isValid },
  } = useForm({ mode: "onChange" });

  const navigate = useNavigate();
  const { user, loadingUser } = useAuth();
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [loading, setLoading] = useState(false);

  const password = watch("password");
  const profileImg = watch("profileImg");

  const [preview, setPreview] = useState(null);

  useEffect(() => {
    if (!loadingUser) {
      if (user) {
        navigate("/"); // already logged in
      } else {
        setCheckingAuth(false); // show login form
      }
    }
  }, [user, loadingUser, navigate]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
    } else {
      setPreview(null);
    }
  };

  const clearFile = () => {
    setPreview(null);
    setValue("profileImg", null);
  };

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      console.log(data);
      const formData = new FormData();

      formData.append("firstName", data.firstName);
      formData.append("lastName", data.lastName);
      formData.append("email", data.email);
      formData.append("gender", data.gender);
      formData.append("password", data.password);
      formData.append("profileImg", data.profileImg[0]);

      const res = await api.post("/auth/register", formData);

      showSnackbar(
        res?.data?.message || "Account created successfully!",
        "success"
      );
      navigate("/login");
    } catch (err) {
      showSnackbar(err?.response?.data?.message || "Signup failed", "error");
    } finally {
      setLoading(false);
      reset();
      setPreview(null);
    }
  };

  if (checkingAuth) {
    return (
      <Backdrop
        open={true}
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    );
  }

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
              Sign Up
            </span>
          </Typography>

          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              gap: 2,
              width: "100%",
            }}
          >
            <TextField
              data-test="fname-field"
              fullWidth
              label="First Name"
              {...register("firstName", {
                required: "First name is required",
              })}
              error={!!errors.firstName}
              helperText={errors.firstName?.message}
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
                  "& input:-webkit-autofill": {
                    WebkitBoxShadow: "0 0 0 1000px transparent inset",
                    WebkitTextFillColor: "#FFFFFF",
                    caretColor: "#FFFFFF",
                    transition: "background-color 9999s ease-in-out 0s",
                  },
                  color: "#FFFFFF", // input text color
                },
              }}
            />
            <TextField
              data-test="lname-field"
              fullWidth
              label="Last Name"
              {...register("lastName", {
                required: "Last name is required",
              })}
              error={!!errors.lastName}
              helperText={errors.lastName?.message}
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
                  "& input:-webkit-autofill": {
                    WebkitBoxShadow: "0 0 0 1000px transparent inset",
                    WebkitTextFillColor: "#FFFFFF",
                    caretColor: "#FFFFFF",
                    transition: "background-color 9999s ease-in-out 0s",
                  },
                  color: "#FFFFFF", // input text color
                },
              }}
            />
          </Box>

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
                "& input:-webkit-autofill": {
                  WebkitBoxShadow: "0 0 0 1000px transparent inset",
                  WebkitTextFillColor: "#FFFFFF",
                  caretColor: "#FFFFFF",
                  transition: "background-color 9999s ease-in-out 0s",
                },
                color: "#FFFFFF", // input text color
              },
            }}
          />

          <Typography
            variant="body1"
            align="center"
            sx={{ mt: 2, mb: 1, display: "flex" }}
          >
            <span className="bg-gradient-to-t from-[#B372CF] to-[#FFFFFF] bg-clip-text text-transparent font-bold">
              Profile Image
            </span>
          </Typography>

          <div className="flex justify-between items-center">
            <label
              htmlFor="upload-image"
              className="px-1.5 py-2.5 border border-white/15 rounded-xl cursor-pointer"
            >
              <span className="px-2 py-1 rounded-lg bg-[#8C45FF]/40 backdrop-blur text-white cursor-pointer border border-white/15 shadow-inner-custom text-xs md:text-base">
                Upload Image
              </span>
            </label>

            <input
              type="file"
              id="upload-image"
              accept="image/*"
              {...register("profileImg", {
                required: "Profile image is required",
                onChange: handleFileChange,
              })}
              style={{ display: "none" }}
            />

            {preview && (
              <div
                style={{
                  position: "relative",
                  display: "inline-block",
                }}
              >
                <img
                  src={preview}
                  alt="Preview"
                  style={{
                    width: 60,
                    height: 60,
                    objectFit: "cover",
                    borderRadius: 50,
                  }}
                />
                <button
                  onClick={clearFile}
                  style={{
                    position: "absolute",
                    top: 0,
                    right: 0,
                    backgroundColor: "rgba(255,255,255,0.7)",
                    border: "none",
                    cursor: "pointer",
                    padding: "2px",
                    borderRadius: "50%",
                  }}
                  aria-label="Clear image"
                >
                  <AiOutlineClose size={16} />
                </button>
              </div>
            )}
          </div>
          {errors.profileImg && (
            <Typography variant="caption" color="error" sx={{ marginTop: 1 }}>
              {errors.profileImg.message}
            </Typography>
          )}

          <FormControl
            sx={{
              mt: 2,
              "& legend": {
                background: "linear-gradient(to top, #B372CF, #FFFFFF)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                fontWeight: "bold",
              },
              "& .MuiFormControlLabel-label": {
                color: "#FFFFFF", // label text color
              },
              "& .MuiRadio-root": {
                color: "#B372CF", // default (unchecked) color
              },
              "& .MuiRadio-root.Mui-checked": {
                color: "#FFFFFF !important", // force checked color to white
              },
              "& .MuiRadio-root.Mui-focusVisible": {
                color: "#FFFFFF", // focus color when tabbed or clicked
              },
            }}
            error={!!errors.gender}
            component="fieldset"
            data-test="gender-field"
          >
            <FormLabel component="legend">Gender</FormLabel>
            <RadioGroup row>
              <FormControlLabel
                value="male"
                control={<Radio />}
                label="Male"
                {...register("gender", { required: "Gender is required" })}
              />
              <FormControlLabel
                value="female"
                control={<Radio />}
                label="Female"
                {...register("gender", { required: "Gender is required" })}
              />
              <FormControlLabel
                value="other"
                control={<Radio />}
                label="Other"
                {...register("gender", { required: "Gender is required" })}
              />
            </RadioGroup>
            {errors.gender && (
              <Typography variant="caption" color="error">
                {errors.gender.message}
              </Typography>
            )}
          </FormControl>

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
                "& input:-webkit-autofill": {
                  WebkitBoxShadow: "0 0 0 1000px transparent inset",
                  WebkitTextFillColor: "#FFFFFF",
                  caretColor: "#FFFFFF",
                  transition: "background-color 9999s ease-in-out 0s",
                },
                color: "#FFFFFF", // input text color
              },
            }}
          />

          <TextField
            data-test="cpassword-field"
            fullWidth
            margin="normal"
            label="Confirm Password"
            type="password"
            {...register("confirmPassword", {
              required: "Please confirm your password",
              validate: (value) =>
                value === password || "Passwords do not match",
            })}
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword?.message}
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
                "& input:-webkit-autofill": {
                  WebkitBoxShadow: "0 0 0 1000px transparent inset",
                  WebkitTextFillColor: "#FFFFFF",
                  caretColor: "#FFFFFF",
                  transition: "background-color 9999s ease-in-out 0s",
                },
                color: "#FFFFFF", // input text color
              },
            }}
          />

          <Button
            data-test="signup-button"
            color="secondary"
            type="submit"
            variant="contained"
            fullWidth
            disabled={!isValid || loading}
            sx={{
              mt: 2,
              py: 1.5,
              fontSize: "1rem",
              color: "#b89ac5",
              borderColor: "#B372CF",
            }}
          >
            {loading ? "Signing Up..." : "Sign Up"}
          </Button>

          <Typography
            variant="body1"
            align="center"
            sx={{ mt: 2, display: "flex", justifyContent: "center" }}
          >
            <span className="bg-gradient-to-t from-[#B372CF] to-[#FFFFFF] bg-clip-text text-transparent">
              Already have an account?{" "}
            </span>

            <Link
              to="/login"
              style={{
                textDecoration: "underline",
                color: "white",
                marginLeft: "4px",
              }}
            >
              Login
            </Link>
          </Typography>
        </Box>
      </Container>

      {/* Loading Backdrop */}
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
};

export default Signup;
