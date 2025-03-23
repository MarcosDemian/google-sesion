const mysql = require('mysql2');
const config = requite('dotenv');
const connection = mysql.createConnection({
  host: process.env.MYSQLHOST,
  user: process.env.MYSQLUSER,
  password: process.env.MYSQLPASSWORD,
  database: process.env.MYSQLDB,
});

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: 'http://localhost:3000/auth/google/callback',
}, (accessToken, refreshToken, profile, done) => {
  const { id, displayName, emails } = profile;
  const email = emails[0].value;

  // Verifica si el usuario ya existe
  connection.query(
    'SELECT * FROM users WHERE googleId = ?',
    [id],
    (err, results) => {
      if (err) return done(err);

      if (results.length > 0) {
        return done(null, results[0]);
      } else {
        // Si no existe, crea un nuevo usuario
        connection.query(
          'INSERT INTO users (googleId, displayName, email) VALUES (?, ?, ?)',
          [id, displayName, email],
          (err, results) => {
            if (err) return done(err);
            return done(null, { id, displayName, email });
          }
        );
      }
    }
  );
}));