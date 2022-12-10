import React from 'react'
import { Repository } from './repository'
import { render, screen } from '@testing-library/react'

describe('Repository component', () => {
  it('renders correctly with default values', () => {
    render(<Repository />)

    expect(screen.getByText('/')).toBeInTheDocument()
    expect(screen.getByText('0')).toBeInTheDocument()
    expect(screen.queryByText('Description')).not.toBeInTheDocument()
  })

  it('renders correctly with custom values', () => {
    const owner = 'user'
    const name = 'repository'
    const description = 'Description of the repository'
    const starCount = 5
    const htmlUrl = 'https://github.com/user/repository'

    render(
      <Repository
        owner={owner}
        name={name}
        description={description}
        starCount={starCount}
        htmlUrl={htmlUrl}
      />
    )

    expect(screen.getByText(`${owner}/`)).toBeInTheDocument()
    expect(screen.getByText(description)).toBeInTheDocument()
    expect(screen.getByText(starCount.toString())).toBeInTheDocument()

    const anchor = screen.getByRole('link')
    expect(anchor.getAttribute('href')).toBe(htmlUrl)
  })
})