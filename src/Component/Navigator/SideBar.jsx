import { Toolbar, Box, Tab } from '@mui/material';

const SideBar = ({ show, handleMouseEnter, handleMouseLeave, appBarHeight, text }) => {

    return (
        <div
            style={{
                position: 'fixed',
                top: appBarHeight,
                width: '100%',
                zIndex: 99,  // only lower than navbar, but higher than ant other element
                opacity: show ? 1 : 0,
                transition: 'opacity 0.3s ease-in-out',
                pointerEvents: show ? 'auto' : 'none',
            }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <Box style={{ backgroundColor: '#DCDCDC', color: '#333' }}>
                <Toolbar>
                    <Box display="flex" justifyContent="space-around" width="100%">
                        {Object.keys(text).map((item, index) => (
                            <Tab
                                key={index}
                                label={item}
                                href={text[item]}
                                sx={{
                                    color: 'black',
                                    fontSize: '1rem', // text size
                                    textDecoration: 'none',
                                    textDecorationThickness: '4px',
                                    textUnderlineOffset: '5px',
                                    textTransform: 'none', // text transform
                                    '&:hover': {
                                        textDecoration: 'underline',
                                        textDecorationColor: 'red',
                                        textDecorationThickness: '4px', // adjust underline thickness
                                        textUnderlineOffset: '5px', // adjust underline offset
                                        fontWeight: 'bold', // text weight
                                    },
                                    '& .MuiTouchRipple-root': {
                                        display: 'none',
                                    }
                                }}
                            />
                        ))}
                    </Box>
                </Toolbar>
            </Box>
        </div>
    )
}

export default SideBar;