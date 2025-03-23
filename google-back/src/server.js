const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const session = require('express-session');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// Configuración de sesiones
app.use(session({
  secret: process.env.GOOGLE_CLIENT_SECRET,
  resave: false,
  saveUninitialized: true,
}));

// Inicializa Passport
app.use(passport.initialize());
app.use(passport.session());

// Configura la estrategia de Google OAuth
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: 'http://localhost:3000/auth/google/callback',
}, (accessToken, refreshToken, profile, done) => {
  // Aquí puedes guardar el perfil del usuario en tu base de datos
  return done(null, profile);
}));

// Serializa y deserializa al usuario
passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

// Rutas de autenticación
app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    // Redirige al usuario después de un inicio de sesión exitoso
    res.redirect('/');
  }
);

// Ruta de inicio
app.get('/', (req, res) => {
  res.send(req.user ? `Bienvenido, ${req.user.displayName}!` : 'No has iniciado sesión.');
});

// Inicia el servidor
app.listen(3000, () => {
  console.log('Servidor corriendo en http://localhost:3000');
});