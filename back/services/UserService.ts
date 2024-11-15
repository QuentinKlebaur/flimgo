class UserController {
    static getAllUsers(req: any, res: any) {
        const users = [
            { name: 'John Doe', email: 'john@example.com' },
            { name: 'Jane Smith', email: 'jane@example.com' },
    ];

      res.json({ users });
    }
}

export default UserController;