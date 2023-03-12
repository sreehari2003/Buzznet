import bcrypt from 'bcrypt';

export const verifyPassword = async (password: string, hash: string): Promise<boolean> => {
    const result = await bcrypt.compare(password, hash); // compare the password with the hash

    return result;
};
