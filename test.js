const bcrypt = require('bcrypt');

const testPassword = 'test1701';

// Re-hash the password
bcrypt.hash(testPassword, 10, (err, newHash) => {
  if (err) {
    console.error('Error hashing password:', err);
  } else {
    console.log('New hash:', newHash);

    // Compare new hash with the original hash
    bcrypt.compare(testPassword, newHash, (err, result) => {
      if (err) {
        console.error('Error comparing passwords:', err);
      } else {
        console.log('Password valid:', result); // Should print: Password valid: true
      }
    });
  }
});
