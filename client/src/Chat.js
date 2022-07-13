import React, { useEffect, useState } from 'react';
import { addMessage, getMessages, onMessageAdded } from './graphql/queries';
import MessageInput from './MessageInput';
import MessageList from './MessageList';

const Chat = ({ user }) => {
  const [messages, setMessages] = useState([]);
  // const { messages } = this.state;
  console.log(messages);
  const handleSend = async (text) => {
    const message = { id: text, from: 'you', text };
    // const result = messages.push(message);
    // console.log('result', result);
    setMessages(messages.concat(message));
    // setMessages((prevValue) => {
    //   return [...prevValue, message];
    // });
    // await addMessage(text);
  };

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
