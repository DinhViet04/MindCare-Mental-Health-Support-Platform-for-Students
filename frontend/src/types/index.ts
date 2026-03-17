export interface User {
    _id: string;
    email: string;
    fullName: string;
    role: 'student' | 'expert' | 'admin' | 'moderator';
    avatar?: string;
    phone?: string;
    dateOfBirth?: Date;
    gender?: 'male' | 'female' | 'other';
    address?: string;
    isEmailVerified: boolean;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface AuthResponse {
    success: boolean;
    token: string;
    data: {
        user: User;
    };
}

export interface LoginCredentials {
    email: string;
    password: string;
}

export interface RegisterData {
    email: string;
    password: string;
    fullName: string;
}

export interface ApiError {
    success: false;
    message: string;
    errors?: Array<{
        msg: string;
        param: string;
    }>;
}