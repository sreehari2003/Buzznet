import bcrypt from 'bcrypt';

export const hashPassword = async (password: string): Promise<string> => {
    const saltRounds = 5;
    const salt = await bcrypt.genSalt(saltRounds); // generate a salt
    const hash = await bcrypt.hash(password, salt); // hash the password with the salt

    return hash;
};
