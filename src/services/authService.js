const API_URL = "https://dummyjson.com";
const REGISTERED_USERS_KEY = "registeredUsers";
const PASSWORD_HASH_ITERATIONS = 310000;

const getRegisteredUsers = () => {
  const storedUsers = localStorage.getItem(REGISTERED_USERS_KEY);

  if (!storedUsers) return [];

  let users;
  try {
    users = JSON.parse(storedUsers);
  } catch {
    throw new Error(
      "Saved account data is corrupted. Clear the registeredUsers browser data and register again."
    );
  }

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
  if (!globalThis.crypto?.getRandomValues || !globalThis.crypto?.randomUUID) {
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

  if (users.some((user) => user?.email?.toLowerCase() === email)) {
    throw new Error("An account with this email already exists. Please log in.");
  }

  const salt = createSalt();
  const saltHex = Array.from(salt, (byte) =>
    byte.toString(16).padStart(2, "0")
  ).join("");
  const passwordHash = await hashPassword(userData.password, salt);

  const user = {
    id: crypto.randomUUID(),
    firstName: userData.firstName.trim(),
    lastName: userData.lastName.trim(),
    email,
    phone: userData.phone,
    gender: userData.gender,
    birthDate: userData.birthDate,
    salt: saltHex,
    passwordHash,
  };

  try {
    localStorage.setItem(
      REGISTERED_USERS_KEY,
      JSON.stringify([...users, user])
    );
  } catch {
    throw new Error(
      "Could not save your account in this browser. Check available storage and try again."
    );
  }

  return withoutCredentials(user);
};

export const loginUser = async (email, password) => {
  const normalizedEmail = email.trim().toLowerCase();
  const user = getRegisteredUsers().find(
    (registeredUser) => registeredUser?.email?.toLowerCase() === normalizedEmail
  );

  if (user) {
    if (
      typeof user.salt !== "string" ||
      !/^[a-f0-9]{32}$/i.test(user.salt) ||
      typeof user.passwordHash !== "string"
    ) {
      throw new Error(
        "This saved account is invalid. Please clear its browser data and register again."
      );
    }

    const salt = Uint8Array.from(
      user.salt.match(/.{2}/g),
      (byte) => parseInt(byte, 16)
    );

    if ((await hashPassword(password, salt)) !== user.passwordHash) {
      throw new Error("Invalid email or password.");
    }

    return withoutCredentials(user);
  }

  let userResponse;
  try {
    userResponse = await fetch(
      `${API_URL}/users/filter?key=email&value=${encodeURIComponent(normalizedEmail)}`
    );
  } catch {
    throw new Error("Unable to connect. Check your internet connection and try again.");
  }

  if (!userResponse.ok) {
    throw new Error("Invalid email or password.");
  }

  const { users } = await userResponse.json();
  const demoUser = users?.[0];

  if (!demoUser?.username) {
    throw new Error("Invalid email or password.");
  }

  let response;
  try {
    response = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: demoUser.username,
        password,
      }),
    });
  } catch {
    throw new Error("Unable to connect. Check your internet connection and try again.");
  }

  if (!response.ok) {
    throw new Error("Invalid email or password.");
  }

  return response.json();
};
