export const register = async (req, res) => {
    try {
        const {fullname, username, password, confirmPassword, gender} = req.body;
    } catch (error) {
        
    }
    res.status(200).send({message: "Register route"});
}

export const login = (req, res) => {
    res.status(200).send({message: "Login route"});
}

export const logout = (req, res) => {
    res.status(200).send({message: "Logout route"});
}