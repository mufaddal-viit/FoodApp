const USERS_KEY = "authUsers";
const CURRENT_USER_KEY = "authCurrentUser";

const normalizeEmail = (email) => String(email || "").trim().toLowerCase();

const readUsers = () => {
  if (typeof window === "undefined") return [];
  try {
    const stored = window.localStorage.getItem(USERS_KEY);
    if (!stored) return [];
    const parsed = JSON.parse(stored);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

const writeUsers = (users) => {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(USERS_KEY, JSON.stringify(users));
};

const sanitizeUser = (user) => ({
  id: user.id,
  name: user.name || "",
  email: user.email,
});

export const registerUser = async ({ name, email, password }) => {
  const normalizedEmail = normalizeEmail(email);
  if (!normalizedEmail || !password) {
    throw new Error("Email and password are required.");
  }

  const users = readUsers();
  const exists = users.some((u) => normalizeEmail(u.email) === normalizedEmail);
  if (exists) {
    throw new Error("Email is already registered.");
  }

  const newUser = {
    id: `user_${Date.now()}`,
    name: String(name || "").trim(),
    email: normalizedEmail,
    password: String(password),
  };

  users.push(newUser);
  writeUsers(users);
  return { user: sanitizeUser(newUser) };
};

export const loginUser = async ({ email, password }) => {
  const normalizedEmail = normalizeEmail(email);
  if (!normalizedEmail || !password) {
    throw new Error("Email and password are required.");
  }

  const users = readUsers();
  const matched = users.find(
    (u) => normalizeEmail(u.email) === normalizedEmail
  );
  if (!matched || matched.password !== String(password)) {
    throw new Error("Invalid email or password.");
  }

  if (typeof window !== "undefined") {
    window.localStorage.setItem(
      CURRENT_USER_KEY,
      JSON.stringify(sanitizeUser(matched))
    );
  }

  return { user: sanitizeUser(matched) };
};

export const getCurrentUser = () => {
  if (typeof window === "undefined") return null;
  try {
    const stored = window.localStorage.getItem(CURRENT_USER_KEY);
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
};

export const logoutUser = async () => {
  if (typeof window !== "undefined") {
    window.localStorage.removeItem(CURRENT_USER_KEY);
  }
};
