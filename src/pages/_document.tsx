import React from 'react'
import Document, {
    Html,
    Head,
    Main,
    NextScript
} from 'next/document'
export default class MyDocument extends Document {
    render(): JSX.Element {
        return (
            <Html lang="pt-br">
                <Head>
                    <link href="https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@400;500;700&display=swap" rel="stylesheet" />
                </Head>
                <body>
                    <div id="root"></div>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }
}