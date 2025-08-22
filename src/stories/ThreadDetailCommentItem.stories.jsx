import React from 'react';
import ThreadDetailCommentItem from '../components/ThreadDetailCommentItem';

// Data palsu (mock) untuk prop `comment`
const mockComment = {
  id: 'comment-1',
  content: 'Ini adalah <b>komentar pertama</b> sebagai contoh di Storybook.',
  createdAt: '2025-08-22T14:00:00.000Z',
  owner: {
    id: 'user-julhan',
    name: 'Julhan Abdul Malik',
    avatar: 'https://i.pravatar.cc/50?u=dsa',
  },
  upVotesBy: ['user-abc', 'user-def'],
  downVotesBy: ['user-xyz'],
};

const stories = {
  title: 'Components/ThreadDetailCommentItem',
  component: ThreadDetailCommentItem,

  argTypes: {
    handleVote: { action: 'handleVote' },
  },
};

export default stories;

const Template = (args) => <ThreadDetailCommentItem {...args} />;

// Tampilan Default (Pengguna Belum Vote)
export const Default = Template.bind({});
Default.args = {
  comment: mockComment,
  hasVotedUpComment: false,
  hasVotedDownComment: false,
};

// Saat Pengguna Sudah Upvote
export const Upvoted = Template.bind({});
Upvoted.args = {
  ...Default.args,
  hasVotedUpComment: true,
};

//  Saat Pengguna Sudah Downvote
export const Downvoted = Template.bind({});
Downvoted.args = {
  ...Default.args,
  hasVotedDownComment: true,
};
