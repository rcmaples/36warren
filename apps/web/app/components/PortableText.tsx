import type {PortableTextComponents} from '@portabletext/react'
import {PortableText as ReactPortableText} from '@portabletext/react'
import type {PortableTextBlock} from '@portabletext/types'

// Use the official PortableText types instead of our custom interface
interface PortableTextProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value: PortableTextBlock[] | any[] // Allow any[] for flexibility with Sanity data
  className?: string
}

// Custom components for portable text rendering
// Styled to match the modal description styling
const components: PortableTextComponents = {
  block: {
    normal: ({children}) => (
      <p className="mb-4 text-[1.1rem] leading-[1.8] text-[#374151]">{children}</p>
    ),
    h1: ({children}) => <h1 className="text-3xl font-bold mb-6 mt-8 text-[#1f2937]">{children}</h1>,
    h2: ({children}) => (
      <h2 className="text-2xl font-semibold mb-4 mt-6 text-[#1f2937]">{children}</h2>
    ),
    h3: ({children}) => (
      <h3 className="text-xl font-semibold mb-3 mt-5 text-[#1f2937]">{children}</h3>
    ),
    h4: ({children}) => (
      <h4 className="text-lg font-semibold mb-2 mt-4 text-[#1f2937]">{children}</h4>
    ),
    h5: ({children}) => (
      <h5 className="text-base font-semibold mb-2 mt-3 text-[#1f2937]">{children}</h5>
    ),
    h6: ({children}) => (
      <h6 className="text-sm font-semibold mb-2 mt-3 text-[#1f2937]">{children}</h6>
    ),
    blockquote: ({children}) => (
      <blockquote className="border-l-4 border-[#dc2626] pl-4 py-2 mb-4 italic bg-[#fee2e2] rounded-r">
        {children}
      </blockquote>
    ),
  },
  marks: {
    strong: ({children}) => <strong className="font-semibold text-[#1f2937]">{children}</strong>,
    em: ({children}) => <em className="italic">{children}</em>,
    underline: ({children}) => <span className="underline">{children}</span>,
    'strike-through': ({children}) => <span className="line-through">{children}</span>,
    code: ({children}) => (
      <code className="bg-[#f1f5f9] px-2 py-1 rounded text-sm font-mono border border-[#e5e7eb]">
        {children}
      </code>
    ),
  },
  list: {
    bullet: ({children}) => (
      <ul className="list-disc list-outside mb-4 space-y-2 pl-8">{children}</ul>
    ),
    number: ({children}) => (
      <ol className="list-decimal list-outside mb-4 space-y-2 pl-8">{children}</ol>
    ),
  },
  listItem: {
    bullet: ({children}) => (
      <li className="text-[1.1rem] leading-[1.8] text-[#374151] pl-2">{children}</li>
    ),
    number: ({children}) => (
      <li className="text-[1.1rem] leading-[1.8] text-[#374151] pl-2">{children}</li>
    ),
  },
}

export default function PortableText({value, className = ''}: PortableTextProps) {
  // More robust validation
  if (!value || !Array.isArray(value) || value.length === 0) {
    return (
      <div className={`portable-text-empty ${className}`}>
        <p className="text-[1.1rem] leading-[1.8] text-[#374151] italic">No content available.</p>
      </div>
    )
  }

  try {
    return (
      <div className={`portable-text ${className}`}>
        <ReactPortableText value={value} components={components} />
      </div>
    )
  } catch (error) {
    console.error('Error rendering portable text:', error)
    // Fallback to raw content if there's an error
    return (
      <div className={`portable-text-error ${className}`}>
        <p>Error rendering content. Raw data:</p>
        <pre style={{fontSize: '12px', background: '#f0f0f0', padding: '10px'}}>
          {JSON.stringify(value, null, 2)}
        </pre>
      </div>
    )
  }
}
