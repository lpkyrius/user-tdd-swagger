class User {
    id?: string;
    email!: string;
    role!: string;
    created_at?: Date;
  
    private constructor({ email, role }: User) {
      return Object.assign(this, {
        email,
        role
      });
    }
  }
  
  export { User };