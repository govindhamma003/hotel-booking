import React from "react";
import { Grid } from "@mui/material";
import { makeStyles } from '@mui/styles';
import clsx from "clsx";
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';

const useStyles = makeStyles(() => ({
  section: {
    background: "linear-gradient(135deg, #E3F0F1 0%, #F3F3E0 50%, #EEF2D3 100%)",
    color: "#1B3B2F",
    padding: "56px 0 32px",
  },
  heading: {
    fontFamily: "'Playfair Display', serif",
    fontWeight: 500,
    fontSize: "26px",
    margin: "0 0 20px",
    color: "#1B3B2F",
  },
  iconWrapper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: 36,
    height: 36,
    borderRadius: 4,
    marginRight: 10,
    border: `1.5px solid #1B3B2F`,
    cursor: "pointer",
    color: "#1B3B2F",
  },
  link: {
    display: "flex",
    alignItems: "center",
    padding: "6px 0",
    color: "#1B3B2F",
    cursor: "pointer",
    fontSize: "15px",
    "&:hover": {
      color: "#f5c518",
    },
  },
  contactRow: {
    display: "flex",
    alignItems: "flex-start",
    gap: "10px",
    marginBottom: "12px",
    fontSize: "15px",
  },
}));

const Footer = () => {
  const classes = useStyles();

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const companyOption = [
    { label: "About Us", id: "home" },
    { label: "Services", id: "services" },
  ];

  const usefulLink = [
    { label: "Terms of Services", id: "terms" },
    { label: "Privacy Policy", id: "privacy" },
  ];

  return (
    <section className={classes.section} id="footer">
      <div className="container">
        <Grid container spacing={4}>
          <Grid size={{ xs: 12, sm: 6, md: 3, lg: 3 }}>
            <h4 className={classes.heading}>Get in touch</h4>
            <div className={classes.contactRow}>
              <PhoneIcon fontSize="small" />
              <span>+91 99430 29268</span>
            </div>
            <div className={classes.contactRow}>
              <LocationOnIcon fontSize="small" />
              <span> Chennai, Tamil Nadu 605101</span>
            </div>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 3, lg: 3 }}>
            <h4 className={classes.heading}>Our Links</h4>
            {companyOption.map((item, ind) => (
              <div
                key={ind}
                className={clsx("w-full", classes.link)}
                onClick={() => scrollTo(item.id)}
              >
                <NavigateNextIcon fontSize="small" />
                <span>{item.label}</span>
              </div>
            ))}
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 3, lg: 3 }}>
            <h4 className={classes.heading}>Follow Us</h4>
            <div style={{ display: "flex" }}>
              <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                <div className={classes.iconWrapper}>
                  <FacebookIcon fontSize="small" />
                </div>
              </a>
              <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                <div className={classes.iconWrapper}>
                  <InstagramIcon fontSize="small" />
                </div>
              </a>
              <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer">
                <div className={classes.iconWrapper}>
                  <YouTubeIcon fontSize="small" />
                </div>
              </a>
            </div>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 3, lg: 3 }}>
            <h4 className={classes.heading}>Policies & Terms</h4>
            {usefulLink.map((item, ind) => (
              <div
                key={ind}
                className={clsx("w-full", classes.link)}
                onClick={() => scrollTo(item.id)}
              >
                <NavigateNextIcon fontSize="small" />
                <span>{item.label}</span>
              </div>
            ))}
          </Grid>
        </Grid>

        <div style={{ marginTop: "40px", fontSize: "13px", color: "#1B3B2F" }}>
          All Rights Reserved. © Hotel Royal Stay
        </div>
      </div>
    </section>
  );
};

export default Footer;