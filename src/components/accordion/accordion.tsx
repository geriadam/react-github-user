import React, { useRef, useState } from 'react'

interface AccordionProps {
  title: React.ReactNode
  children: React.ReactChild | null
}

export const Accordion: React.FC<AccordionProps> = ({ title, children }) => {
  const [active, setActive] = useState(false)
  const [height, setHeight] = useState('0px')
  const [rotate, setRotate] = useState('transform duration-700 ease')

  const contentSpace = useRef(null)

  function toggleAccordion() {
    setActive((prevState) => !prevState)
    // @ts-ignore
    setHeight(active ? '0px' : `${contentSpace.current.scrollHeight}px`)
    setRotate(active ? 'transform duration-700 ease' : 'transform duration-700 ease rotate-180')
  }

  return (
    <div className="flex flex-col mb-3 cursor-pointer">
      <button
        className="px-8 py-6 bg-white border border-gray-200 box-border appearance-none cursor-pointer focus:outline-none flex items-center justify-between hover:bg-gray-100"
        onClick={toggleAccordion}
      >
        <p className="inline-block text-footnote light">{title}</p>
        <svg data-accordion-icon className={`w-6 h-6 shrink-0 ${rotate} inline-block`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
      </button>
      <div
        ref={contentSpace}
        style={{ maxHeight: `${height}` }}
        className="overflow-auto transition-max-height duration-700 ease-in-out"
      >
        <div className="p-6 border bg-white border-gray-200 border-t-0">{children}</div>
      </div>
    </div>
  )
}