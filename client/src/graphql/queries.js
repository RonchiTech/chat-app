import { gql } from '@apollo/client/core';
import client from './client';

export const messagesQuery = gql`
  query MessagesQuery {
    messages {
      id
      from
      text
    }
  }
`;

export const addMessageMutation = gql`
  mutation AddMessageMutation($input: MessageInput!) {
    message: addMessage(input: $input) {
      id
      from
      text
    }
  }
`;

export const onMessageAddedSubscription = gql`
  subscription OnMessageAdded {
    onMessageAdded {
      id
      from
      text
    }
  }
`;

export function onMessageAdded(handleMessage) {
  const observable = client.subscribe({
    query: onMessageAddedSubscription,
  });

  return observable.subscribe((result) => {
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
