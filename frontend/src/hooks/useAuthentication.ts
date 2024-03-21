import { useEffect, useState } from "react"

const useAuthentication = (): boolean => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

    useEffect(() => {
        const checkAuthentication = () => {
            setIsAuthenticated(!!localStorage.getItem('token'));
        };
        
        checkAuthentication();
    
        window.addEventListener('storage', checkAuthentication);
    
        return () => window.removeEventListener('storage', checkAuthentication);
    }, [])

    return isAuthenticated
}

export default useAuthentication