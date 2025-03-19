import React from 'react'
import {
  Alert,
  Button,
  // InputLabel,
  // MenuItem,
  // Select,
  useTheme,
} from '@mui/material'

import { MainCard } from 'components/MainCard'
import { Empty, Spin } from 'antd'
import { ReloadOutlined } from '@ant-design/icons'
import { LanguageValues, systemLanguage } from 'utils/constants'
import DynamicTable from './dynamicTable'
import { noDataMessage, RepresentationType } from '../utils'
import DynamicSingleData from './dynamicSingleData'
import DynamicLineChart from './dynamicLineChart'
import DynamicBarChart from './dynamicBarChart'
import DynamicAreaChart from './dynamicAreaChart'
import DynamicRadialChart from './dynamicRadialChart'
import DynamicPieChart from './dynamicPieChart'
import DynamicHeatMap from './dynamicHeatMap'
import DynamicBubbleChart from './dynamicBubbleChart'
import DynamicScatterChart from './dynamicScatterChart'

interface RightPanelProps {
  data: any[] | number | null
  query: string
  representation: RepresentationType | null
  // setSelectedProfile: (value: string) => void
  // selectedProfile: string
}

export interface Profile {
  nameIT: string
  nameEN: string
  value: string
}

export const profilesList: Profile[] = [
  {
    nameIT: 'Utente base',
    nameEN: 'Basic user',
    value: 'B',
  },
  {
    nameIT: 'Utente intermedio',
    nameEN: 'Intermediate user',
    value: 'I',
  },
  {
    nameIT: 'Utente avanzato',
    nameEN: 'Advanced user',
    value: 'A',
  },
]

export const RightPanel = ({
  data,
  query,
  representation,
  // setSelectedProfile,
  // selectedProfile,
}: RightPanelProps) => {
  const theme = useTheme()
  const [isLoading, setIsLoading] = React.useState(false)
  const [firstRender, setFirstRender] = React.useState(true)

  React.useEffect(() => {
    if (firstRender) {
      setFirstRender(false)
      return
    }
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
    }, 500)
  }, [data])

  return (
    <div
      style={{
        borderLeft: `1px solid ${theme.palette.grey[300]}`,
        paddingLeft: '1rem',
        width: '50%',
        overflow: 'auto',
      }}
    >
      <MainCard
        sx={{
          marginRight: '1rem',
          height: '100%',
          backgroundColor: isLoading ? 'rgba(0, 0, 0, 0.05)' : 'inherit',
          overflow: 'auto',
        }}
        contentSX={{
          height: '80%',
        }}
        title={
          systemLanguage === LanguageValues.IT
            ? 'Visualizzazione dati'
            : 'Data visualization'
        }
        customElement={
          <>
            {/* <InputLabel id="profile-label">
              {systemLanguage === LanguageValues.IT ? 'Profilo' : 'Profile'}
            </InputLabel>
            <Select
              labelId="profile-label"
              id="profile"
              value={selectedProfile || ''}
              label={
                systemLanguage === LanguageValues.IT ? 'Profilo' : 'Profile'
              }
              name="profile"
              onChange={(e) => setSelectedProfile(e.target.value as string)}
              disabled={!!selectedProfile}
              style={{ marginRight: '2rem', width: '10rem' }}
            >
              {profilesList?.map((profile) => (
                <MenuItem value={profile.value} key={profile.value}>
                  {systemLanguage === LanguageValues.IT
                    ? profile.nameIT
                    : profile.nameEN}
                </MenuItem>
              ))}
            </Select> */}
            <Button
              variant="outlined"
              onClick={() => window.location.reload()}
              startIcon={<ReloadOutlined />}
            >
              {systemLanguage === LanguageValues.IT
                ? 'Nuova richiesta'
                : 'New request'}
            </Button>
          </>
        }
      >
        {isLoading && (
          <Spin
            size="large"
            style={{
              position: 'relative',
              top: '50%',
              left: '50%',
            }}
          />
        )}
        {!isLoading &&
          import.meta.env.VITE_DEBUG_MODE === 'true' &&
          query &&
          typeof query !== 'object' &&
          query !== 'N/A' && (
            <Alert severity="info" sx={{ marginBottom: '1rem' }}>
              {query}
            </Alert>
          )}
        {!isLoading && !data && <Empty description={noDataMessage()} />}
        {!isLoading &&
          data &&
          representation === RepresentationType.SINGLEDATA && (
            <DynamicSingleData data={data} />
          )}
        {!isLoading &&
          data &&
          Array.isArray(data) &&
          representation === RepresentationType.LINECHART && (
            <DynamicLineChart data={data} />
          )}
        {!isLoading &&
          data &&
          Array.isArray(data) &&
          representation === RepresentationType.BARCHART && (
            <DynamicBarChart data={data} />
          )}
        {!isLoading &&
          data &&
          Array.isArray(data) &&
          representation === RepresentationType.AREACHART && (
            <DynamicAreaChart data={data} />
          )}
        {!isLoading &&
          data &&
          Array.isArray(data) &&
          representation === RepresentationType.RADIALCHART && (
            <DynamicRadialChart data={data} />
          )}
        {!isLoading &&
          data &&
          Array.isArray(data) &&
          representation === RepresentationType.PIECHART && (
            <DynamicPieChart data={data} />
          )}
        {!isLoading &&
          data &&
          Array.isArray(data) &&
          representation === RepresentationType.TABLE && (
            <DynamicTable data={data} />
          )}
        {!isLoading &&
          data &&
          Array.isArray(data) &&
          representation === RepresentationType.HEATMAP && (
            <DynamicHeatMap data={data} />
          )}
        {!isLoading &&
          data &&
          Array.isArray(data) &&
          representation === RepresentationType.BUBBLECHART && (
            <DynamicBubbleChart data={data} />
          )}
        {!isLoading &&
          data &&
          Array.isArray(data) &&
          representation === RepresentationType.SCATTERCHART && (
            <DynamicScatterChart data={data} />
          )}
      </MainCard>
    </div>
  )
}
