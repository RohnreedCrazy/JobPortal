import React from 'react';
import { Box, Container, Button, styled, Chip, Stack } from '@mui/material';

//Carousel slider for job
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './demo-slider.css';
import ImgComponent from 'src/components/landingpage/trusted/Trusted';
import img1 from "src/assets/images/landingpage/trusted/1.jpg";
import img2 from "src/assets/images/landingpage/trusted/2.jpg";
import img3 from "src/assets/images/landingpage/trusted/3.jpg";
import img4 from "src/assets/images/landingpage/trusted/4.jpg";
import img5 from "src/assets/images/landingpage/trusted/5.jpg";

import DemoTitle from './DemoTitle';
const SliderData = [
  {
    src: img1,
    name: 'Emily Johnson',
    jobCategory: 'CEO, HealthPlus',
    description:'Their expertise and dedication were evident from the start. They provided us with the best solutions that perfectly met our needs',

  },
  {
    src: img2,
    name: 'Olivia Brown',
    jobCategory: 'COO, GreenTech',
    description:`We couldn't be happier with the service we received. They truly understand our needs and provided solutions that exceeded our expectations.`,

  },
  {
    src: img3,
    name: 'James Smith',
    jobCategory: 'Founder, FinSolutions',
    description:'We have been thoroughly impressed by the level of service provided. Their attention to detail and commitment to client satisfaction are commendable.',

  },
  {
    src: img4,
    name: 'Sarah Parker',
    jobCategory: 'Marketing Director, TechCorp',
    description:'Minerva exceeded our expectations. The team was professional and their solutions innovative. We saw a significant increase in efficiency after implementing their services.',

  },
  {
    src: img5,
    name: 'Olivia Brown',
    jobCategory: 'Founder, FinSolutions',
    description:'We have been thoroughly impressed by the level of service provided. Their attention to detail and commitment to client satisfaction are commendable.',

  },
];

const DemoSlider = () => {
  const settings = {
    className: 'demo-slider',
    dots: true,
    arrows: false,
    infinite: true,
    adaptiveHeight: true,
  };

  return (
    <Box
      pb="140px"
      overflow="hidden"
      sx={{
        pt: {
          sm: '60px',
          lg: '0',
        },
      }}
    >
      <Container maxWidth="lg">
        {/* Title */}
        <DemoTitle />

        {/* slider */}
        <Box mt={9}>
          <Slider {...settings}>
            {SliderData.map((slider, index) => (
              <Box key={index} textAlign="center" p={1} className="imgbox">
                <Stack
                  direction="row"
                  justifyContent="center"
                  mb="-15px"
                  zIndex="9"
                  position="relative"
                >
                </Stack>
                <ImgComponent
                  src={slider.src}
                  name={slider.name}
                  jobCategory={slider.jobCategory}
                  description={slider.description}
                />
              </Box>
            ))}
          </Slider>
        </Box>
      </Container>
    </Box>
  );
};

export default DemoSlider;
