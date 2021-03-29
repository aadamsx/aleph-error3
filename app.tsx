import React, { ComponentType } from 'react'
import People from './components/People.tsx';

export default function App({ Page, pageProps }: { Page: ComponentType<any>, pageProps: any }) {
  return (
    <main>
      <head>
        <meta name="viewport" content="width=device-width" />
      </head>
      <People />
      <Page {...pageProps} />
    </main>
  )
}
