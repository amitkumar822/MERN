import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { FaStar } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-toastify";
import { CircularProgress, IconButton, Input, TextField } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export const WriteReview = ({ productId, fetchReview }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  //********👇 Product Review Review Fuctionality 👇************
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState("");
  const [showPhoto, setShowPhoto] = useState(null);
  const [photo, setPhoto] = useState(null);

  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    const formData = new FormData();
    formData.append("photo", photo);
    formData.append("review", comment);
    formData.append("rating", rating);

    try {
      await axios.post(`/api/review/write-reviews/${productId}`, formData, {
        withCredentials: true,
      });
      setLoading(false);
      toast.success(`Review added successfully`);

      setRating(0);
      setComment("");
      setShowPhoto(null);
      setPhoto(null);

      fetchReview();
    } catch (error) {
      setLoading(false);
      toast.error(error?.response?.data?.message || "Failed to add review");
      console.error(error);
    }
  };

  return (
    <>
      <Button
        onClick={handleOpen}
        sx={{ color: "white", paddingX: 3, paddingY: 1 }}
      >
        <span className="flex items-center gap-2">
          <FaStar className="text-yellow-300" /> Product Review
        </span>
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              mb: 2,
            }}
          >
            <Typography
              variant="h5"
              component="h2"
              sx={{ fontWeight: "bold", color: "text.primary" }}
            >
              Write a Review
            </Typography>
            <IconButton
              onClick={handleClose}
              sx={{
                color: "text.secondary",
                "&:hover": {
                  color: "error.main",
                  backgroundColor: "rgba(255, 0, 0, 0.1)",
                },
              }}
            >
              <CloseIcon fontSize="large" />
            </IconButton>
          </Box>

          {/* Rating */}
          <Box sx={{ display: "flex", alignItems: "center", marginBottom: 3 }}>
            {[...Array(5)].map((_, i) => (
              <IconButton
                key={i}
                sx={{
                  fontSize: "2rem",
                  color: (hover || rating) > i ? "yellow" : "gray",
                }}
                onMouseEnter={() => setHover(i + 1)}
                onMouseLeave={() => setHover(0)}
                onClick={() => setRating(i + 1)}
              >
                <FaStar />
              </IconButton>
            ))}
          </Box>

          {/* Comment Input */}
          <TextField
            fullWidth
            multiline
            rows={4}
            placeholder="Write your review here..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            variant="outlined"
            sx={{ marginBottom: 3 }}
          />

          {/* Photo Upload */}
          <Box sx={{ marginBottom: 3 }}>
            <Typography
              variant="body2"
              gutterBottom
              sx={{ fontWeight: 500, color: "text.secondary" }}
            >
              Upload a photo
            </Typography>
            <Input
              type="file"
              accept="image/*"
              onChange={(e) => {
                setShowPhoto(URL.createObjectURL(e.target.files[0]));
                setPhoto(e.target.files[0]);
              }}
              disableUnderline
            />
            {showPhoto && (
              <Box
                component="img"
                src={showPhoto}
                alt="Preview"
                sx={{
                  marginTop: 2,
                  height: 100,
                  borderRadius: 1,
                  boxShadow: 1,
                }}
              />
            )}
          </Box>

          {/* Submit Button */}
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            disabled={loading}
            sx={{ paddingY: 1.5 }}
          >
            {loading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Submit Review"
            )}
          </Button>
        </Box>
      </Modal>
    </>
  );
};
