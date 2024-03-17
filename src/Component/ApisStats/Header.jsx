import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Paper, Typography, Grid, Box } from '@mui/material';

import ApiList from './ApiList';

import { get_apis } from '../../store/features/gdpc_admin.slice';

const CountUpAnimation = ({ targetNumber, duration, imgPath, title }) => {

  const refreshRate = 10;   // 10ms refresh one time

  const [currentNumber, setCurrentNumber] = useState(0);
  const increment = targetNumber / (duration * (1000 / refreshRate));

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentNumber(prevNumber => {
        const updatedNumber = prevNumber + increment;
        if (updatedNumber >= targetNumber) {
          clearInterval(interval);
          return targetNumber;
        }
        return updatedNumber;
      });
    }, refreshRate);

    return () => clearInterval(interval);
  }, [targetNumber, duration]);

  return (
      <Box
        style={{
          width: '100%',
          height: '110px',
          border: '3px solid #D3D3D3',
          borderRadius: '10px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Typography variant="h3" style={{ display: 'flex', alignItems: 'center', fontWeight: 'bold', color: '#808080' }}>
          <img src={imgPath} alt="icon" style={{ width: '30px', height: '30px', marginRight: 15 }} />
          {title}
        </Typography>
        <Typography variant="h4" sx={{ mt:2, fontWeight: 'bold' }}>{Math.round(currentNumber)}</Typography>
      </Box>
  );
};

const ContentHeader = ({children}) => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [totalHits, setTotalHits] = useState(0);
  const [totalApps, setTotalApps] = useState(0);
  const [totalImpacted, setTotalImpacted] = useState(0);

  const [apiList, setApiList] = useState([]);

  React.useEffect(() => {
    dispatch(get_apis()).then((response) => {
      const result = response.payload;
      if (result.status) {
        setApiList(result.data);
      }
    });
  }, [navigate]);

  React.useEffect(() => {
    setTotalApps(apiList.length);
    apiList.forEach(api => {
      setTotalHits(prevTotal => prevTotal + api.hits);
      setTotalImpacted(prevTotal => prevTotal + api.reach);
    });
  }, [apiList]);


  return (
    <>
        <Paper 
            sx={{
                position: 'relative',
                padding: 2, 
                backgroundImage: 'url(' + process.env.PUBLIC_URL + '/map.png)', 
                backgroundSize: 'cover', 
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                height: '200px',
                marginTop: 4
            }}
        >
            <Box
                sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(230, 230, 230, 0.5)',
                }}
            />

            <Box sx={{ position: 'relative', zIndex: 1, width: '100%' }}>
                <Grid container alignItems="center" justifyContent="space-between" spacing={2}>
                    <Grid item xs={12} md={6}>
                        <Typography variant="h2" sx={{ paddingLeft: 2, fontWeight: 'bold' }} >API STATS</Typography>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Paper style={{ width: '100%', height: '150px', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
                        <Grid container spacing={4}>
                          <Grid item xs={4}>
                            <CountUpAnimation targetNumber={totalHits} duration={2} imgPath={process.env.PUBLIC_URL + '/profile-duo.svg'} title={"Total Hits"} />
                          </Grid>
                          <Grid item xs={4}>
                            <CountUpAnimation targetNumber={totalApps} duration={1} imgPath={process.env.PUBLIC_URL + '/accounts.svg'} title={"Total Apps"} />
                          </Grid>
                          <Grid item xs={4}>
                            <CountUpAnimation targetNumber={totalImpacted} duration={2} imgPath={process.env.PUBLIC_URL + '/speedometer.svg'} title={"Est. Impacted"} />
                          </Grid>
                        </Grid>
                      </Paper>
                    </Grid>
                </Grid>
            </Box>
        </Paper>
        {React.Children.map(children, (child) => {
          if (child.type === ApiList) {
            return React.cloneElement(child, { apiList: apiList });
          }
          return child;
        })}
    </>
  );
};

export default ContentHeader;
