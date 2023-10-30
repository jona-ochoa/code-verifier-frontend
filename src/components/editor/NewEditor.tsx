import { Fragment, useState } from 'react';
import Editor from 'react-simple-code-editor';
import { Highlight, themes } from 'prism-react-renderer';

const exampleCode = ` // TODO Edit this Code Snippets
console.log(a + b)
// ! return result = 12
`;

const styles = {
    editorContainer: {
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: "#333",
      textAlign: 'left',
      alignItems: 'center',
      width: '100%',  // Ocupa todo el ancho disponible
      height: '100%', // Ocupa toda la altura de la ventana
      margin: '0',
    },
    editor: {
      fontFamily: '"Dank Mono", "Fira Code", monospace',
      backgroundColor: "#333",
      width: '100%', // Ocupa todo el ancho disponible
      height: '100%', // Ocupa toda la altura del contenedor
      textAlign: 'left',
      margin: '0', // Sin margen
      ...themes.dracula,
    },
  };

const HighlightElement = ({ code }) => (
  <div style={{ background: themes.dracula.background }}>
    <Highlight theme={themes.oneDark} code={code} language="jsx">
      {({ tokens, getLineProps, getTokenProps }) => (
        <Fragment>
          <pre>
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line })}>
                <span>{i + 1}</span>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token })} />
                ))}
              </div>
            ))}
          </pre>
        </Fragment>
      )}
    </Highlight>
  </div>
);

const NewEditor = () => {
  const [code, setCode] = useState(exampleCode);

  const handleCodeChange = (newCode) => {
    setCode(newCode);
  };

  const handleRunCode = () => {
    // Ejecuta el código
    try {
      eval(code);
    } catch (error) {
      console.error("Error al ejecutar el código:", error);
    }
  };

  return (
    <div style={styles.editorContainer}>
      <Editor
        style={styles.editor}
        value={code}
        onValueChange={handleCodeChange}
        highlight={(code) => <HighlightElement code={code} />}
        padding={10}
      />
      <button onClick={handleRunCode}>Ejecutar Código</button>
    </div>
  );
};

export default NewEditor;
