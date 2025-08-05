// This is a mock authentication service.
// In a real application, this file would contain the logic
// to interact with your authentication backend (e.g., Firebase, Supabase, etc.).

export interface User {
  id: string;
  name: string;
  phone: string;
  email: string;
  document?: string;
  balance?: number; // Add balance to user type
}

// Mock database of users, pre-populated with an admin user for testing.
const users: User[] = [
    {
        id: '0',
        name: 'Admin',
        email: 'admin@raspagreen.com',
        phone: '00000000000',
        document: '00000000000',
        balance: 1000,
    },
    { id: '1', name: 'John Doe', email: 'john.doe@example.com', phone: '1234567890', document: '11122233344', balance: 50 },
    { id: '2', name: 'Jane Smith', email: 'jane.smith@example.com', phone: '0987654321', document: '55566677788', balance: 75 },
];
let userIdCounter = users.length;


/**
 * Fetches all users.
 * @returns A promise that resolves to an array of all users.
 */
export const getAllUsers = async (): Promise<User[]> => {
    console.log("Fetching all users from mock service.");
    await new Promise(resolve => setTimeout(resolve, 200)); // Simulate delay
    return [...users];
};

/**
 * Updates a user's data. In this mock, we only update the balance.
 * @param updatedData - An object containing the user ID and the fields to update.
 * @returns A promise that resolves to true if successful, false otherwise.
 */
export const updateUser = async (updatedData: Partial<User> & { id: string }): Promise<boolean> => {
    console.log(`Updating user ${updatedData.id} with`, updatedData);
    await new Promise(resolve => setTimeout(resolve, 200));
    const userIndex = users.findIndex(u => u.id === updatedData.id);
    if (userIndex !== -1) {
        const currentUser = users[userIndex];
        // Specifically handle balance updates
        if (updatedData.balance !== undefined) {
             users[userIndex] = { ...currentUser, balance: (currentUser.balance || 0) + updatedData.balance };
        } else {
            // For other property updates
            users[userIndex] = { ...currentUser, ...updatedData };
        }
        console.log("User updated:", users[userIndex]);
        return true;
    }
    console.log("Update failed: User not found.");
    return false;
};


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

  const existingUser = users.find(u => u.email === email);

  if (existingUser) {
    // In a real app, you'd check the password.
    // For admin, we have a specific password check.
    if (email === 'admin@raspagreen.com' && pass !== 'admin123') {
        throw new Error("User not found or password incorrect.");
    }
    
    // For regular users, we are not checking passwords in this mock service.
    console.log("Login successful", existingUser);
    return { ...existingUser, balance: existingUser.balance ?? 200 }; // Return with default balance if none exists
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
    balance: 100, // Start with a default balance
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
