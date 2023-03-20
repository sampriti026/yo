import React from 'react';

interface ChatMessageProps {
  message: string;
  timestamp: string;
  sender: string;
  sentByCurrentUser: boolean;
}

const ChatMessage: React.FC<ChatMessageProps> = ({
  message,
  timestamp,
  sender,
  sentByCurrentUser,
}) => {
  const messageContainerClasses = `p-2 max-w-2/3 break-all rounded-lg ${
    sentByCurrentUser ? 'ml-auto bg-blue-500 text-white' : 'mr-auto bg-gray-200'
  }`;

  const senderLabelClasses = `${sentByCurrentUser ? 'text-right' : 'text-left'} font-bold text-sm ${
    sentByCurrentUser ? 'text-black' : 'text-gray-700'
  }`;

  return (
    <div className="flex flex-col mb-2">
      <span className={senderLabelClasses}>{sender}</span>
      <div className={messageContainerClasses}>
        <p className="mb-1">{message}</p>
        <span className="text-xs">{timestamp}</span>

      </div>
    </div>
  );
};

export default ChatMessage;
