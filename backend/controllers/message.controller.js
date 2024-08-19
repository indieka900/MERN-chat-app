export const sendMessage = async (req, res) => {
    try {
        const { id } = req.params;
        const { message } = req.body;
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal server error");
    }
}