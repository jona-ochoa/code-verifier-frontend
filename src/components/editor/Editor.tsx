import { Highlight, themes } from "prism-react-renderer";

// interface EditorProps {
//     lenguage: any,
//     children: any
//     { lenguage, children }: EditorProps
// }

export const Editor = () => {

    const codeBlock = `
const GroceryItem: React.FC<GroceryItemProps> = ({ item }) => {
  return (
    <div>
      <h2>{item.name}</h2>
      <p>Price: {item.price}</p>
      <p>Quantity: {item.quantity}</p>
    </div>
  );
}
`

    return (
        <Highlight
            theme={themes.shadesOfPurple}
            code={codeBlock}
            language="tsx">
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
    )
}
