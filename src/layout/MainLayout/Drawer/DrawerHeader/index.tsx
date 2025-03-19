import React from 'react'
import { useTheme } from '@mui/material/styles'
import { Stack, Box } from '@mui/material'

import { LogoSection } from 'components/Logo'

interface DrawerHeaderProps {
  open: boolean
}

export const DrawerHeader = ({ open }: DrawerHeaderProps) => {
  const theme = useTheme()

  return (
    <Box
      sx={{
        // ...theme.mixins.toolbar,
        display: 'flex',
        alignItems: 'center',
        justifyContent: open ? 'flex-start' : 'center',
        paddingLeft: theme.spacing(open ? 3 : 0),
      }}
    >
      <Stack direction="row" spacing={1} alignItems="center">
        <LogoSection />
      </Stack>
    </Box>
  )
}
