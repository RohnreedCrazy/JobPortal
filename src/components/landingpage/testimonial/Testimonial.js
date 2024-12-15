import React from 'react';
import { Avatar, Box, CardContent, Container, Typography, Rating, Stack } from '@mui/material';
import TestimonialTitle from './TestimonialTitle';
import BlankCard from '../../shared/BlankCard';

import img1 from 'src/assets/images/client_says/fourdesire-avatar-wei.avif';
import img2 from 'src/assets/images/client_says/garmin-avatar-chloe.avif';
import img3 from 'src/assets/images/client_says/trend-micro-avatar.avif';
import AnimationFadeIn from '../animation/Animation';
//Carousel slider for job
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './testimonial.css';

const SliderData = [
  {
    title: 'Jenny Wilson',
    subtitle: 'HR Specialist',
    avatar: img1,
    subtext:
      'Customizable resumes and intuitive user interface make Minerva a favorable choice by employers. With a more proactive approach than traditional human banks, we can accurately and effectively find the suitable talents at the same time reach international talents to increase the recruiting success rate.',
  },
  {
    title: 'Minshan Cui',
    subtitle: 'Founder',
    avatar: img2,
    subtext:
      `Minerva's clear and easy to use search tools and UI, straightforward resume templates and management tools all allow us to quickly find the right fit who fits in with the company culture and meet’s the company’s needs. Minerva is the next generation’s talent matching platform.`,
  },
  {
    title: 'Eminson Mendoza',
    subtitle: 'Senior HR Specialist',
    avatar: img3,
    subtext:
      `Minerva’s clear and comprehensible resumes not only highlight applicants’ strengths but also allow managers to efficiently go through resumes to get the gist of applicants’ expertise. It is exciting to have had a successful recruitment in such a short time! With Miverva, we’re able to reach out to applicants from different platforms and diversified our sourcing channels.`,
  },
  {
    title: 'Jenny Wilson',
    subtitle: 'HR Specialist',
    avatar: img1,
    subtext:
      `The UI design of Minerva is clean, and its resume builder is getting more and more functional. Employers are able to detect candidates via the design & conception of their resumes. We have targeted and interviewed some candidates on Minerva, and the qualities are fine. Minerva provides us another channel to search for excellent talents, and we look forward to the benefit it will bring to us!`,
  },
  {
    title: 'Sarah Parker',
    subtitle: 'Marketing Director, TechCorp',
    avatar: img2,
    subtext:
      `Minerva exceeded our expectations. The team was professional and their solutions innovative. We saw a significant increase in efficiency after implementing their services.  Their expertise and dedication were evident from the start. They provided us with the best solutions that perfectly met our needs.`,
  },
  {
    title: 'James Smith',
    subtitle: 'Founder, FinSolutions',
    avatar: img3,
    subtext:
      `We have been thoroughly impressed by the level of service provided. Their attention to detail and commitment to client satisfaction are commendable.We couldn't be happier with the service we received. They truly understand our needs and provided solutions that exceeded our expectations.`,
  },
];

const Testimonial = () => {
  const [value, setValue] = React.useState(5);

  const settings = {
    className: 'testimonial-slider',
    dots: true,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <Box pt={14} pb={11}>
      <Container maxWidth="lg">
        <TestimonialTitle />
        <Box mt={5}>
          <AnimationFadeIn>
            <Slider {...settings}>
              {SliderData.map((slider, index) => (
                <Box p="15px" key={index}>
                  <BlankCard>
                    <CardContent>
                      <Stack direction="row">
                        <Avatar src={slider.avatar} alt="user" sx={{ width: 40, height: 40 }} />
                        <Box ml={2}>
                          <Typography variant="h6">{slider.title}</Typography>
                          <Typography color="textSecondary" variant="subtitle1">
                            {slider.subtitle}
                          </Typography>
                        </Box>
                        <Box ml="auto">
                          <Rating
                            size="small"
                            name="simple-controlled"
                            value={value}
                            onChange={(event, newValue) => {
                              setValue(newValue);
                            }}
                          />
                        </Box>
                      </Stack>
                      <Typography fontSize="15px" color="textSecondary" mt={3}>
                        {slider.subtext}
                      </Typography>
                    </CardContent>
                  </BlankCard>
                </Box>
              ))}
            </Slider>
          </AnimationFadeIn>
        </Box>
      </Container>
    </Box>
  );
};

export default Testimonial;
