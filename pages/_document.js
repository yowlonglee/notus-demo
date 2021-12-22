import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html lang='en'>
        <Head>
          <meta charSet='utf-8'/>
          <meta name='theme-color' content='#0000000' />
        </Head>
        <body className='text-blueGray-700 antialiased'>
          <div id='page-transition'></div>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument