import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { messagesQuery, getMessages } from './graphql/queries';
// import { addMessage, getMessages, onMessageAdded } from './graphql/queries';
import MessageInput from './MessageInput';
import MessageList from './MessageList';

const Chat = ({ user }) => {
  // const response = useQuery(messagesQuery);
  // console.log(data);
  const [messages, setMessages] = useState([]);
  // const messages = data ? data.messages : [];

  useEffect(() => {
    // console.log(response);
    // if(data) {
    //   setMessages(data.messages)
    // }
    const fetchMessages = async () => {
      const messages = await getMessages();
      setMessages(messages);
    };
    fetchMessages();
  }, []);

  const handleSend = async (text) => {
    // const result = messages.push(message);
    // console.log('result', result);
    // setMessages(messages.concat(message));
    // setMessages((prevValue) => {
    //   return [...prevValue, message];
    // });
    // await addMessage(text);
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
