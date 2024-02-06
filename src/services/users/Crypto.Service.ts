import bcrypt from 'bcryptjs';

class Cryptograph {
    private readonly saltRounds: number = 10;

    async encrypt(pwd: string): Promise<string> {
        return bcrypt.hashSync(pwd, this.saltRounds);
    }

    async decrypt(pwd: string, hash: string): Promise<boolean> {
        return await bcrypt.compare(pwd, hash);
    }
}