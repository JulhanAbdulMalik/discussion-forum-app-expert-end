import React from 'react';
import '../index.css'; // Import file CSS utama
import { MemoryRouter } from 'react-router-dom';
import Header from '../components/Header';

const stories = {
  title: 'Components/Header',
  component: Header,

  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
  parameters: {
    layout: 'fullscreen',
  },
};

export default stories;

const Template = (args) => <Header {...args} />;

// Kondisi Pengguna Sudah Login
export const LoggedIn = Template.bind({});
LoggedIn.args = {
  authUser: {
    id: 'user-julhan',
    name: 'Julhan',
    avatar: 'https://i.pravatar.cc/50',
  },
};

// Kondisi Pengguna Belum Login
export const LoggedOut = Template.bind({});
LoggedOut.args = {
  authUser: null,
};
