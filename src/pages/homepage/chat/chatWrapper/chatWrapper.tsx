import React, { useEffect } from 'react'
import {
  IconButton,
  InputAdornment,
  OutlinedInput,
  useTheme,
} from '@mui/material'
import dayjs from 'dayjs'
import { AudioOutlined, BorderOutlined, SendOutlined } from '@ant-design/icons'
import { MessageBox } from 'react-chat-elements'
import SpeechRecognition, {
  useSpeechRecognition,
} from 'react-speech-recognition'
import { useDispatch } from 'react-redux'

import { formatTimeFrontend } from 'utils/date'
import 'react-chat-elements/dist/main.css'
import './customStyle.css'
import { MethodHTTP, ResponseInterface, fetchApi } from 'services/api'
import { endpoints } from 'services/endpoints'
import { openDrawer } from 'store/reducers/menu'
import { LanguageValues, systemLanguage } from 'utils/constants'
import {
  CHATGPT_ERROR,
  ChatLogType,
  ChatResponse,
  RepresentationType,
  INITIAL_MESSAGE,
  MessageType,
  MessageTypeEnum,
  TypingSystemMessage,
  UserChatEnum,
} from '../utils'
import { profilesList } from '../rightPanel/rightPanel'

const scrollToBottom = () => {
  const chatContainer = document.getElementById('chatContainer')
  if (chatContainer) chatContainer.scrollTop = chatContainer.scrollHeight
}

interface ChatWrapperProps {
  speaker: boolean
  setData: (data: any) => void
  setQuery: (query: string) => void
  setRepresentation: (representation: RepresentationType) => void
  selectedProfile: string
}

export const ChatWrapper = ({
  speaker,
  setData,
  setQuery,
  setRepresentation,
  selectedProfile,
}: ChatWrapperProps) => {
  const dispatch = useDispatch()
  const theme = useTheme()
  const [listMessages, setListMessages] = React.useState<MessageType[]>([
    INITIAL_MESSAGE,
  ])
  const [chatLog, setChatLog] = React.useState<ChatLogType[]>([])
  const [message, setMessage] = React.useState('')
  const [isProcessing, setIsProcessing] = React.useState(false)
  const [isRecording, setIsRecording] = React.useState(false)
  const {
    transcript,
    browserSupportsSpeechRecognition,
    isMicrophoneAvailable,
    listening,
  } = useSpeechRecognition()

  const onMessageSend = (textMessage: string) => {
    const messagesWithUserRequest = [
      ...listMessages,
      {
        text: textMessage,
        id: listMessages[listMessages.length - 1].id + 1,
        user: UserChatEnum.USER,
        timestamp: formatTimeFrontend(dayjs().toString()),
        type: MessageTypeEnum.TEXT,
      },
    ]
    setListMessages(messagesWithUserRequest)
    setIsProcessing(true)
    setMessage('')

    const profile = profilesList.find((item) => item.value === selectedProfile)

    fetchApi({
      endpoint: endpoints.chat.newMessage,
      methodApi: MethodHTTP.POST,
      body: { message: textMessage, chatLog, profile: profile?.value },
    })
      .then((res: ResponseInterface) => res.data as ChatResponse)
      .then((res: ChatResponse) => {
        if (res) {
          if (speaker) {
            const utterance = new SpeechSynthesisUtterance(res.response.answer)
            utterance.lang =
              systemLanguage === LanguageValues.IT ? 'it-IT' : 'en-US'
            window.speechSynthesis.speak(utterance)
          }

          const newMessage: MessageType = {
            text: res.response.answer || CHATGPT_ERROR(),
            id:
              messagesWithUserRequest[messagesWithUserRequest.length - 1].id +
              1,
            user: UserChatEnum.ROBOT,
            timestamp: formatTimeFrontend(dayjs().toString()),
            type: MessageTypeEnum.TEXT,
          }
          const newMessages: MessageType[] = [newMessage]
          setListMessages([...messagesWithUserRequest, ...newMessages])
          setChatLog(res.chatLog)
          if (res.data) setData(res.data)
          if (res.response.query) setQuery(res.response.query)
          if (res.response.representation)
            setRepresentation(res.response.representation)
        }
      })
      .finally(() => {
        setIsProcessing(false)
      })
  }

  const startRecording = () => {
    SpeechRecognition.startListening({
      language: systemLanguage === LanguageValues.IT ? 'it-IT' : 'en-US',
      continuous: false,
    })
    setIsRecording(true)
  }

  const stopRecording = () => {
    setIsRecording(false)
    if (transcript.trim()) {
      setMessage(transcript)
      onMessageSend(transcript)
    }
    SpeechRecognition.abortListening()
  }

  useEffect(() => {
    if (isRecording && !listening) {
      stopRecording()
    }
  }, [listening])

  React.useEffect(() => {
    scrollToBottom()
  }, [listMessages])

  React.useEffect(() => {
    dispatch(openDrawer(false))
  }, [])

  return (
    <div
      style={{
        position: 'relative',
        width: '50%',
        marginRight: '1rem',
      }}
    >
      <div style={{ overflow: 'auto', height: '90%' }} id="chatContainer">
        {listMessages.map((msg) => (
          <MessageBox
            position={msg.user === UserChatEnum.ROBOT ? 'left' : 'right'}
            title={
              // eslint-disable-next-line no-nested-ternary
              msg.user === UserChatEnum.ROBOT
                ? systemLanguage === LanguageValues.IT
                  ? 'Assistente'
                  : 'Assistant'
                : systemLanguage === LanguageValues.IT
                  ? 'Utente'
                  : 'User'
            }
            type={msg.type}
            text={msg.text}
            {...(msg.uri && msg.type === MessageTypeEnum.PHOTO
              ? {
                  data: {
                    uri: msg.uri,
                    alt: msg.text,
                    width: 200,
                    height: 200,
                    status: {
                      download: true,
                    },
                  },
                }
              : {})}
            date={new Date()}
            dateString={msg.timestamp || ''}
            id={msg.id}
            key={msg.id}
            focus={false}
            titleColor={
              msg.user === UserChatEnum.ROBOT
                ? theme.palette.success.main
                : theme.palette.primary.main
            }
            forwarded={false}
            replyButton={false}
            removeButton={false}
            notch
            retracted={false}
            status="sent"
            avatar={
              msg.user === UserChatEnum.ROBOT
                ? '/pages/robot.png'
                : '/pages/user.png'
            }
            styles={
              msg.user === UserChatEnum.ROBOT
                ? {
                    backgroundColor: (theme.palette.success as any).lighter,
                  }
                : {
                    backgroundColor: (theme.palette.primary as any).lighter,
                  }
            }
            notchStyle={
              msg.user === UserChatEnum.ROBOT
                ? {
                    fill: (theme.palette.success as any).lighter,
                  }
                : {
                    fill: (theme.palette.primary as any).lighter,
                  }
            }
          />
        ))}
        {isProcessing && <TypingSystemMessage />}
      </div>
      <OutlinedInput
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder={
          // eslint-disable-next-line no-nested-ternary
          isRecording
            ? systemLanguage === LanguageValues.IT
              ? 'Sto ascoltando...'
              : "I'm listening..."
            : systemLanguage === LanguageValues.IT
              ? 'Scrivi un messaggio...'
              : 'Write a message...'
        }
        disabled={isRecording}
        autoFocus
        fullWidth
        style={{
          position: 'absolute',
          bottom: 0,
          marginTop: '1rem',
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && !isProcessing) onMessageSend(message)
        }}
        endAdornment={
          <>
            {message && (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => onMessageSend(message)}
                  edge="end"
                  disabled={isProcessing}
                >
                  <SendOutlined />
                </IconButton>
              </InputAdornment>
            )}
            {!message && !isRecording && (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => startRecording()}
                  edge="end"
                  disabled={
                    isProcessing ||
                    !browserSupportsSpeechRecognition ||
                    !isMicrophoneAvailable
                  }
                >
                  <AudioOutlined />
                </IconButton>
              </InputAdornment>
            )}
            {!message && isRecording && (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => stopRecording()}
                  edge="end"
                  disabled={
                    isProcessing ||
                    !browserSupportsSpeechRecognition ||
                    !isMicrophoneAvailable
                  }
                >
                  <BorderOutlined />
                </IconButton>
              </InputAdornment>
            )}
          </>
        }
      />
    </div>
  )
}
