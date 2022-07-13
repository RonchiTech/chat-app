import React from 'react';
import useChatMessages from './hooks/useChatMessages';
// import { useQuery, useMutation, useSubscription } from '@apollo/client';
// import {
//   messagesQuery,
//   addMessageMutation,
//   onMessageAddedSubscription,
// } from './graphql/queries';
import MessageInput from './MessageInput';
import MessageList from './MessageList';

const Chat = ({ user }) => {
  const { addMessage, messages } = useChatMessages();

  const handleSend = async (text) => {
    await addMessage(text);
  };

  // if (loading) return <p>Loading ...</p>;
  // if (error) throw new Error(error);

  return (
    <section className="section">
      <div className="container">
        <h1 className="title">Chatting as {user}</h1>
        <MessageList user={user} messages={messages} />
        <MessageInput onSend={handleSend} />
      </div>
    </section>
  );
};

export default Chat;
