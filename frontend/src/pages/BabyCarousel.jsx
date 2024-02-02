import React, { useState, useEffect } from "react";
import Carousel from "react-material-ui-carousel";
import { Box, Button, Container, Stack, Typography } from "@mui/material";

const BabyCarousel = () => {
  const imageData = [
    {
      label: "Image 1",
      alt: "image1",
      url: "https://picsum.photos/200/300",
    },

    {
      label: "Image 2",
      alt: "image2",
      url: "https://picsum.photos/200/300",
    },

    {
      label: "Image 3",
      alt: "image3",
      url: "https://picsum.photos/200/300",
    },

    {
      label: "Image 4",
      alt: "image4",
      url: "https://picsum.photos/200/300",
    },

    {
      label: "Image 5",
      alt: "image5",
      url: "https://picsum.photos/200/300",
    },
  ];
  return (
    <Box sx={{ width: "30vw", height: "40vh" }}>
      <Carousel
        showArrows={true}
        centerMode={true}
        centerSlidePercentage={10}
        showThumbs={false}
        showStatus={false}
        autoPlay={false}
        infiniteLoop={true}
        swipe={true}
        sx={{
          displayplay: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {imageData.map((content) => (
          <Stack
            sx={{
              displayplay: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography variant="h5" color="#112b23" mb={3}>
              {content.label}
            </Typography>
            <img src={content.url} width={300} height={210} alt={content.alt} key={content.label} />
          </Stack>
        ))}
      </Carousel>
    </Box>
  );
};

export { BabyCarousel };
