import React from 'react'
import { Link } from 'react-router-dom'
import { ButtonBase, Typography } from '@mui/material'

import { defaultPath } from 'utils/constants'
import { Logo } from './Logo'

export const LogoSection = () => (
  <ButtonBase
    disableRipple
    component={Link}
    to={defaultPath}
    disabled
    style={{ marginTop: '0.5rem' }}
  >
    <Logo />
    <div
      style={{ display: 'flex', flexDirection: 'column', marginLeft: '0.5rem' }}
    >
      <Typography key="logo1" fontSize={12}>
        <b>A</b>dvanced
      </Typography>
      <Typography key="logo2" fontSize={12}>
        <b>B</b>usiness
      </Typography>
      <Typography key="logo3" fontSize={12}>
        <b>I</b>ntelligence
      </Typography>
    </div>
  </ButtonBase>
)
