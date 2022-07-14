import { createContext, useState } from 'react';

const accountData = createContext(null);

const AccountDataProvider = ({ children }) => {
    const [account, setAccount] = useState({ username: '', name: '' });

    return <accountData.Provider value={{ account, setAccount }}>{children}</accountData.Provider>;
};
export { accountData, AccountDataProvider };
