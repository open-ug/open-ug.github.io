import type { MDXComponents } from "mdx/types";

export function useMDXComponents(): MDXComponents {
  return {
    // HEADINGS
    h1: (props) => (
      <h1
        className="text-3xl md:text-4xl font-bold text-[#001327] mt-10 mb-4 pb-2 border-b-2 border-[#0abcff] tracking-tight"
        {...props}
      />
    ),
    h2: (props) => (
      <h2
        className="text-2xl font-semibold text-[#001327] mt-8 mb-4 border-b border-slate-200 pb-2"
        {...props}
      />
    ),
    h3: (props) => (
      <h3
        className="text-xl font-medium italic text-[#1e293b] mt-6 mb-3"
        {...props}
      />
    ),

    // BODY TEXT
    p: (props) => (
      <p className="text-base text-[#1e293b] leading-relaxed mb-4" {...props} />
    ),
    a: (props) => (
      <a
        {...props}
        className="text-[#0abcff] hover:text-[#001327] font-medium underline decoration-[#0abcff]/30 hover:decoration-[#001327] transition-colors"
      />
    ),
    strong: (props) => (
      <strong className="font-semibold text-[#001327]" {...props} />
    ),

    // LISTS
    ul: (props) => (
      <ul
        className="list-disc pl-6 text-[#1e293b] mb-6 space-y-2 marker:text-[#0abcff]"
        {...props}
      />
    ),
    ol: (props) => (
      <ol
        className="list-decimal pl-6 text-[#1e293b] mb-6 space-y-2 marker:font-medium marker:text-[#001327]"
        {...props}
      />
    ),
    li: (props) => <li className="leading-relaxed" {...props} />,

    // CALLOUTS / BLOCKQUOTES (Emulating the engineering callout)
    blockquote: (props) => (
      <blockquote
        className="border-l-4 border-[#0abcff] bg-[#f8fafc] py-3 px-5 text-[#1e293b] my-6 rounded-r-md"
        {...props}
      />
    ),

    // CODE BLOCKS & INLINE CODE
    code: (props) => (
      <code
        className="font-mono text-[0.875rem] text-[#001327] bg-[#f8fafc] px-1.5 py-0.5 rounded border border-slate-200"
        {...props}
      />
    ),
    pre: (props) => (
      <pre
        className="font-mono text-[0.875rem] bg-[#f8fafc] text-[#001327] p-4 rounded-lg border border-slate-200 overflow-x-auto my-6 shadow-sm"
        {...props}
      />
    ),

    // DIVIDERS
    hr: (props) => (
      <hr className="my-10 border-t border-[#0abcff]/30" {...props} />
    ),
  };
}
