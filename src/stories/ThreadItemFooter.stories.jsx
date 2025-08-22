import React from 'react';
import ThreadItemFooter from '../components/ThreadItemFooter';

// Data palsu (mock) untuk prop `thread`
const baseMockThread = {
  id: 'thread-1',
  totalComments: 21,
  createdAt: '2025-08-22T10:00:00.000Z',
  upVotesBy: ['user-a', 'user-b', 'user-c'],
  downVotesBy: ['user-d'],
  owner: {
    id: 'user-julhan',
    name: 'Julhan Abdul Malik',
    avatar: 'https://i.pravatar.cc/50?u=dsa',
  },
};

const stories = {
  title: 'Components/ThreadItemFooter',
  component: ThreadItemFooter,

  argTypes: {
    handleVote: { action: 'handleVote' },
  },
};

export default stories;

const Template = (args) => <ThreadItemFooter {...args} />;

// Tampilan Default (Pengguna Belum Vote)
export const Default = Template.bind({});
Default.args = {
  thread: {
    ...baseMockThread,
    hasVotedUp: false,
    hasVotedDown: false,
  },
};

// Saat Pengguna Sudah Upvote
export const Upvoted = Template.bind({});
Upvoted.args = {
  thread: {
    ...baseMockThread,
    hasVotedUp: true,
    hasVotedDown: false,
  },
};

// Saat Pengguna Sudah Downvote
export const Downvoted = Template.bind({});
Downvoted.args = {
  thread: {
    ...baseMockThread,
    hasVotedUp: false,
    hasVotedDown: true,
  },
};
