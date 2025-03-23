const express = require("express");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const session = require("express-session");
const dotenv = require("dotenv");
const cors = require("cors");
const connection = require("./database/db");

dotenv.config();

const app = express();

// Configura CORS
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// Configura la sesión
app.use(
  session({
    secret: process.env.GOOGLE_CLIENT_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);

// Inicializa Passport
app.use(passport.initialize());
app.use(passport.session());

// Configura la estrategia de Google OAuth
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:3000/auth/google/callback",
    },
    (accessToken, refreshToken, profile, done) => {
      const { id, displayName, emails } = profile;
      const email = emails[0].value;

      connection.query(
        "SELECT * FROM users WHERE googleId = ?",
        [id],
        (err, results) => {
          if (err) return done(err);

          if (results.length > 0) {
            return done(null, results[0]);
          } else {
            connection.query(
              "INSERT INTO users (googleId, displayName, email) VALUES (?, ?, ?)",
              [id, displayName, email],
              (err, results) => {
                if (err) return done(err);
                const newUser = {
                  id: results.insertId,
                  googleId: id,
                  displayName,
                  email,
                };
                return done(null, newUser);
              }
            );
          }
        }
      );
    }
  )
);

// Serializa y deserializa al usuario
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  connection.query("SELECT * FROM users WHERE id = ?", [id], (err, results) => {
    if (err) return done(err);
    done(null, results[0]);
  });
});

// Ruta para iniciar sesión con Google
app.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    prompt: "select_account",
  })
);

// Ruta de callback de Google OAuth
app.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  (req, res) => {
    res.redirect("http://localhost:5173"); // Redirige al frontend
  }
);

// Ruta para verificar la autenticación
app.get("/api/check-auth", (req, res) => {
  if (req.isAuthenticated()) {
    res.json({ isAuthenticated: true, user: req.user });
  } else {
    res.json({ isAuthenticated: false, user: null });
  }
});

// Ruta para cerrar sesión
app.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).send("Error al cerrar sesión");
    }
    req.session.destroy((err) => {
      if (err) {
        console.error("Error al destruir la sesión:", err);
        return res.status(500).send("Error al cerrar sesión");
      }
      res.clearCookie("connect.sid");
      res.redirect("http://localhost:5173"); // Redirige al frontend
    });
  });
});

// Inicia el servidor
app.listen(3000, () => {
  console.log("Servidor corriendo en http://localhost:3000");
});
