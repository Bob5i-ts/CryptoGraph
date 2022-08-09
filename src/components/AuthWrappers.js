import { useUser } from 'reactfire';

export function PublicWrapper({ children }) {
    const user = useUser();

    if (user.data === null) {
        return children;
    }

    return null;
}

export function PrivateWrapper({ children }) {
    const user = useUser();

    if (user.data) {
        return children;
    }

    return null;
}

