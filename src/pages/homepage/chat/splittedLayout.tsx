import React from 'react'
import { useMediaQuery } from '@mui/material'
import { ChatWrapper } from './chatWrapper/chatWrapper'
import { RightPanel } from './rightPanel/rightPanel'
import { RepresentationType } from './utils'

interface SplittedLayoutProps {
  speaker: boolean
}

export const SplittedLayout = ({ speaker }: SplittedLayoutProps) => {
  const isBigScreen = useMediaQuery('(min-width: 1700px)')
  const height = isBigScreen ? '75vh' : '66vh'
  const [data, setData] = React.useState<any>(null)
  const [query, setQuery] = React.useState<string>('')
  const [representation, setRepresentation] =
    React.useState<RepresentationType | null>(null)
  const [selectedProfile /* , setSelectedProfile */] = React.useState<string>(
    import.meta.env.VITE_USERPROFILE || '',
  )

  return (
    <div style={{ display: 'flex', height }}>
      <ChatWrapper
        speaker={speaker}
        setData={setData}
        setQuery={setQuery}
        setRepresentation={setRepresentation}
        selectedProfile={selectedProfile}
      />
      <RightPanel
        data={data}
        query={query}
        representation={representation}
        // selectedProfile={selectedProfile}
        // setSelectedProfile={setSelectedProfile}
      />
    </div>
  )
}
