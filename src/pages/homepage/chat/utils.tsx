import React, { useEffect, useState } from 'react'
import dayjs from 'dayjs'
import { SystemMessage, MessageBox } from 'react-chat-elements'
import { formatTimeFrontend } from 'utils/date'
import { useTheme } from '@mui/material'
import { LanguageValues, systemLanguage } from 'utils/constants'

export enum UserChatEnum {
  USER = 'user',
  ROBOT = 'robot',
}

export enum MessageTypeEnum {
  TEXT = 'text',
  PHOTO = 'photo',
}

export interface MessageType {
  id: number
  text: string
  user: UserChatEnum
  timestamp: string | null
  type: MessageTypeEnum
  uri?: string
}

export const INITIAL_MESSAGE: MessageType = {
  id: 0,
  text:
    systemLanguage === LanguageValues.IT
      ? 'Ciao! Come posso aiutarti oggi?'
      : 'Hello! How can I help you today?',
  user: UserChatEnum.ROBOT,
  timestamp: formatTimeFrontend(dayjs().toString()),
  type: MessageTypeEnum.TEXT,
}

export const CHATGPT_ERROR = () =>
  systemLanguage === LanguageValues.IT
    ? "C'è stato un errore nella comunicazione con il server. Riprova."
    : 'There was an error in the communication with the server. Try again.'

export const LastMessage = ({ id }: { id: number }) => {
  const theme = useTheme()

  return (
    <MessageBox
      position="left"
      title="Robot"
      type="text"
      text="LastMessage"
      date={new Date()}
      dateString={formatTimeFrontend(dayjs().toString()) || ''}
      id={id}
      key={id}
      focus={false}
      titleColor={theme.palette.success.main}
      forwarded={false}
      replyButton={false}
      removeButton={false}
      notch
      retracted={false}
      status="sent"
      avatar="/pages/robot.png"
      styles={{
        backgroundColor: (theme.palette.success as any).lighter,
      }}
      notchStyle={{
        fill: (theme.palette.success as any).lighter,
      }}
    />
  )
}

export interface ChatLogType {
  role: string
  content: string
}

export enum RepresentationType {
  SINGLEDATA = 'singledata',
  TABLE = 'table',
  LINECHART = 'linechart',
  BARCHART = 'barchart',
  AREACHART = 'areachart',
  RADIALCHART = 'radialchart',
  PIECHART = 'piechart',
  HEATMAP = 'heatmap',
  BUBBLECHART = 'bubblechart',
  SCATTERCHART = 'scatterchart',
}

interface ResponseChatGPT {
  query: string
  answer: string
  representation: RepresentationType
}

export interface ChatResponse {
  chatLog: ChatLogType[]
  response: ResponseChatGPT
  data: any[] | null | number
}

export const InitialSystemMessage = () => {
  return (
    <SystemMessage
      text="Start of conversation"
      id={-1}
      position="center"
      type="text"
      title="System message"
      focus={false}
      date={dayjs().toDate()}
      forwarded={false}
      titleColor="black"
      replyButton={false}
      removeButton={false}
      retracted={false}
      status="sent"
      notch={false}
    />
  )
}

export const FinishedSystemMessage = () => {
  return (
    <SystemMessage
      text="End of conversation"
      id={-2}
      position="center"
      type="text"
      title="System message"
      focus={false}
      date={dayjs().toDate()}
      forwarded={false}
      titleColor="black"
      replyButton={false}
      removeButton={false}
      retracted={false}
      status="sent"
      notch={false}
    />
  )
}

export const TypingSystemMessage = () => {
  const defaultString =
    systemLanguage === LanguageValues.IT
      ? "L'assistente sta scrivendo"
      : 'The assistant is typing'
  const [typingText, setTypingText] = useState(`${defaultString}...`)
  const [dotsCount, setDotsCount] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setDotsCount((prevCount) => (prevCount + 1) % 4)
    }, 500)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    setTypingText(`${defaultString}${'.'.repeat(dotsCount)}`)
  }, [dotsCount])

  return (
    <SystemMessage
      text={typingText}
      id={-3}
      position="center"
      type="text"
      title="System message"
      focus={false}
      date={dayjs().toDate()}
      forwarded={false}
      titleColor="black"
      replyButton={false}
      removeButton={false}
      retracted={false}
      status="sent"
      notch={false}
      className="msg-is-typing"
    />
  )
}

export const noDataMessage = () =>
  systemLanguage === LanguageValues.IT
    ? 'Nessun dato da visualizzare'
    : 'No data to display'

export const snakeToTitle = (snakeStr: string) => {
  const snakeStrWithoutUnderscore = snakeStr.replaceAll('_', ' ')
  return (
    snakeStrWithoutUnderscore.charAt(0).toUpperCase() +
    snakeStrWithoutUnderscore.slice(1).toLowerCase()
  )
}

export const checkFormatDateTime = (text: any) => {
  if (dayjs(text).isValid() && isNaN(text)) {
    return text.includes('T') || text.includes(' ')
      ? dayjs(text).format('DD/MM/YYYY HH:mm:ss')
      : dayjs(text).format('DD/MM/YYYY')
  }
  return text
}
