import { useState } from 'react'
import Navbar from '../AdminComponent/Navbar'

const SUBJECT_LABELS: Record<string, string> = {
  product: 'Product inquiry',
  order: 'Order & delivery',
  wellness: 'Wellness consultation',
  feedback: 'Feedback',
  other: 'Other'
}

type MessageItem = {
  id: number
  name: string
  email: string
  subject: string
  message: string
  date: string
  read: boolean
}

type ReplyItem = {
  id: number
  text: string
  date: string
  from: 'admin'
}

const SAMPLE_MESSAGES: MessageItem[] = [
  { id: 1, name: 'Sita Sharma', email: 'sita@example.com', subject: 'order', message: 'When will my order #ORD-1842 be delivered? I need it by next week for a gift.', date: '2025-03-10T09:30:00', read: false },
  { id: 2, name: 'Ram Kumar', email: 'ram.k@example.com', subject: 'product', message: 'Do you have Chyawanprash in larger jars? I would like to buy in bulk for my family.', date: '2025-03-09T14:20:00', read: true },
  { id: 3, name: 'Anita Gurung', email: 'anita.g@example.com', subject: 'wellness', message: 'I would like to book a short wellness consultation. What timings do you have available?', date: '2025-03-09T11:15:00', read: false },
  { id: 4, name: 'Bikash Thapa', email: 'bikash.t@example.com', subject: 'feedback', message: 'Great experience with Dant Kanti toothpaste. My whole family uses it now. Thank you!', date: '2025-03-08T16:45:00', read: true },
  { id: 5, name: 'Priya Adhikari', email: 'priya.a@example.com', subject: 'other', message: 'Do you offer wholesale prices for shops? I run a small store in Pokhara.', date: '2025-03-08T10:00:00', read: false }
]

const Message = () => {
  const [messages, setMessages] = useState<MessageItem[]>(SAMPLE_MESSAGES)
  const [selectedId, setSelectedId] = useState<number | null>(null)
  const [filter, setFilter] = useState<'all' | 'unread'>('all')
  const [repliesByMessageId, setRepliesByMessageId] = useState<Record<number, ReplyItem[]>>({})
  const [replyText, setReplyText] = useState('')
  const [nextReplyId, setNextReplyId] = useState(1)

  const selected = messages.find((m) => m.id === selectedId)
  const filtered = filter === 'unread' ? messages.filter((m) => !m.read) : messages
  const unreadCount = messages.filter((m) => !m.read).length

  const openMessage = (id: number) => {
    setSelectedId(id)
    setMessages((prev) =>
      prev.map((m) => (m.id === id ? { ...m, read: true } : m))
    )
  }

  const markUnread = (id: number) => {
    setMessages((prev) =>
      prev.map((m) => (m.id === id ? { ...m, read: false } : m))
    )
  }

  const deleteMessage = (id: number) => {
    setMessages((prev) => prev.filter((m) => m.id !== id))
    setRepliesByMessageId((prev) => {
      const next = { ...prev }
      delete next[id]
      return next
    })
    if (selectedId === id) {
      setSelectedId(filtered[0]?.id ?? null)
      setReplyText('')
    }
  }

  const sendReply = () => {
    if (!selectedId || !replyText.trim()) return
    const reply: ReplyItem = {
      id: nextReplyId,
      text: replyText.trim(),
      date: new Date().toISOString(),
      from: 'admin'
    }
    setRepliesByMessageId((prev) => ({
      ...prev,
      [selectedId]: [...(prev[selectedId] || []), reply]
    }))
    setNextReplyId((n) => n + 1)
    setReplyText('')
  }

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr)
    const today = new Date()
    const isToday = d.toDateString() === today.toDateString()
    if (isToday) return d.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })
    return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
  }

  const formatDateTime = (dateStr: string) => {
    const d = new Date(dateStr)
    return d.toLocaleString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main className="ml-64 min-h-screen p-6 flex flex-col">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 shrink-0">
          <h1 className="text-2xl font-bold text-gray-800">Messages</h1>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${filter === 'all' ? 'bg-green-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'}`}
            >
              All
            </button>
            <button
              onClick={() => setFilter('unread')}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 ${filter === 'unread' ? 'bg-green-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'}`}
            >
              Unread
              {unreadCount > 0 && (
                <span className="bg-white/20 px-1.5 rounded text-xs">{unreadCount}</span>
              )}
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex flex-col lg:flex-row flex-1 min-h-0">
          {/* Message list */}
          <div className="lg:w-80 xl:w-96 border-b lg:border-b-0 lg:border-r border-gray-200 flex flex-col min-h-[280px] lg:min-h-0">
            <div className="p-3 border-b border-gray-100 bg-gray-50/50">
              <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">
                Inbox {filter === 'unread' && `(${filtered.length})`}
              </p>
            </div>
            <ul className="flex-1 overflow-y-auto">
              {filtered.length === 0 ? (
                <li className="p-6 text-center text-gray-500 text-sm">No messages</li>
              ) : (
                filtered.map((m) => (
                  <li key={m.id}>
                    <button
                      onClick={() => openMessage(m.id)}
                      className={`w-full text-left px-4 py-3 border-b border-gray-100 hover:bg-gray-50 transition-colors ${selectedId === m.id ? 'bg-green-50 border-l-4 border-l-green-500' : ''} ${!m.read ? 'font-semibold' : ''}`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <span className="text-gray-800 truncate">{m.name}</span>
                        <span className="text-xs text-gray-400 shrink-0">{formatDate(m.date)}</span>
                      </div>
                      <div className="flex items-center gap-2 mt-0.5">
                        {!m.read && (
                          <span className="w-2 h-2 rounded-full bg-green-500 shrink-0" />
                        )}
                        <span className="text-sm text-gray-600 truncate">
                          {SUBJECT_LABELS[m.subject] || m.subject}
                        </span>
                      </div>
                    </button>
                  </li>
                ))
              )}
            </ul>
          </div>

          {/* Message detail */}
          <div className="flex-1 flex flex-col min-h-[280px] lg:min-h-0">
            {selected ? (
              <>
                <div className="flex-1 min-h-0 p-6 overflow-y-auto flex flex-col">
                  <div className="flex flex-wrap items-start justify-between gap-2 mb-4 shrink-0">
                    <div>
                      <h2 className="text-lg font-semibold text-gray-800">{selected.name}</h2>
                      <p className="text-sm text-gray-500">{selected.email}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-1 bg-gray-100 text-gray-700 text-sm rounded">
                        {SUBJECT_LABELS[selected.subject] || selected.subject}
                      </span>
                      <span className="text-sm text-gray-400">{formatDate(selected.date)}</span>
                    </div>
                  </div>

                  {/* Conversation thread */}
                  <div className="space-y-4 flex-1 min-h-0">
                    {/* Customer message */}
                    <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="text-sm font-medium text-gray-700">{selected.name}</span>
                        <span className="text-xs text-gray-400">{formatDateTime(selected.date)}</span>
                      </div>
                      <p className="text-gray-700 whitespace-pre-wrap leading-relaxed text-sm">
                        {selected.message}
                      </p>
                    </div>

                    {/* Admin replies */}
                    {(repliesByMessageId[selected.id] || []).map((reply) => (
                      <div key={reply.id} className="bg-green-50 rounded-lg p-4 border border-green-100 ml-6">
                        <div className="flex items-center justify-between gap-2 mb-2">
                          <span className="text-sm font-medium text-green-800">You (Admin)</span>
                          <span className="text-xs text-gray-500">{formatDateTime(reply.date)}</span>
                        </div>
                        <p className="text-gray-700 whitespace-pre-wrap leading-relaxed text-sm">
                          {reply.text}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Reply box + actions */}
                <div className="border-t border-gray-200 bg-gray-50/50 shrink-0">
                  <div className="p-4">
                    <textarea
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      placeholder="Type your reply..."
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 resize-none text-gray-800 placeholder-gray-400"
                    />
                    <div className="flex flex-wrap items-center justify-between gap-2 mt-2">
                      <div className="flex flex-wrap gap-2">
                        <button
                          onClick={sendReply}
                          disabled={!replyText.trim()}
                          className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0V5" />
                          </svg>
                          Send reply
                        </button>
                        <button
                          onClick={() => markUnread(selected.id)}
                          className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-green-600 text-green-600 rounded-lg text-sm font-medium hover:bg-green-50 transition-colors"
                        >
                          Mark unread
                        </button>
                        <button
                          onClick={() => deleteMessage(selected.id)}
                          className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white border border-green-600 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center text-gray-400 p-8">
                <div className="text-center">
                  <svg className="w-12 h-12 mx-auto mb-3 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  <p className="text-sm">Select a message to read</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}

export default Message
