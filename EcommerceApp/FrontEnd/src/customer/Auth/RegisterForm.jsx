import React, { useEffect } from "react";
import TextField from "@mui/material/TextField";
import { Button, Grid } from "@mui/material";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { getUser, register } from "../../State/Auth/Action";
// import { Store } from "../../store/Store";

const RegisterForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const { auth } = useSelector((Store) => Store);

  useEffect(() => {
    if (jwt) {
      dispatch(getUser(jwt));
    }
  }, [jwt, auth.jwt]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);

    const userData = {
      firstName: data.get("firstName"),
      lastName: data.get("lastName"),
      email: data.get("email"),
      password: data.get("password"),
    };
    dispatch(register(userData));
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              id="firstName"
              name="firstName"
              label="First Name"
              fullWidth
              autoComplete="given-name"
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              id="lastName"
              name="lastName"
              label="Last Name"
              fullWidth
              autoComplete="given-name"
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              id="email"
              name="email"
              label="Email"
              fullWidth
              autoComplete="email"
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              id="password"
              name="password"
              label="Password"
              fullWidth
              autoComplete="password"
            />
          </Grid>

          <Grid item xs={12}>
            <Button
              className="bg-[#9155fd] w-full"
              type="submit"
              variant="contained"
              size="large"
              sx={{ padding: ".8rem 0", bgcolor: "#9155fd" }}
            >
              Register
            </Button>
          </Grid>
        </Grid>
      </form>

      <div className="flex justify-center flex-col items-center">
        <div className="py-3 flex items-center">
          <p>if you have already account ?</p>
          <Button onClick={() => navigate("/login")}>Login</Button>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
