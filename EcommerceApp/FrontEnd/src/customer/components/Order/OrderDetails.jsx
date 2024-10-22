import React from "react";
import AddressCard from "../AddressCard/AddressCard";
import OrderTraker from "./OrderTraker";
import { Box, Grid } from "@mui/material";
import { deepPurple } from "@mui/material/colors";
import StarBorderIcon from "@mui/icons-material/StarBorder";

const OrderDetails = () => {
  return (
    <div className="px-5 lg:px-20 mb-6">
      <div>
        <h1 className="font-bold text-xl py-7">Dilivery Address</h1>
        <AddressCard />
      </div>

      <div className="py-20">
        <OrderTraker activeStep={3} />
      </div>

      <Grid className="space-y-5" container>
        {[1, 1, 1, 1].map((item) => (
          <Grid
            item
            container
            className="shadow-xl rounded-md p-5 border"
            sx={{ alignItems: "center", justifyContent: "space-between" }}
          >
            <Grid item xs={6}>
              <div className="flex items-center space-x-4">
                <img
                  className="w-[5rem] h-[5rem] object-cover object-top"
                  src="https://www.bing.com/th?id=OPAC.ffjAH%2bAY9Xq0Mw474C474&o=5&pid=21.1&w=160&h=235&rs=1&qlt=100&dpr=1.1&c=8&pcl=f5f5f5"
                  alt=""
                />

                <div className="space-y-2 ml-5">
                  <p className="font-semibold">Men Slim Mid Rise Black Jeans</p>
                  <p className="space-x-5 opacity-50 text-xs font-semibold">
                    <span>Color : pink</span> <span>Siz : M</span>
                  </p>
                  <p>Seller: Linaria</p>
                  <p>₹1099</p>
                </div>
              </div>
            </Grid>

            <Grid item>
              <Box sx={{ color: deepPurple[500] }}>
                <StarBorderIcon sx={{ fontSize: "2rem" }} className="px-2" />
                <span>Rate & Review Product</span>
              </Box>
            </Grid>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default OrderDetails;
