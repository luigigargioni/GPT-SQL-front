import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Provider as ReduxProvider } from 'react-redux'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { SWRConfig } from 'swr'
import { ConfigProvider } from 'antd'
import itIT from 'antd/locale/it_IT'
import 'dayjs/locale/it'
import 'antd/dist/reset.css'

import { swrParams } from 'services/api'
import { ToastContainerStyled } from 'components/ToastContainer'
import ThemeCustomization from 'themes'
import { Routes } from 'routes'
import { defaultPath } from 'utils/constants'
import { locale } from 'dayjs'
import { store } from './store'
import 'regenerator-runtime'

locale('it')

const container = document.getElementById('root') as HTMLElement
const root = createRoot(container)

root.render(
  <StrictMode>
    <ReduxProvider store={store}>
      <BrowserRouter basename={defaultPath}>
        <SWRConfig value={swrParams}>
          <ConfigProvider locale={itIT}>
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="it">
              <ThemeCustomization>
                <Routes />
              </ThemeCustomization>
              <ToastContainerStyled />
            </LocalizationProvider>
          </ConfigProvider>
        </SWRConfig>
      </BrowserRouter>
    </ReduxProvider>
  </StrictMode>,
)
