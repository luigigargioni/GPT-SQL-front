import { MutedOutlined, SoundOutlined } from '@ant-design/icons'
import React from 'react'

import { MainCard } from 'components/MainCard'
import { Palette } from 'themes/palette'
import { SplittedLayout } from './splittedLayout'

const Chat = () => {
  const [speaker, setSpeaker] = React.useState(false)
  const themePalette = Palette('light')

  const title = 'Advanced Business Intelligence'

  return (
    <MainCard
      title={title}
      customElement={
        speaker ? (
          <SoundOutlined
            onClick={() => setSpeaker(!speaker)}
            style={{
              color: themePalette.palette.primary.main,
              fontSize: '2em',
            }}
          />
        ) : (
          <MutedOutlined
            onClick={() => setSpeaker(!speaker)}
            style={{
              color: themePalette.palette.error.main,
              fontSize: '2em',
            }}
          />
        )
      }
    >
      <SplittedLayout speaker={speaker} />
    </MainCard>
  )
}

export default Chat
