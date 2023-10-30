import { Highlight, themes } from "prism-react-renderer";

interface EditorProps {
    children?: any,
    lenguaje?: any,
    solution?: any

}

export const Editor = ({ children, lenguaje, solution }: EditorProps) => {
    const exampleCode = `<Highlight
    theme={themes.nightOwl}
    code={exampleCode}
    language="jsx">
    {({ style, tokens, getLineProps, getTokenProps }) => (
        <pre style={style}>
            {tokens.map((line, i) => (
                <div key={i} {...getLineProps({ line })}>
                    <span>{i + 1}</span>
                    {line.map((token, key) => (
                        <span key={key} {...getTokenProps({ token })} />
                    ))}
                </div>
            ))}
        </pre>
    )}
</Highlight>
        `

    return (
        <Highlight
            theme={themes.oneDark}
            code={exampleCode}
            language="jsx">
            {({ style, tokens, getLineProps, getTokenProps }) => (
                <pre style={{
                    boxSizing: 'border-box',
                    fontFamily: 'monospace',
                    textAlign: 'left',
                    width: '100%',
                    backgroundColor: '#333',
                    color: 'white'
                }}>
                    {tokens.map((line, i) => (
                        <div key={i} {...getLineProps({ line })}>
                            <span>{i + 1}</span>
                            {line.map((token, key) => (
                                <span key={key} {...getTokenProps({ token })} />
                            ))}
                        </div>
                    ))}
                </pre>
            )}
        </Highlight>
    )
}
