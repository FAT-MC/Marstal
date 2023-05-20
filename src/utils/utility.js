import days from "dayjs";
import showdown from "showdown"

const getTimeInDay = (timestamp) => {
  return days
    .unix(timestamp)
    .format('h:mm:a')
}

const getDate = (timestamp) => {
  return days
    .unix(timestamp)
    .format('MMM D, YYYY')
}

const dateTimeHelper = {
  getTimeInDay,
  getDate
}

const MessageEvent = {
  MESSAGE_RECEIVED: 'messageReceived',
  RESPONSE_GENERATED: 'responseGenerated',
  AUDIO_RESPONSE_GENERATED: 'audioResponseGenerated'
}

const markdownConvertToHTML = (markdownText) => {
  const converter = new showdown.Converter();
  return converter.makeHtml(markdownText)
}

export {
  dateTimeHelper,
  MessageEvent,
  markdownConvertToHTML
}