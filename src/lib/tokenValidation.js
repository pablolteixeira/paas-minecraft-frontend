// Function to decode JWT token and get the payload
function decodeToken(token) {
    const payload = token.split('.')[1];  // JWT structure: Header.Payload.Signature
    const decoded = JSON.parse(atob(payload));  // Decode base64 payload
    return decoded;
  }
  
// Function to check if the token is expired
function isTokenExpired(token) {
    const decodedToken = decodeToken(token);
    const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
    return decodedToken.exp < currentTime; // Check if expiration time has passed
}

export default isTokenExpired;
  