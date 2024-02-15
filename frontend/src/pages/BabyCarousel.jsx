import React, { useState, useEffect } from "react";
import Carousel from "react-material-ui-carousel";
import { Box, Button, Container, Stack, Typography } from "@mui/material";

const BabyCarousel = (props) => {
  const [url, setUrl] = useState();

  useEffect(() => {
    let arr = [];
    if(props.babyRecord) {
      let j = 0;
      for(let i=0; i<props.babyRecord.length; i++) {
        if(props.babyRecord[i].images.length > 0){
          for(let k=0; k<props.babyRecord[i].images.length; k++) {
            arr.push({
              "num" : j++,
              "recordDate" : props.babyRecord[i].recordDate,
              "image" : props.babyRecord[i].images[k]
            })
          }
        }
      }
      setUrl([...arr]);
    }
  }, [props.babyRecord])

  
  return (
    <Box sx={{ width: "100%" }}>
      {url && url.length > 0 ? <Carousel
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
        {url.map((content) => (
          <Stack
            key={content.num}
            sx={{
              displayplay: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography variant="h5" color="#112b23" mb={3}>
              {content.recordDate}
            </Typography>
            <img src={content.image} width={250} height={350} alt={content.recordDate} key={content.num} />
          </Stack>
        ))}
      </Carousel> : <Typography fontSize={26} variant="body2" style={{ whiteSpace: "pre-line", textAlign: "center" }}> 기록된 사진이<br/>없습니다. </Typography>}
    </Box>
  );
};

export { BabyCarousel };
