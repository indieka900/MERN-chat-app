import useGetMessages from '../../hooks/useGetMessages'
import MessageSkeleton from '../skeleton/MessageSkelleton';
import Message from './Message'

function Messages() {
  const {loading, messages} = useGetMessages();
  return (
    <div className='px-4 flex-1 overflow-auto'>
      {!loading && messages.length > 0 && messages.map((message) => (
        <Message key={message._id} message={message} />
      ))}
      {loading && [...Array(4)].map((_, idx) => <MessageSkeleton key={idx} />)}
      {!loading && messages.length ===0 && (
        <p className='text-center'>Send a message to a start a conversation</p>
      )}
    </div>
  )
}

export default Messages