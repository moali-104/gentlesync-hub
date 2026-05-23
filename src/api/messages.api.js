import { messageThreads as seedThreads } from '../features/dashboard/portalArabicData'

const wait = (value, delay = 200) =>
  new Promise((resolve) => {
    setTimeout(() => resolve(value), delay)
  })

let messageThreads = structuredClone(seedThreads)

export function getConversations(role) {
  const conversations = role
    ? messageThreads.filter((thread) => thread.participants.includes(role))
    : messageThreads

  return wait(structuredClone(conversations))
}

export function getMessages(userId) {
  const thread = messageThreads.find((item) => item.userId === userId || item.id === userId)
  return wait(structuredClone(thread?.messages || []))
}

export function sendMessage(userId, payload) {
  const thread = messageThreads.find((item) => item.userId === userId || item.id === userId)
  const message = {
    id: `sent-${Date.now()}`,
    sender: payload.sender || 'parent',
    text: payload.text,
    time: payload.time || 'Now',
  }

  if (thread) {
    thread.messages = [...thread.messages, message]
    thread.lastMessage = payload.text
    thread.time = message.time
    thread.typing = false
  }

  return wait(structuredClone(message))
}
