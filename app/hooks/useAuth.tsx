import { logIn as TMDbLogin } from '../../lib/themoviedb'

// Define the shape of the authentication state
interface AuthState {
    isLoggedIn: () => boolean;  
    login: (user: string, password: string) => Promise<void>;
    logout: () => void;
    getAccountId: () => string;
}

// Custom hook for managing authentication state
function useAuth(): AuthState {
    // Function to log in the user
    const login = async (username: string, password: string) => {
        TMDbLogin(username, password).then((res) => {
            if (typeof window !== 'undefined') {
                window.localStorage.setItem('accountId', res.id)
                window.localStorage.setItem('accountName', res.username)
            }
        })
    };

    // Function to log out the user
    const logout = () => {
        if (typeof window !== 'undefined') {
            window.localStorage.removeItem('accountId')
            window.localStorage.removeItem('accountName')
        }
    };

    const getAccountId = () => {
        if (typeof window !== 'undefined') {
            return window.localStorage.getItem('accountId') || ''
        }
        return ''
    }
     
    const isLoggedIn = () => {
        if (typeof window !== 'undefined') {
            return Boolean(window.localStorage.getItem('accountId'))
        }
        return false
    }

    return {
        isLoggedIn,
        login,
        logout,
        getAccountId
    };
}

export default useAuth;