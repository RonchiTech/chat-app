import { gql } from 'apollo-boost';
import client from './client';

const messagesQuery = gql`
  query MessagesQuery {
    messages {
      id
      from
      text
    }
  }
`;

const addMessageMutation = gql`
  mutation AddMessageMutation($input: MessageInput!) {
    message: addMessage(input: $input) {
      id
      from
      text
    }
  }
`;

const onMessageAddedSubscription = gql`
  subscription OnMessageAdded {
    onMessageAdded {
      id
      from
      text
    }
  }
`;

export async function onMessageAdded(handleMessage) {
  const observable = await client.subscribe({
    query: onMessageAddedSubscription,
  });
  return observable.subscribe((result) => {
    console.log('result', result);
    handleMessage(result.data.onMessageAdded);
  });
}

export async function addMessage(text) {
  const { data } = await client.mutate({
    mutation: addMessageMutation,
    variables: { input: { text } },
  });
  return data.message;
}

export async function getMessages() {
  const { data } = await client.query({ query: messagesQuery });
  return data.messages;
}
