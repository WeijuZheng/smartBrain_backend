const handleProfileGet = (database) => (req, res) => {
    const { id } = req.params;
    database('users').select('*')
        .where('id', '=', id)
        .then(user => {
            if (user.length) {
                res.json(user[0]);
            } else {
                res.status(400).json('user not found');
            }
        })
        .catch(err => res.status(400).json('error getting user'));
};

module.exports = {
    handleProfileGet: handleProfileGet
};