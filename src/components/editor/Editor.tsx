import { Highlight, themes } from "prism-react-renderer";

//     const codeBlock = `
// const GroceryItem: React.FC<GroceryItemProps> = ({ item }) => {
//   return (
//     <div>
//       <h2>{item.name}</h2>
//       <p>Price: {item.price}</p>
//       <p>Quantity: {item.quantity}</p>
//     </div>
//   );
// }
// `

interface EditorProps {
    children: any

}

export const Editor = ({ children }: EditorProps) => {

    return (
        <Highlight
            theme={themes.shadesOfPurple}
            code={children}
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
    )
}
