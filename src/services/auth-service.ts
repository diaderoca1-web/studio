
// This is a mock authentication service.
// In a real application, this file would contain the logic
// to interact with your authentication backend (e.g., Firebase, Supabase, etc.).

export interface User {
  id: string;
  name: string;
  email: string;
}

// Mock database of users
const users: User[] = [];
let userIdCounter = 1;

/**
 * Logs a user in.
 * In a real app, this would make an API call to your backend.
 * @param email - The user's email.
 * @param pass - The user's password.
 * @returns A promise that resolves to the logged-in user.
 */
export const login = async (email: string, pass: string): Promise<User> => {
  console.log(`Attempting to log in with email: ${email}`);
  
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));

  // In a real app, you'd find the user and verify the password.
  // For this mock, we'll just return a dummy user if the email is not "fail@test.com".
  if (email.toLowerCase() === 'fail@test.com') {
    throw new Error("Invalid email or password.");
  }

  const existingUser = users.find(u => u.email === email);

  if (existingUser) {
      return existingUser;
  }
  
  // If user doesn't exist, create a mock one for demo purposes
  const mockUser: User = {
    id: '1',
    name: 'Mock User',
    email: email,
  };
  
  console.log("Login successful", mockUser);
  return mockUser;
};

/**
 * Registers a new user.
 * In a real app, this would make an API call to your backend.
 * @param name - The user's name.
 * @param email - The user's email.
 * @param pass - The user's password.
 * @returns A promise that resolves to the newly registered user.
 */
export const register = async (name: string, email: string, pass: string): Promise<User> => {
  console.log(`Attempting to register new user with email: ${email}`);

  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));

  if (users.find(u => u.email === email)) {
      throw new Error("User with this email already exists.");
  }

  const newUser: User = {
    id: (userIdCounter++).toString(),
    name,
    email,
  };

  users.push(newUser);
  console.log("Registration successful", newUser);
  return newUser;
};


/**
 * Logs the user out.
 * In a real app, this might involve clearing tokens from storage or making an API call.
 */
export const logout = (): void => {
  console.log("User logged out.");
  // In a real app, you might invalidate a session on the server.
  // For this mock, there's nothing to do here.
};
