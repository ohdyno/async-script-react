// Overwrites the default 'App' component: https://nextjs.org/docs/advanced-features/custom-app
import '@/styles/globals.css'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
