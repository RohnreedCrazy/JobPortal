import React,{useState, useEffect} from 'react';
import { Box,Typography } from '@mui/material';
import pic1 from 'src/assets/images/landingpage/pic_1.png';
import pic2 from 'src/assets/images/landingpage/pic_2.png';
import pic3 from 'src/assets/images/landingpage/pic_3.png';
import { Link } from 'react-router-dom';

const DreamJobSection = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <Box
      sx={{
        px: 4,
        py: 6,
        display: 'grid',
        gap: 4,
        gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
        background:  '#fff',
      }}
    >
      {/* Image Section */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 2,
        }}
      >
          <Box
            component="img"
            src={pic1}
            alt="about"
            sx={{ borderRadius: 2, width: '100%', maxWidth: 200 }}
          />
          <Box
            component="img"
            src={pic2}
            alt="about"
            sx={{ borderRadius: 2, width: '100%', maxWidth: 200 }}
          />
          <Box
            component="img"
            src={pic3}
            alt="about"
            sx={{ borderRadius: 2, width: '100%', maxWidth: 200 }}
          />
      </Box>

      {/* Text Section */}
        <Box
          sx={{
            px: 2,
            py: { xs: 4, md: 8 },
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <Typography
            variant="h3"
            sx={{
              fontSize: { xs: '2rem', md: '3.5rem' },
              fontWeight: 'bold',
              color: 'text.primary',
              mb: 2,
              lineHeight: 1.3,
            }}
          >
            Finding your dream job is easy!
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: 'text.secondary',
              fontSize: { xs: '1rem', md: '1.2rem' },
              lineHeight: 1.7,
              mb: 4,
            }}
          >
            Established by a visionary passionate for nurturing talent and fostering professional
            growth across the globe, we've quickly become a trusted name in bridging the gap between
            ambitious candidates and their dream careers.
          </Typography>
          <Link
            to={'/'}
            sx={{
              color: 'primary.main',
              fontWeight: 'medium',
              textDecoration: 'none',
              fontSize: '1rem',
              '&:hover': { textDecoration: 'underline' },
            }}
          >
            Read More
          </Link>
        </Box>
    </Box>
  );
};

export default DreamJobSection;
