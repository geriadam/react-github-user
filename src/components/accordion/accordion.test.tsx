import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { Accordion } from './accordion'

describe('Accordion component', () => {
  it('should render the correct title', () => {
    const title = 'Accordion Title'
    const { getByText } = render(
      <Accordion title={title}>
        <p>Accordion content</p>
      </Accordion>
    )
    expect(getByText(title)).toBeInTheDocument()
  })

  it('should render the correct content when the accordion is expanded', () => {
    const content = 'Accordion Content'
    const { getByText } = render(
      <Accordion title="Accordion Title">
        <p>{content}</p>
      </Accordion>
    )
    const accordionButton = getByText('Accordion Title')
    fireEvent.click(accordionButton)
    expect(getByText(content)).toBeInTheDocument()
  })

  it('expands the content when the title is clicked', () => {
    const { getByText } = render(
      <Accordion title="Test Title">
      <p>Test content</p>
      </Accordion>
    )
    const accordionButton = getByText('Test Title')
    fireEvent.click(getByText('Test Title'))
    expect(getByText('Test content')).toBeVisible()
  })
})