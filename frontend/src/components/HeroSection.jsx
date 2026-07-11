import { makeStyles } from '@mui/styles';
import { Button } from '@mui/material';

const useStyles = makeStyles(() => ({
  introWrapper: {
  position: "relative",
  background: "url(/assets/img/hero_bg.jpg) center center/cover no-repeat",
  padding: "5rem 0rem 0rem",
  minHeight: "300px",
},
  lightWhiteBG: {
    position: "absolute",
    display: "block",
    top: 0,
    bottom: 0,
    left: 0,
    right: "calc(50% - 395px)",
    minWidth: 800,
    background: "rgba(255,255,255,0.25)",
    clipPath: "polygon(0 0, 100% 0%, 75% 100%, 0% 100%)",
    "&:before": {
      content: '" "',
      position: "absolute",
      display: "block",
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      marginRight: 100,
      minWidth: 800,
      background: "rgba(255,255,255,0.75)",
      clipPath: "polygon(0 0, 100% 0%, 75% 100%, 0% 100%)",
      zIndex: -1,
    },
    "@media (max-width: 600px)": {
      right: 0,
      clipPath: "none",
      background: "rgba(255,255,255,0.7)",
    }
  },
  intro: {
    position: "relative",
    padding: "8rem 0rem 5rem",
    maxWidth: 500,
    "@media (max-width: 600px)": {
      padding: "8rem 0rem 2rem"
    },
    zIndex: 5,
  },
}));

const HeroSection = () => {
  const classes = useStyles();

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="section pb-0" id="home">
      <div className={classes.introWrapper}>
        <div className="container">
          <div className={classes.intro}>
            <h4 style={{ fontWeight: 400, margin: "0 0 16px" }}>
              Enjoy the best relaxation space with
            </h4>
            <h1 style={{ color: "#1B5E20", fontSize: "48px", fontWeight: 500, margin: "0 0 16px" }}>
              Hotel Royal Stay
            </h1>
            <p style={{ marginBottom: "32px", lineHeight: "1.8", color: "#333" }}>
              Nestled in the heart of the city, Hotel Royal Stay offers a serene 
              retreat with luxurious rooms, world-class amenities, and warm hospitality. 
              Whether you're here for business or leisure, we ensure a memorable stay 
              tailored to your comfort and relaxation.
            </p>
            <Button
              variant="contained"
              onClick={() => scrollTo("booking")}
              sx={{
                backgroundColor: "#1B5E20",
                color: "white",
                borderRadius: "25px",
                padding: "12px 32px",
                fontSize: "16px",
                "&:hover": { backgroundColor: "#f5c518", color: "#1B5E20" }
              }}
            >
              Book Now
            </Button>
          </div>
          <div className={classes.lightWhiteBG}></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;