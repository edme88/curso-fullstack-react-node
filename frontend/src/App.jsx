import { useState } from 'react'
import Nombre from './components/Nombre';
import Layout from './components/Layout';

function App() { //Siempre los componentes deben estar en mayúscula
  const [nombre, setNombre] = useState("Agus");

  return (
    <>
      <Nombre apodo={ nombre } email="agus@email.com" />
      <button onClick={() => setNombre("Andres")}>
        Cambiar nombre
      </button>
      <Layout></Layout>
    </>
  )
}

export default App;
