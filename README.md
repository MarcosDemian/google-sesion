# **Inicio de Sesión con Google**

Este es un proyecto simple para practicar la autenticación con Google usando OAuth 2.0. La idea era implementar un botón que permita a los usuarios iniciar sesión con su cuenta de Google, usando tecnologías como  **Node.js**,  **Express**,  **Passport.js**  y  **React**.

Nada del otro mundo, pero sirve para entender cómo funciona el flujo de autenticación y cómo integrar APIs de terceros en una aplicación web.

----------

## **Tecnologías Usadas**

-   **Frontend**: React.
    
-   **Backend**: Node.js, Express, Passport.js.
    
-   **Autenticación**: Google OAuth 2.0.
    

----------

## **Cómo Funciona**

1.  **Inicio de Sesión con Google**:  
    El usuario hace clic en el botón "Iniciar sesión con Google".
    
2.  **Flujo de Autenticación**:
    
    -   Se redirige a la página de Google para autorizar la aplicación.
        
    -   Google devuelve los datos del usuario al servidor.
        
    -   El servidor maneja la sesión y muestra un mensaje de bienvenida.
        

----------

## **Cómo Probarlo**

Si querés probarlo en tu máquina, seguí estos pasos:

1.  **Cloná el repositorio**:
    
    en bash:
    
    git clone: https://github.com/MarcosDemian/google-sesion
    
2.  **Instalá las dependencias**:
    cd google-back / cd google-front
    npm install
    
3.  **Configurá las variables de entorno**:  
    Creá un archivo  `.env`  en la raíz del proyecto y agregá tus credenciales de Google OAuth:
    
    GOOGLE_CLIENT_ID=tu_client_id
    GOOGLE_CLIENT_SECRET=tu_client_secret
    MYSQLHOST=host
    MYSQLUSER=usuario
    MYSQLPASSWORD=contraseña_de_tu_host
    MYSQLDB=nombre_de_tu_base_de_datos
    
4.  **Iniciá el servidor**:
    node server.js
    
5.  **Probá la aplicación**:  
    Abrí tu navegador y andá a  `http://localhost:XXXX`. Hacé clic en "Iniciar sesión con Google" y seguí el flujo.

----------

## **Aprendizajes**

Este proyecto me ayudó a entender:

-   Cómo funciona OAuth 2.0.
    
-   Cómo integrar Google OAuth en una aplicación web.
    
-   Cómo manejar sesiones en Node.js con Passport.js.
    

----------

## **Próximos Pasos**

Si tengo tiempo, me gustaría agregar:

-   Un mensaje de bienvenida con el nombre del usuario.
    
-   Soporte para cerrar sesión.
    

----------

## **Contacto**

Si tenés alguna duda o querés charlar sobre el proyecto, no dudes en contactarme:

-   **Email**:  [demiangarci254@gmail.com](https://mailto:tu-email@dominio.com/)
    
-   **LinkedIn**:  [https://www.linkedin.com/in/marcos-demian-garcia/](https://www.linkedin.com/in/tu-perfil)
    

----------

¡Gracias por pasarte! 🚀