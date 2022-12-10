import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { User } from './user';

describe('User component', () => {
  it('renders the accordion title and repositories', () => {
    const repos = [
      {
        owner: { login: 'user1' },
        name: 'repo1',
        description: 'Repo 1 description',
        stargazers_count: 10,
        html_url: 'https://github.com/user1/repo1'
      },
      {
        owner: { login: 'user2' },
        name: 'repo2',
        description: 'Repo 2 description',
        stargazers_count: 5,
        html_url: 'https://github.com/user2/repo2'
      }
    ];
    const { getByText } = render(<User title="My Repos" repos={repos} />);

    expect(getByText('My Repos')).toBeInTheDocument();
    expect(getByText('user1/')).toBeInTheDocument();
    expect(getByText('Repo 1 description')).toBeInTheDocument();
    expect(getByText('10')).toBeInTheDocument();
    expect(getByText('user2/')).toBeInTheDocument();
    expect(getByText('Repo 2 description')).toBeInTheDocument();
    expect(getByText('5')).toBeInTheDocument();
  });

  it('collapses and expands the accordion when the title is clicked', () => {
    const repos = [
      {
        owner: { login: 'user1' },
        name: 'repo1',
        description: 'Repo 1 description',
        stargazers_count: 10,
        html_url: 'https://github.com/user1/repo1'
      },
      {
        owner: { login: 'user2' },
        name: 'repo2',
        description: 'Repo 2 description',
        stargazers_count: 5,
        html_url: 'https://github.com/user2/repo2'
      }
    ];
    const { getByText } = render(<User title="My Repos" repos={repos} />);

    expect(getByText('user1/')).toBeInTheDocument();
    expect(getByText('user2/')).toBeInTheDocument();

    fireEvent.click(getByText('My Repos'));

    expect(getByText('Repo 1 description')).toBeInTheDocument();
    expect(getByText('Repo 2 description')).toBeInTheDocument();
  });
});