import React, { useState, useEffect } from 'react';
import { Box, Container, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';

const ContentBox = styled(Box)({
  height: '100px',
  margin: '20px 0',
  opacity: 0,
  transform: 'translateX(-100px)',
  transition: 'opacity 300ms ease-in-out, transform 300ms ease-in-out',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
});

const SlideContent = () => {
  const [showContent, setShowContent] = useState(false);

  const handleScroll = () => {
    const position = window.pageYOffset;
    if (position > 0) { // 可以调整这个值以匹配特定滚动位置
      setShowContent(true);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <Container maxWidth="xl">      
      <Grid container spacing={4}>
        <Grid item xs={4}>
          <ContentBox style={{
            opacity: showContent ? 1 : 0,
            transform: showContent ? 'translateX(0)' : 'translateX(-100px)',
            backgroundColor: 'white',
          }}/>
        </Grid>
        <Grid item xs={4}>
          <ContentBox style={{
            opacity: showContent ? 1 : 0,
            transform: showContent ? 'translateY(0)' : 'translateY(100px)',
            backgroundColor: 'white'
          }} />
        </Grid>
        <Grid item xs={4}>
          <ContentBox style={{
            opacity: showContent ? 1 : 0,
            transform: showContent ? 'translateX(0)' : 'translateX(100px)',
            backgroundColor: 'white'
          }} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default SlideContent;
