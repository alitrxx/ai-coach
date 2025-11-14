import React from 'react';

export const GraduationCapIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.906 59.906 0 0112 3.493a59.906 59.906 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0l-2.072-1.036A59.922 59.922 0 0112 3.493a59.922 59.922 0 0111.743 5.618l-2.072 1.036m-15.482 0A50.697 50.697 0 0112 13.489a50.697 50.697 0 017.74-3.342M12 13.489v8.25" />
  </svg>
);


export const SendIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
  </svg>
);

export const RestartIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0011.664 0l3.181-3.183m-11.664 0l3.181-3.183a8.25 8.25 0 00-11.664 0l3.181 3.183" />
  </svg>
);

export const LightbulbIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
     <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 0 0 1.5-.189m-1.5.189a6.01 6.01 0 0 1-1.5-.189m3.75 7.478a12.06 12.06 0 0 1-4.5 0m3.75 2.311a14.994 14.994 0 0 1-3.75 0M9.75 6.75h4.5M12 12.75a2.25 2.25 0 0 0 2.25-2.25H9.75a2.25 2.25 0 0 0 2.25 2.25Z" />
  </svg>
);

export const AlertTriangleIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
    </svg>
);

// fix: Add missing BrainIcon
export const BrainIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-1.008 1.13-1.226 1.994-.75 4.594.64 6.22 2.765C18.565 7.607 18.194 10.852 15.5 12.32c-2.695 1.467-6.105-1.162-6.105-1.162s-1.171 1.62-.229 2.977c.942 1.356 2.822 1.356 3.764 0l.942-1.356s2.516.62 4.148-.02c1.633-.64 2.36-2.404 2.36-2.404s.631 2.323-.414 3.668c-1.045 1.345-3.037.64-3.037.64s-1.895 1.54-4.28 1.54c-2.385 0-4.28-1.54-4.28-1.54s-1.992.705-3.037-.64c-1.045-1.345-.414-3.668-.414-3.668s.727 1.764 2.36 2.404c1.632.64 4.148.02 4.148.02l.942 1.356c.942 1.356 2.822 1.356 3.764 0 .942-1.356-.229-2.977-.229-2.977s-3.41 2.626-6.105 1.16c-2.696-1.466-3.067-4.71-1.442-6.836C7.99 7.09 9.5 5.5 9.5 5.5s-2.738-1.56-2.738-4.25c0-2.69 2.2-2.69 2.2-2.69s-1.125.75-1.125 2.155C8.337 4.952 9.475 5.905 10.07 6.282c1.138.71 2.51.645 3.55.233.52-.207.97-.565 1.32-.998.35-.434.62-.93.78-1.474.16-.543.23-1.113.21-1.698-.02-.585-.15-1.162-.39-1.705-.24-.543-.58-1.043-1.01-1.458-.43-.415-.94-.74-1.5-.957-.56-.217-1.16-.32-1.78-.297-1.24.048-2.39.61-3.29 1.488-.9 1.1-1.12 2.653-.74 4.027.38 1.373 1.59 2.525 3.01 2.86.71.165 1.44.13 2.13-.1 1.4-.46 2.33-1.77 2.33-1.77s.208 1.56-.942 2.61c-1.15.99-2.737.495-2.737.495s-1.875 1.875-4.125 1.875c-2.25 0-4.125-1.875-4.125-1.875s-1.587.495-2.737-.495c-1.15-1.05-.942-2.61-.942-2.61s.93 1.31 2.33 1.77c.69.23 1.42.265 2.13.1.96-.225 1.83-.825 2.45-1.61.62-.785.96-1.76 1-2.79.04-.79-.1-1.59-.42-2.32-.32-.73-.83-1.37-1.48-1.86-.65-.49-1.44-.8-2.27-.88-1.66-.16-3.16.89-3.6 2.45z" />
  </svg>
);
