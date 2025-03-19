import { Theme } from '@mui/material'

export const Select = (theme: Theme) => {
  return {
    MuiMenuItem: {
      styleOverrides: {
        root: {
          '&.Mui-selected': {
            backgroundColor: theme.palette.primary.light,
            color: theme.palette.primary.contrastText,
          },
          '&.Mui-selected:hover': {
            backgroundColor: theme.palette.primary.dark,
          },
        },
      },
    },
  }
}
