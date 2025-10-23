export type User = {
    name: string;
    email: string;
    image?: string;
};

export type UserContextType = {
    user: User | null;
    login: (name: string, email: string, image?: string) => void; // <--- hier image optional hinzufügen
    logout: () => void;
};