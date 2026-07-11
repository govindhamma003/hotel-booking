import React from "react";
import { Grid } from "@mui/material";
import { makeStyles } from '@mui/styles';
import {
  Wifi,
  SportsHandball,
  RestaurantMenu,
  AirlineSeatIndividualSuite,
  Spa,
  BeachAccess,
} from "@mui/icons-material";

import hotelServices from '../data/hotelServices.json';

const useStyles = makeStyles(() => ({
  iconWrapper: {
    position: "relative",
    display: "inline-block",
    zIndex: 2,
    "&::before": {
      content: '" "',
      position: "absolute",
      height: "78px",
      width: "42px",
      borderRadius: "300px",
      transform: "rotate(40deg)",
      top: "calc(50% - 42px)",
      left: 10,
      background: "rgba(27,94,32,0.15)",
      zIndex: -1,
    },
  },
}));

const iconMapping = {
  Wifi: Wifi,
  SportsHandball: SportsHandball,
  RestaurantMenu: RestaurantMenu,
  AirlineSeatIndividualSuite: AirlineSeatIndividualSuite,
  Spa: Spa,
  BeachAccess: BeachAccess,
};

const Services = () => {
  const classes = useStyles();

  return (
    <section
      id="services"
      style={{ padding: "80px 0", backgroundColor: "#0D3D1E" }}
    >
      <div className="container">
        <div style={{ marginBottom: "48px", textAlign: "center" }}>
          <h1 style={{ fontWeight: 400, fontSize: "44px", margin: "0 0 16px", color: "white" }}>
            Amenities At Our Villa
          </h1>
          <p style={{ maxWidth: "480px", margin: "0 auto", color: "rgba(255,255,255,0.8)" }}>
            Explore our exceptional services tailored to elevate your experience.
            From personalized assistance and premium amenities to seamless bookings
            and 24/7 support, we ensure your comfort and satisfaction at every step.
          </p>
        </div>

        <Grid container spacing={6} sx={{ justifyContent: "space-between", alignItems: "center" }}>
          {hotelServices.map((item) => {
            const IconComponent = iconMapping[item.icon];
            return (
              <Grid key={item.id} size={{ xs: 12, sm: 6, md: 4 }}>
                <div style={{ textAlign: "center", maxWidth: "252px", margin: "0 auto" }}>
                  <div style={{ position: "relative", marginBottom: "8px" }}>
                    <div className={classes.iconWrapper}>
                      {IconComponent && (
                        <IconComponent sx={{ fontSize: 62, color: "white" }} />
                      )}
                    </div>
                  </div>
                  <h1 style={{ fontWeight: 400, display: "inline-block", color: "white", fontSize: "20px" }}>
                    {item.title}
                  </h1>
                  <p style={{ textAlign: "center", margin: 0, color: "rgba(255,255,255,0.8)" }}>
                    {item.description}
                  </p>
                </div>
              </Grid>
            );
          })}
        </Grid>
      </div>
    </section>
  );
};

export default Services;