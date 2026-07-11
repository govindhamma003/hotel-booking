import { useState } from "react";
import { makeStyles } from "@mui/styles";
import {
  Grid, Box, Typography, Button, TextField,
  MenuItem, CircularProgress, Card
} from "@mui/material";
import { CheckCircle } from "@mui/icons-material";
import { createBooking } from "../services/api";

const useStyles = makeStyles(() => ({
  section: {
    padding: "64px 0",
    backgroundColor: "#0D3D1E",
  },
  container: {
    maxWidth: "600px",
    margin: "0 auto",
    padding: "0 24px",
  },
  header: {
    textAlign: "center",
    marginBottom: "40px",
  },
  title: {
    color: "white",
    fontFamily: "Playfair Display, serif",
    marginBottom: "12px",
  },
  subtitle: {
    color: "rgba(255,255,255,0.8)",
  },
  card: {
    padding: "32px",
    borderRadius: "12px !important",
    background: "linear-gradient(135deg, #ffffff, #f8f9fc, #eef2f7) !important",
    boxShadow: "0 4px 6px rgba(0,0,0,0.1), 0 12px 20px rgba(0,0,0,0.1) !important",
  },
  cardTitle: {
    fontSize: "22px",
    fontWeight: 600,
    marginBottom: "20px",
    color: "#0D3D1E",
  },
  submitBtn: {
    backgroundColor: "#0D3D1E !important",
    color: "white !important",
    padding: "12px !important",
    borderRadius: "8px !important",
    fontSize: "15px !important",
    marginTop: "16px !important",
    "&:hover": {
      backgroundColor: "#f5c518 !important",
      color: "#0D3D1E !important",
    },
  },
  successBox: {
    textAlign: "center",
    padding: "20px",
  },
}));

const roomOptions = [
  { value: "Standard Room", price: "1500" },
  { value: "Deluxe Room", price: "2500" },
  { value: "Junior Suite", price: "5000" },
];

const BookingForm = () => {
  const classes = useStyles();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    checkInDate: "",
    checkOutDate: "",
    guests: 1,
    roomType: "",
    price: "",
    name: "",
    address: "",
    contact: "",
    email: "",
    paymentConfirmation: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setError("");
    if (name === "roomType") {
      const room = roomOptions.find((r) => r.value === value);
      setFormData({ ...formData, roomType: value, price: room?.price || "" });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const validateStep1 = () => {
    const today = new Date().toISOString().split("T")[0];
    const { checkInDate, checkOutDate, guests, roomType } = formData;
    if (!roomType) { setError("Please select a room type."); return false; }
    if (!checkInDate || checkInDate < today) { setError("Please select a valid check-in date."); return false; }
    if (!checkOutDate || checkOutDate <= checkInDate) { setError("Check-out must be after check-in."); return false; }
    if (guests < 1) { setError("At least 1 guest required."); return false; }
    return true;
  };

  const validateStep2 = () => {
    const { name, contact, email } = formData;
    if (!name) { setError("Please enter your name."); return false; }
    if (!contact && !email) { setError("Please provide contact number or email."); return false; }
    return true;
  };

  const validateStep3 = () => {
    if (!formData.paymentConfirmation) { setError("Please enter payment confirmation number."); return false; }
    return true;
  };

  const handleStep1 = () => { if (validateStep1()) setStep(2); };
  const handleStep2 = () => { if (validateStep2()) setStep(3); };

  const handleConfirm = async () => {
    if (!validateStep3()) return;
    try {
      setLoading(true);
      const response = await createBooking({
        ...formData,
        guests: parseInt(formData.guests),
        price: parseInt(formData.price),
      });
      if (response.status) setStep(4);
      else setError("Booking failed. Please try again.");
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className={classes.section} id="booking">
      <div className={classes.container}>
        <div className={classes.header}>
          <Typography variant="h3" className={classes.title}>
            Book Your Stay
          </Typography>
          <Typography variant="body1" className={classes.subtitle}>
            Complete your reservation in just a few steps.
          </Typography>
        </div>

        <Card className={classes.card}>
          {error && (
            <Typography color="error" sx={{ marginBottom: "16px" }}>
              {error}
            </Typography>
          )}

          {/* Step 1 - Dates & Room */}
          {step === 1 && (
            <Box>
              <Typography className={classes.cardTitle}>
                Step 1 — Select Room & Dates
              </Typography>
              <TextField
                select label="Room Type" name="roomType"
                value={formData.roomType} onChange={handleChange}
                fullWidth variant="outlined" margin="normal"
              >
                {roomOptions.map((r) => (
                  <MenuItem key={r.value} value={r.value}>
                    {r.value} — ₹{r.price}/Night
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                label="Check-in Date" name="checkInDate" type="date"
                value={formData.checkInDate} onChange={handleChange}
                fullWidth variant="outlined" margin="normal"
                InputLabelProps={{ shrink: true }}
                inputProps={{ min: new Date().toISOString().split("T")[0] }}
              />
              <TextField
                label="Check-out Date" name="checkOutDate" type="date"
                value={formData.checkOutDate} onChange={handleChange}
                fullWidth variant="outlined" margin="normal"
                InputLabelProps={{ shrink: true }}
                inputProps={{ min: formData.checkInDate || new Date().toISOString().split("T")[0] }}
              />
              <TextField
                label="Number of Guests" name="guests" type="number"
                value={formData.guests} onChange={handleChange}
                fullWidth variant="outlined" margin="normal"
                inputProps={{ min: 1 }}
              />
              <Button fullWidth className={classes.submitBtn} onClick={handleStep1}>
                Next →
              </Button>
            </Box>
          )}

          {/* Step 2 - Personal Details */}
          {step === 2 && (
            <Box>
              <Typography className={classes.cardTitle}>
                Step 2 — Your Details
              </Typography>
              <TextField label="Full Name" name="name" value={formData.name}
                onChange={handleChange} fullWidth variant="outlined" margin="normal" />
              <TextField label="Address" name="address" value={formData.address}
                onChange={handleChange} fullWidth variant="outlined" margin="normal" />
              <TextField label="Contact Number" name="contact" value={formData.contact}
                onChange={handleChange} fullWidth variant="outlined" margin="normal" />
              <TextField label="Email Address" name="email" value={formData.email}
                onChange={handleChange} fullWidth variant="outlined" margin="normal" />
              <Button fullWidth className={classes.submitBtn} onClick={handleStep2}>
                Proceed to Payment →
              </Button>
              <Button fullWidth onClick={() => setStep(1)}
                sx={{ marginTop: "8px", color: "#0D3D1E" }}>
                ← Back
              </Button>
            </Box>
          )}

          {/* Step 3 - Payment */}
          {step === 3 && (
            <Box textAlign="center">
              <Typography className={classes.cardTitle}>
                Step 3 — Payment Confirmation
              </Typography>
              <Typography variant="body2" sx={{ marginBottom: "20px", color: "#555" }}>
                Please complete your payment and enter the confirmation number below to confirm your booking.
              </Typography>
              <TextField
                label="Payment Confirmation Number" name="paymentConfirmation"
                value={formData.paymentConfirmation} onChange={handleChange}
                fullWidth variant="outlined" margin="normal"
              />
              <Button fullWidth className={classes.submitBtn} onClick={handleConfirm} disabled={loading}>
                {loading ? <CircularProgress size={24} color="inherit" /> : "Confirm Booking ✓"}
              </Button>
              <Button fullWidth onClick={() => setStep(2)}
                sx={{ marginTop: "8px", color: "#0D3D1E" }}>
                ← Back
              </Button>
            </Box>
          )}

          {/* Step 4 - Success */}
          {step === 4 && (
            <Box className={classes.successBox}>
              <CheckCircle sx={{ fontSize: 64, color: "#0D3D1E", marginBottom: "16px" }} />
              <Typography variant="h5" sx={{ fontWeight: "bold", color: "#0D3D1E", marginBottom: "12px" }}>
                Booking Successful!
              </Typography>
              <Typography variant="body1" sx={{ color: "#555", marginBottom: "8px" }}>
                Your booking has been confirmed. Check your email for details.
              </Typography>
              <Typography variant="body2" sx={{ color: "#888" }}>
                Thank you for choosing Hotel Royal Stay!
              </Typography>
              <Button className={classes.submitBtn} sx={{ marginTop: "24px !important" }}
                onClick={() => setStep(1)}>
                Book Another Room
              </Button>
            </Box>
          )}

          {/* Help */}
          <Box sx={{ marginTop: "24px", borderTop: "1px solid #eee", paddingTop: "16px" }}>
            <Typography variant="subtitle2" color="textSecondary">Need Help?</Typography>
            <Typography variant="body2" sx={{ color: "#333", fontWeight: 600 }}>
              +91 99430 29268
            </Typography>
          </Box>
        </Card>
      </div>
    </section>
  );
};

export default BookingForm;