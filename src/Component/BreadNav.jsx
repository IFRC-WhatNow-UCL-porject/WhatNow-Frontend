import React from 'react';
import { Breadcrumbs, Link, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const BreadcrumbsNavigation = ({ path, isDisplay }) => {

  return (
    <Breadcrumbs aria-label="breadcrumb" sx={{ display: isDisplay ? 'none' : '' }}>
      {path.map((crumb, index) => {
        const last = index === path.length - 1;
        const to = `/${path.slice(index, index + 1).join('/')}`.toLowerCase();

        return last ? (
          <Typography color="textPrimary" key={index}>{crumb}</Typography>
        ) : (
          <Link component={RouterLink} to={to} key={index}>{crumb}</Link>
        );
      })}
    </Breadcrumbs>
  );
};

export default BreadcrumbsNavigation;
