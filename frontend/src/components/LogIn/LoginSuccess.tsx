import { useEffect } from 'react';

const LoginSuccess = () => {
    useEffect(() => {
        const hash = window.location.hash;
        const tokenFromUrl = new URLSearchParams(hash.substring(1)).get('token');

        if (tokenFromUrl) {
            console.log('tokenFromUrl', tokenFromUrl);
            sessionStorage.setItem('token', tokenFromUrl);
            window.history.replaceState({}, document.title, window.location.pathname);
        }
    }, []);

    return "";
}

export default LoginSuccess;