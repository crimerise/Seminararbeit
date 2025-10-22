export type User = {
    name: string;
    email: string;
};

export type UserContextType = {
    user: User | null;
    login: (name: string, email: string) => void;
    logout: () => void;
};