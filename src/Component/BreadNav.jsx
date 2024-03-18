import React from 'react';
import { Breadcrumbs, Link, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const BreadcrumbsNavigation = ({ path }) => {

  return (
    <Breadcrumbs aria-label="breadcrumb">
      {path.map((crumb, index) => {
        const last = index === path.length - 1;
        const to = crumb.path;
        const name = crumb.name;

        return last ? (
          <Typography color="textPrimary" key={index}>{name}</Typography>
        ) : (
          <Link component={RouterLink} to={to} key={index}>{name}</Link>
        );
      })}
    </Breadcrumbs>
  );
};

export default BreadcrumbsNavigation;
