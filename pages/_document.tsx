import Document, { Html, Head, Main, NextScript, DocumentContext } from 'next/document'
import { ServerStyleSheet } from 'styled-components'

export default class MyDocument extends Document {
  render () {
    return (
      <Html>
        <Head />
        <body>
          <div style={bodyStyle}>
            <Main />
            <NextScript />
          </div>
        </body>
      </Html>
    )
  }
  
  static async getInitialProps (ctx: DocumentContext) {
    const sheet = new ServerStyleSheet()
    const originalRenderPage = ctx.renderPage
    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App: Function) => (props: any) => sheet.collectStyles(<App {...props} />)
        })
      const initialProps = await Document.getInitialProps(ctx)
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        )
      }
    } finally {
      sheet.seal()
    }
  }
}

const bodyStyle = {
  'background-color': '#000',
  'color': '#fff',
  'padding': '50px',
  'font-family': 'Arial'
}