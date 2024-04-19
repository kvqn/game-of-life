import type { MDXComponents } from "mdx/types"

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ children }) => <h1 className="text-xl font-semibold">{children}</h1>,
    p: ({ children }) => (
      <p className="text-justify text-gray-700">{children}</p>
    ),
    ol: ({ children }) => (
      <ol className="ml-4 text-gray-700 [&>li]:list-decimal">{children}</ol>
    ),
    a: ({ children, href }) => (
      <a
        href={href}
        className="rounded-md border border-gray-300 bg-gray-100 px-4 py-2 transition-colors hover:bg-gray-300"
      >
        {children}
      </a>
    ),
    ...components,
  }
}
