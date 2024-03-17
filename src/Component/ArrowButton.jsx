import React from 'react';
import Button from '@mui/material/Button';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'; // 导入箭头图标
import { styled } from '@mui/material/styles';


const StyledButton = styled(Button)({
  color: 'white',
  position: 'relative',
  overflow: 'hidden',
  padding: '6px 12px', 
  backgroundColor: '#b30000',
  transition: 'all 300ms ease-in-out',
  '& .content': {
    display: 'flex',
    alignItems: 'center',
    transition: 'transform 300ms ease-in-out',
  },
  '& .arrowIcon': {
    opacity: 0,
    transform: 'translateX(-20px)',
    transition: 'opacity 300ms ease-in-out, transform 300ms ease-in-out',
  },
  '&:hover': {
    padding: '6px 8px 6px 16px', 
  },
  '&:hover .content': {
    transform: 'translateX(5px)',
  },
  '&:hover .arrowIcon': {
    opacity: 1,
    transform: 'translateX(0)',
  },
});

const HoverArrowButton = ({ text, style, event }) => {
  return (
    <StyledButton sx={{...style}} onClick={() => event()}>
      <div className="content">
        <ArrowForwardIosIcon className="arrowIcon" fontSize="small" />
        <span>{text}</span>
      </div>
    </StyledButton>
  );
};

export default HoverArrowButton;
