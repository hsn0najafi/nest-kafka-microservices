import * as bcrypt from 'bcrypt';

export const hashPassword = async (password: string): Promise<string> => {
  try {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  } catch (err) {
    throw new Error(err);
  }
};

export const comparePassword = async (
  password: string,
  hash: string,
): Promise<boolean> => {
  try {
    return await bcrypt.compare(password, hash);
  } catch (err) {
    throw new Error(err);
  }
};
