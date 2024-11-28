interface UserModel {
    id: number;
    email: string;
    username: string;
    hashedPassword: string;
    createdAt: Date;
}

export default UserModel;