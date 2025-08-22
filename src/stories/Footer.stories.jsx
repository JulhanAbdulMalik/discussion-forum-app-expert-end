import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import Footer from '../components/Footer';

const stories = {
  title: 'Components/Footer',
  component: Footer,

  decorators: [
    (Story) => (
      <MemoryRouter>
        <div style={{ position: 'relative', height: '100px' }}>
          <Story />
        </div>
      </MemoryRouter>
    ),
  ],

  parameters: {
    layout: 'fullscreen',
  },

  argTypes: {
    logout: { action: 'logout' },
  },
};

export default stories;

const Template = (args) => <Footer {...args} />;

// Kondisi Pengguna Sudah Login
export const LoggedIn = Template.bind({});
LoggedIn.args = {
  authUser: {
    id: 'user-julhan',
    name: 'Julhan Abdul Malik',
    avatar: 'https://i.pravatar.cc/50',
  },
};

// Kondisi Pengguna Belum Login
export const LoggedOut = Template.bind({});
LoggedOut.args = {
  authUser: null,
};
