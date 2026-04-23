declare namespace JSX {
  interface IntrinsicElements {
    "new-marquee": React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLElement>,
      HTMLElement
    > & {
      speed?: string;
      direction?: string;
      pauseonhover?: string;
    };
  }
}
