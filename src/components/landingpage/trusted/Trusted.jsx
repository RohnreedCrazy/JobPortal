import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  CardActionArea,
} from "@mui/material";

export default function TestimonialCard({src, name, jobCategory, description }) {
  return (
    <Card
      sx={{
        maxWidth: 500,
        boxShadow: 3,
        borderRadius: 2,
        mx: "auto",
        overflow: "hidden",
      }}
    >
      <CardActionArea>
        {/* Image Section */}
        <CardMedia
          component="img"
          alt="Testimonial"
          height="350"
          image={src}
        />

        {/* Content Section */}
        <CardContent>
          {/* Main Testimonial Text */}
          <Typography variant="h5" textAlign="left" >
            {description}
          </Typography>

          {/* User Info */}
          <Box display="flex" alignItems="center" mt={2}>
            <Typography
              variant="h4"
              fontWeight="bold"
              sx={{ marginRight: 2 }}
            >
              {name}
            </Typography>
            <Typography variant="h6" color="text.secondary">
              {jobCategory}
            </Typography>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
