/* eslint-disable react-hooks/rules-of-hooks */
import { decodeToken } from 'react-jwt';

import axios from 'src/utils/axios';

const isValidToken = (accessToken) => {
  if (!accessToken) {
    return false;
  }

  // Decode the token
  const decoded = decodeToken(accessToken);

  // If the decoded token is null or undefined, the token is invalid
  if (!decoded) {
    // console.log('Invalid token: unable to decode');
    return false;
  }

  // Log the decoded token for debugging purposes
  // console.log('Decoded Token:', decoded);

  // Get current time in seconds (JWT stores expiration time in seconds)
  const currentTime = Date.now() / 1000;

  // Log current time and expiration time for debugging
  // console.log('Current time:', currentTime);
  // console.log('Expiration time:', decoded.exp);

  // Check if the token is expired
  if (decoded.exp <= currentTime) {
    // console.log('Token has expired');
    return false;
  }

  // If token is still valid (not expired)
  // console.log('Token is valid');
  return true;
};

const setSession = (accessToken) => {
  if (accessToken) {
    localStorage.setItem('accessToken', accessToken);
    axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
  } else {
    localStorage.removeItem('accessToken');
    delete axios.defaults.headers.common.Authorization;
  }
};

const sign = (payload, privateKey, header) => {
  const now = new Date();
  header.expiresIn = new Date(now.getTime() + header.expiresIn);
  const encodedHeader = btoa(JSON.stringify(header));
  const encodedPayload = btoa(JSON.stringify(payload));
  const signature = btoa(
    Array.from(encodedPayload)
      .map((item, key) =>
        String.fromCharCode(item.charCodeAt(0) ^ privateKey[key % privateKey.length].charCodeAt(0)),
      )
      .join(''),
  );

  return `${encodedHeader}.${encodedPayload}.${signature}`;
};

const verify = (token, privateKey) => {
  const [encodedHeader, encodedPayload, signature] = token.split('.');
  const header = JSON.parse(atob(encodedHeader));
  const payload = JSON.parse(atob(encodedPayload));
  const now = new Date();

  if (now < header.expiresIn) {
    throw new Error('Expired token');
  }

  const verifiedSignature = btoa(
    Array.from(encodedPayload)
      .map((item, key) =>
        String.fromCharCode(item.charCodeAt(0) ^ privateKey[key % privateKey.length].charCodeAt(0)),
      )
      .join(''),
  );

  if (verifiedSignature !== signature) {
    throw new Error('Invalid signature');
  }

  return payload;
};

export { isValidToken, setSession, sign, verify };
