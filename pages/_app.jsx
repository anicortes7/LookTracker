import 'bootstrap/dist/css/bootstrap.min.css'; // Importa Bootstrap desde node_modules
import '../styles/globals.css';                // Importa tu CSS global personalizado

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
