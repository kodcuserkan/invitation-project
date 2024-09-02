import { UserType } from '@/types';
import usersSource from '../assets/users.json';
import { LoginDataType } from '@components/forms/schemas';

const users: UserType[] = structuredClone(usersSource);

const simulateDelay = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

const readFile = async () => {
    try {
        await simulateDelay(1000);
        return users;
    } catch (error) {
        console.error('Error reading user data:', error);
        return [];
    }
};

const getUser = async (id: string): Promise<UserType | null> => {
    const user = users.find((u: UserType) => u.id === id) || null;

    if (user) {
        const userWithoutPassword = structuredClone(user);
        userWithoutPassword.password = '';
    }

    return user;
};

const login = async ({
    email,
    password
}: LoginDataType): Promise<UserType | null> => {
    await simulateDelay(1000);
    const user =
        users.find(
            (u: UserType) => u.email === email && u.password === password
        ) || null;

    if (user) {
        const userWithoutPassword = structuredClone(user);
        userWithoutPassword.password = '';
    }

    return user;
};

const createUser = async (user: UserType) => {
    await simulateDelay(1000);
    const users = await readFile();
    users.push(user);
    await saveData(users);
};

const updateUser = async (user: UserType) => {
    await simulateDelay(1000);
    const users = await readFile();
    const updatedUsers = users.map((u: UserType) =>
        u.id === user.id ? user : u
    );
    await saveData(updatedUsers);
};

const saveData = async (data: UserType[]) => {
    try {
        await simulateDelay(1000);
        console.log('Data saved:', data);
    } catch (error) {
        console.error('Error saving data:', error);
    }
};

// Add user to localStorage with an expiration time
const cacheUser = (user: UserType) => {
    const expiration = new Date();
    expiration.setMinutes(expiration.getMinutes() + 15); // 15 minutes
    localStorage.setItem('cachedUser', JSON.stringify({ user, expiration }));
};

// Retrieve user from localStorage if not expired
const getCachedUser = (): UserType | null => {
    const cached = localStorage.getItem('app-user');
    if (cached) {
        const { user, expiration } = JSON.parse(cached);
        if (new Date(expiration) > new Date()) {
            const userWithoutPassword = structuredClone(user);
            delete userWithoutPassword?.password;
            return userWithoutPassword;
        }
    }

    return null;
};

export { getUser, createUser, login, updateUser, getCachedUser, cacheUser };
