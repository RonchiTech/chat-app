import React, { useEffect, useState } from 'react';
import { useQuery, useMutation, useSubscription } from '@apollo/client';
import {
  messagesQuery,
  addMessageMutation,
  onMessageAddedSubscription,
} from './graphql/queries';
import MessageInput from './MessageInput';
import MessageList from './MessageList';

const Chat = ({ user }) => {
  const [messages, setMessages] = useState([]);

  const { data } = useQuery(messagesQuery, {
    // onCompleted: (result) => {
    //   setMessages(result.messages);
    // },
  });

  useSubscription(onMessageAddedSubscription, {
    onSubscriptionData: (result) => {
      result.client.cache.writeQuery({
        query: messagesQuery,
        data: {
          messages: messages.concat(
            result.subscriptionData.data.onMessageAdded
          ),
        },
      });
      // setMessages(messages.concat(result.subscriptionData.data.onMessageAdded));
    },
  });

  const [addMessage] = useMutation(addMessageMutation);

  useEffect(() => {
    if (data) {
      setMessages(data.messages);
    }
  }, [data]);

  const handleSend = async (text) => {
    await addMessage({ variables: { input: { text } } });
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
