import "./App.css";

function App() {
  return (
    <>
      <div className="container">
        <h1>Iniciar sesión con Google</h1>
        <a className="google-button" href="http://localhost:3000/auth/google">
          Iniciar sesión con Google
          <img className="icon" src="google.svg" alt="" />
        </a>
      </div>
    </>
  );
}

export default App;
