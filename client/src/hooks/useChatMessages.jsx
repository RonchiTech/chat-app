import { useState, useEffect } from 'react';
import { useQuery, useMutation, useSubscription } from '@apollo/client';
import {
  messagesQuery,
  addMessageMutation,
  onMessageAddedSubscription,
} from '../graphql/queries';

const useChatMessages = () => {
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

  return {
    messages,
    addMessage: (text) => addMessage({ variables: { input: { text } } }),
  };
};

export default useChatMessages;
