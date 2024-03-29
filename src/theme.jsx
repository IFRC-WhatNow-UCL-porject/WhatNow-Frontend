import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1280,
      xl: 1536,
    },
  },
  palette: {
    primary: {
      main: "#FFFFFF",
    },
    secondary: {
      main: "#f5333f",
    },
    background: {
      default: "#F5F5F5",
    },
  },

  typography: {
    fontFamily: ["system-ui", "sans-serif"].join(","),
    fontSize: 12,
    fontWeight: 'bold',
    h1: {
      fontFamily: ["system-ui", "sans-serif"].join(","),
      fontSize: 50,
      color: "#000000",
      fontWeight: 'bold',
    },
    h2: {
      fontFamily: ["system-ui", "sans-serif"].join(","),
      fontSize: 32,
      color: "#000000",
      fontWeight: 'bold',
    },
    h3: {
      fontFamily: ["system-ui", "sans-serif"].join(","),
      fontSize: 20,
      color: "#000000",
      fontWeight: 'bold',
    },
    h4: {
      fontFamily: ["system-ui", "sans-serif"].join(","),
      fontSize: 20,
      color: "#000000",
      fontWeight: 'bold',
    },
    h5: {
      fontFamily: ["system-ui", "sans-serif"].join(","),
      fontSize: 16,
      color: "#000000",
    },
    h6: {
      fontFamily: ["system-ui", "sans-serif"].join(","),
      fontSize: 14,
      color: "#000000",
    },
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiInputLabel-root": { color: "#8D8D8D", fontSize: "12px" },
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "#E0E3E7",
            },
            "&:hover fieldset": {
              borderColor: "#B2BAC2",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#B2BAC2",
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              border: "1px solid #B2BAC2",
            },
          },
        },
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        root: {
          color: "black",
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          "&.Mui-focused": {
            color: "#5A5A5A",
          },
        },
      },
    },

    MuiCheckbox: {
      styleOverrides: {
        root: {
          "&.MuiCheckbox-root.Mui-checked": {
            color: "#f5333f",
          },
        },
      },
    },
    MuiRadio: {
      styleOverrides: {
        root: {
          "&.MuiRadio-root.Mui-checked": {
            color: "#f5333f",
          },
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          color: "#000000",
        },
      },
    },
    MuiPopover: {
      styleOverrides: {
        paper: {
          boxShadow:
            "0 0 0 1px rgba(0,0,0,.08), 0 4px 16px 2px rgba(0,0,0,.08)",
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          color: "#000000",
          "&.Mui-selected": {
            color: "#f5333f",
          },
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          fontWeight: 'bold',
          fontSize: 14,
        },
      },
    },
  }
});
