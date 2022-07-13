import React, { useEffect, useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { messagesQuery, addMessageMutation } from './graphql/queries';
// import { addMessage, getMessages, onMessageAdded } from './graphql/queries';
import MessageInput from './MessageInput';
import MessageList from './MessageList';

const Chat = ({ user }) => {
  const { error, loading, data } = useQuery(messagesQuery);
  const [addMessage] = useMutation(addMessageMutation);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (data?.messages) {
      setMessages((prevValue) => prevValue.concat(data.messages));
    }
  }, [data]);

  const handleSend = async (text) => {
    const newMessage = await addMessage({ variables: { input: { text } } });
    setMessages((prevValue) => prevValue.concat(newMessage.data.message));
  };

  if (loading) return <p>Loading ...</p>;
  if (error) throw new Error(error);

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
