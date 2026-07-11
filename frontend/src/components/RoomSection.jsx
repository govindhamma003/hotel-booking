import { makeStyles } from "@mui/styles";
import { Grid, Card, CardMedia, CardContent, Typography, Button, Container } from "@mui/material";
import rooms from "../data/room.json";

const useStyles = makeStyles(() => ({
  container: {
    padding: "64px 0",
    minHeight: "100vh",
    backgroundColor: "#0D3D1E",
  },
  header: {
    textAlign: "center",
    marginBottom: "48px",
    padding: "0 20px",
  },
  title: {
    fontFamily: "Playfair Display, serif",
    color: "white",
    marginBottom: "16px",
  },
  subtitle: {
    color: "rgba(255,255,255,0.8)",
  },
  wrapper: {
    maxWidth: "1280px",
    margin: "0 auto",
    padding: "0 24px",
  },
  card: {
    position: "relative",
    borderRadius: "8px",
    overflow: "hidden",
    boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.3)",
    transition: "transform 0.3s ease-in-out",
    "&:hover": {
      transform: "translateY(-6px)",
    },
  },
  media: {
    height: 240,
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "240px",
    backgroundColor: "rgba(0, 0, 0, 0.55)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    color: "#fff",
    opacity: 0,
    transition: "opacity 0.3s ease-in-out",
    "&:hover": {
      opacity: 1,
    },
  },
  overlayPrice: {
    fontSize: "1.3rem",
    fontWeight: "bold",
    marginBottom: "16px",
  },
  overlayButton: {
    color: "#fff !important",
    borderColor: "#f5c518 !important",
  },
  content: {
    padding: "16px 20px !important",
    backgroundColor: "white",
  },
  roomType: {
    fontWeight: "700 !important",
    fontSize: "1.15rem !important",
  },
}));

function RoomsSection() {
  const classes = useStyles();

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className={classes.container} id="rooms">
      <div className={classes.header}>
        <Typography variant="h3" className={classes.title}>
          Rooms & Suites
        </Typography>
        <Typography variant="body1" className={classes.subtitle}>
          Experience the charm of our elegantly designed rooms, the perfect escape for your next unforgettable getaway.
        </Typography>
      </div>

      <Container className={classes.wrapper} maxWidth={false}>
        <Grid container spacing={3} sx={{ justifyContent: "center" }}>
          {rooms.map((room, ind) => (
            <Grid key={ind} size={{ xs: 12, sm: 6, md: 4 }}>
              <Card className={classes.card}>
                <CardMedia
                  className={classes.media}
                  image={room.images[0]}
                  title={room.roomType}
                />
                <div className={classes.overlay}>
                  <Typography className={classes.overlayPrice}>
                    ₹{room.pricePerNight}/Night
                  </Typography>
                  <Button
                    variant="outlined"
                    className={classes.overlayButton}
                    onClick={() => scrollTo("booking")}
                  >
                    Book Now
                  </Button>
                </div>
                <CardContent className={classes.content}>
                  <Typography variant="h6" className={classes.roomType}>
                    {room.roomType}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
}

export default RoomsSection;