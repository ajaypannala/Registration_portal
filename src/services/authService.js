const API_URL = "https://dummyjson.com";
const REGISTERED_USERS_KEY = "registeredUsers";
const PASSWORD_HASH_ITERATIONS = 310000;

const getRegisteredUsers = () => {
  const storedUsers = localStorage.getItem(REGISTERED_USERS_KEY);

  if (!storedUsers) {
    return [];
  }

  const users = JSON.parse(storedUsers);

  if (!Array.isArray(users)) {
    throw new Error("Saved account data is invalid. Please register again.");
  }

  return users;
};

const hashPassword = async (password, salt) => {
  if (!globalThis.crypto?.subtle) {
    throw new Error("Secure account storage is unavailable in this browser.");
  }

  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(password),
    "PBKDF2",
    false,
    ["deriveBits"]
  );

  const hash = await crypto.subtle.deriveBits(
    {
      name: "PBKDF2",
      salt,
      iterations: PASSWORD_HASH_ITERATIONS,
      hash: "SHA-256",
    },
    key,
    256
  );

  return Array.from(new Uint8Array(hash), (byte) =>
    byte.toString(16).padStart(2, "0")
  ).join("");
};

const createSalt = () => {
  if (!globalThis.crypto?.getRandomValues) {
    throw new Error("Secure account storage is unavailable in this browser.");
  }

  return crypto.getRandomValues(new Uint8Array(16));
};

const withoutCredentials = (user) => {
  const publicUser = { ...user };
  delete publicUser.salt;
  delete publicUser.passwordHash;
  return publicUser;
};

export const registerUser = async (userData) => {
  const email = userData.email.trim().toLowerCase();
  const users = getRegisteredUsers();

  if (users.some((user) => user.email === email)) {
    throw new Error("An account with this email already exists. Please log in.");
  }

  const salt = createSalt();
  const saltHex = Array.from(salt, (byte) =>
    byte.toString(16).padStart(2, "0")
  ).join("");
  const passwordHash = await hashPassword(userData.password, salt);
  const user = {
    id: crypto.randomUUID(),
    firstName: userData.firstName,
    lastName: userData.lastName,
    email,
    phone: userData.phone,
    gender: userData.gender,
    birthDate: userData.birthDate,
    salt: saltHex,
    passwordHash,
  };

  localStorage.setItem(REGISTERED_USERS_KEY, JSON.stringify([...users, user]));

  return withoutCredentials(user);
};

export const loginUser = async (email, password) => {
  const normalizedEmail = email.trim().toLowerCase();
  const user = getRegisteredUsers().find(
    (registeredUser) => registeredUser.email === normalizedEmail
  );

  if (user) {
    const salt = Uint8Array.from(
      user.salt.match(/.{2}/g),
      (byte) => parseInt(byte, 16)
    );

    if ((await hashPassword(password, salt)) !== user.passwordHash) {
      throw new Error("Invalid email or password.");
    }

    return withoutCredentials(user);
  }

  const userResponse = await fetch(
    `${API_URL}/users/filter?key=email&value=${encodeURIComponent(normalizedEmail)}`
  );

  if (!userResponse.ok) {
    throw new Error("Invalid email or password.");
  }

  const { users } = await userResponse.json();
  const demoUser = users?.[0];

  if (!demoUser) {
    throw new Error("Invalid email or password.");
  }

  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: demoUser.username,
      password,
    }),
  });

  if (!response.ok) {
    throw new Error("Invalid email or password.");
  }

  return response.json();
};