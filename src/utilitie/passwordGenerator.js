export default  function generatePassword(length, symbol, lowerCase, upperCase, numbers) {
    let charset = '';
    let password = '';
  
    if (symbol) charset += '!@#$%^&*()';
    if (lowerCase) charset += 'abcdefghijklmnopqrstuvwxyz';
    if (upperCase) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (numbers) charset += '0123456789';
  
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      password += charset.charAt(randomIndex);
    }
  
    return password;
  }
  
  