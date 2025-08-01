
// This is a mock authentication service.
// In a real application, this file would contain the logic
// to interact with your authentication backend (e.g., Firebase, Supabase, etc.).

export interface User {
  id: string;
  name: string;
  phone: string;
  email: string;
}

// Mock database of users, pre-populated with an admin user for testing.
const users: User[] = [
    {
        id: '0',
        name: 'Admin',
        email: 'admin@raspagreen.com',
        phone: '00000000000'
    }
];
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

  // Special case for admin user with password check
  if (email === 'admin@raspagreen.com' && pass === 'admin123') {
      const adminUser = users.find(u => u.email === 'admin@raspagreen.com');
      if (adminUser) {
        console.log("Admin login successful", adminUser);
        return adminUser;
      }
  }

  const existingUser = users.find(u => u.email === email);

  if (existingUser) {
      // In a real app, you'd also check the password here.
      // For regular users, we are not checking passwords in this mock service.
      console.log("Login successful", existingUser);
      return existingUser;
  }
  
  // For demo, if user doesn't exist, throw error
  throw new Error("User not found or password incorrect.");
};

/**
 * Registers a new user.
 * In a real app, this would make an API call to your backend.
 * @param name - The user's name.
 * @param email - The user's email.
 * @param phone - The user's phone number.
 * @param pass - The user's password.
 * @returns A promise that resolves to the newly registered user.
 */
export const register = async (name: string, email: string, phone: string, pass: string): Promise<User> => {
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
    phone,
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
