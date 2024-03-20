import React, { useState, useEffect, useRef } from 'react';
import { AppBar, Toolbar, Box, Button } from '@mui/material';
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import Logo from './Logo';
import LogButton from './LogButton';
import MenuTab from './MenuTab';
import SideBar from './SideBar';
import Snackbar from '../SnackBar';

import { logout } from "../../store/features/auth.slice";
import { checkUserRole } from "../../store/features/auth.slice";

import { userRoles } from "../../constant";

const ns_admin_dashboard = {
  'WHATNOW CONTENT': '/ns_admin/content',
  'AUDIT LOGS': '/ns_admin/auditlog',
  'REGIONS': '/ns_admin/region'
};

const ns_editor_dashboard = {
  'WHATNOW CONTENT': '/ns_editor/content',
  'AUDIT LOGS': '/ns_editor/auditlog',
  'REGIONS': '/ns_editor/region'
}

const api_user_dashboard = {
  'MY APPS': '/api_user/my_apps'
};

const reviewer_dashboard = {
  'MY APPS': '/reviewer/my_apps'
};

const gdpc_admin_dashboard = {
  'WHATNOW CONTENT': '/gdpc_admin/content',
  'AUDIT LOGS': '/gdpc_admin/auditlog',
  'REGIONS': '/gdpc_admin/region',
  'MANAGE USERS': '/gdpc_admin/manage_users',
  'API STATS': '/gdpc_admin/apis_stats',
  'MANAGE API USER': '/gdpc_admin/manage_api_users',
  'MANAGE TERMS': '/gdpc_admin/manage_terms',
}

const ns_admin_doc = {
  'API DOCUMENT': '/api_document',
  'SIGN UP GUIDE': '/sign_up_guide'
};

const ns_editor_doc = {
  'API DOCUMENT': '/api_document',
  'SIGN UP GUIDE': '/sign_up_guide'
}

const api_user_doc = {
  'API DOCUMENT': '/api_document',
  'SIGN UP GUIDE': '/sign_up_guide'
};

const reviewer_doc = {
  'API DOCUMENT': '/api_document',
  'SIGN UP GUIDE': '/sign_up_guide'
};

const gdpc_admin_doc = {
  'API DOCUMENT': '/api_document',
  'SIGN UP GUIDE': '/sign_up_guide'
};

const Navbar = (props) => {
  const [menuOpen_dashboard, setMenuOpen_dashboard] = useState(false);
  const [menuOpen_doc, setMenuOpen_doc] = useState(false);
  const [menuTop, setMenuTop] = useState(0);
  const [shrink, setShrink] = useState(false);
  const closeMenuTimer_dashboard = useRef(null);
  const closeMenuTimer_doc = useRef(null);
  const appBarRef = useRef(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [ userRole, setUserRole ] = useState(0);

  React.useEffect(() => {
    if (localStorage.getItem('access_token')) {
      try {
        dispatch(checkUserRole()).then((response) => {
          const result = response.payload;
          if (result) {
            if (result.status) {
              setUserRole(result.data.role_id);
            }
          }
        });
      } catch (err) {
        console.log(err);
      }
    }
  }, [navigate]);

  const handleLogout = async () => {
    try {
      dispatch(logout()).then((response) => {
        const result = response.payload;
        if (result.status) {
          localStorage.removeItem("access_token");
          localStorage.removeItem("user");
          window.location.reload();
        }
      });
    } catch (err) {
      console.log(err);
    }
  }

  // main bar controle
  const updateMenuPosition = () => {
    if (appBarRef.current) {
        setMenuTop(appBarRef.current.clientHeight);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', updateMenuPosition);
    updateMenuPosition();

    return () => {
        window.removeEventListener('scroll', updateMenuPosition);
    };
  }, []);

  const handleScroll = () => {
    if (window.pageYOffset > 0) {
      setShrink(true);
    } else {
      setShrink(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // side bar controle
  const handleMouseEnter_dashboard = () => {
    setMenuOpen_doc(false);
    if (closeMenuTimer_dashboard.current) {
        clearTimeout(closeMenuTimer_dashboard.current);
    }
    setMenuOpen_dashboard(true);
  };

  const handleMouseLeave_dashboard = () => {
    closeMenuTimer_dashboard.current = setTimeout(() => {
        setMenuOpen_dashboard(false);
    }, 500);
  };

  const handleMouseEnter_doc = () => {
    setMenuOpen_dashboard(false);
    if (closeMenuTimer_doc.current) {
        clearTimeout(closeMenuTimer_doc.current);
    }
    setMenuOpen_doc(true);
  };

  const handleMouseLeave_doc = () => {
    closeMenuTimer_doc.current = setTimeout(() => {
        setMenuOpen_doc(false);
    }, 500);
  };

  return (
    <div>
      <AppBar 
          position="fixed" 
          style={{
            transition: '0.3s',
            height: shrink ? '64px' : '90px', // adjust navbar height
            color: '#000',
            zIndex: 200,
          }}
      >
        <Toolbar style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            height: '100%'
        }}> {/* center item */}
            <Box display="flex" alignItems="center">
                <Logo src={process.env.PUBLIC_URL + '/logo.png'} shrink={shrink} />
            </Box>
            <Box display="flex" alignItems="center">
                <MenuTab handleMouseEnter={handleMouseEnter_doc} handleMouseLeave={handleMouseLeave_doc} hover={menuOpen_doc} style={{ marginLeft: '50px', marginRight: '10px' }} text='Learn More' />
                {
                  localStorage.getItem('access_token')
                  ?
                  <Button
                    disableRipple
                    aria-controls="customized-menu"
                    aria-haspopup="true"
                    onClick={() => window.location.href = '/whatnow_messages'}
                    sx={{
                      marginLeft: '50px',
                      color: 'black',
                      fontSize: '1.3rem',
                      fontWeight: 'bold',
                      textDecoration: 'none',
                      textDecorationThickness: '4px',
                      textUnderlineOffset: '5px',
                      textTransform: 'none',
                      '&:hover': {
                        textDecoration: 'underline',
                        textDecorationColor: 'red',
                        textDecorationThickness: '4px',
                        textUnderlineOffset: '5px'
                      },
                    }}
                  >
                    Whatnow Messages
                  </Button>
                  :
                  null
                }
                {
                  localStorage.getItem('access_token')
                  ?
                  <MenuTab handleMouseEnter={handleMouseEnter_dashboard} handleMouseLeave={handleMouseLeave_dashboard} hover={menuOpen_dashboard} style={{ marginLeft: '50px', marginRight: '10px' }} text='Dashboard' />
                  :
                  null
                }
                {localStorage.getItem('access_token')
                ?
                <>
                  <LogButton text="Profile" style={{ marginLeft: '50px', marginRight: '10px' }} shrink={shrink} onClick={() => window.location.href = '/profile'} />
                  <LogButton text="Logout" style={{ marginLeft: '50px', marginRight: '10px' }} shrink={shrink} onClick={() => handleLogout().then(()=>{navigate("/")})} />
                </>
                :
                <>
                  <LogButton text="Login" style={{ marginLeft: '50px', marginRight: '10px' }} shrink={shrink} onClick={() => window.location.href = '/login'} />
                  <LogButton text="Register" shrink={shrink} onClick={() => window.location.href = '/register'} />
                </>}
            </Box>
        </Toolbar>
      </AppBar>
      <SideBar show={menuOpen_doc} handleMouseEnter={handleMouseEnter_doc} handleMouseLeave={handleMouseLeave_doc} appBarHeight={menuTop + (shrink ? '64px' : '90px')} text={
        (userRole === userRoles.NS_ADMIN) ? ns_admin_doc : 
        (userRole === userRoles.API_USER) ? api_user_doc : 
        (userRole === userRoles.GDPC_ADMIN) ? gdpc_admin_doc :
        (userRole === userRoles.NS_EDITOR) ? ns_editor_doc :
        (userRole === userRoles.REVIEWER) ? reviewer_doc : api_user_doc
      }/>
      <SideBar show={menuOpen_dashboard} handleMouseEnter={handleMouseEnter_dashboard} handleMouseLeave={handleMouseLeave_dashboard} appBarHeight={menuTop + (shrink ? '64px' : '90px')} text={
        (userRole === userRoles.NS_ADMIN) ? ns_admin_dashboard : 
        (userRole === userRoles.API_USER) ? api_user_dashboard : 
        (userRole === userRoles.GDPC_ADMIN) ? gdpc_admin_dashboard :
        (userRole === userRoles.NS_EDITOR) ? ns_editor_dashboard :
        (userRole === userRoles.REVIEWER) ? reviewer_dashboard : api_user_dashboard
      } />
      <Box sx={{ marginTop: '110px', zIndex: 0 }}>
        {props.children}
      </Box>
      <Snackbar />
    </div>
  );
};

export default Navbar;
