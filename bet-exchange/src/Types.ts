export type User = {
    id: number;
    username: string;
    role: 'buyer' | 'seller';
    balance: number;
};

export type Product = {
    id: number;
    title: string;
    imageUrl: string;
    description?: string;
    bestPricePosition?: Position;
    bestQuantityPosition?: Position;
};

export type Offer = {
    id: number;
    productId: number;
    buyerId: number;
    quantity: number;
    price: number;
    duration: Date;
    paymentMethod: string;
    address: string;
    status: 'open' | 'accepted' | 'expired';
};

export type Position = {
    id: number;
    productId: number;
    sellerId: number;
    pieces: number;
    minPrice: number;
    expirationDate: Date;
    status: 'open' | 'accepted' | 'expired';
};

export type Notification = {
    id: number;
    userId:  number | null
    message: string;
    timestamp: Date;
    read: boolean;
};

export type ExchangeActivity = {
    productId: number;
    latestPriceMatched: number;
    minBidPrice: number;
    marketDepth: number;
};

export type AuthContextType = {
    username: string | null,
    userId: number | null,
    userRole: 'buyer' | 'seller' | null;
    balance: number | null,
    isLoggedIn: boolean;
    login: (role: 'buyer' | 'seller') => void;
    logout: () => void;
};