const handleSignin = (database, bcrypt) => (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json('incorrect form submission');
    }
    
    database.select('email', 'hash').from('login')
        .where('email', '=', email)
        .then(data => {
            if (data.length) {
                const isValid = bcrypt.compareSync(password, data[0].hash);
                if (isValid) {
                    database.select('*').from('users')
                        .where('email', '=', data[0].email)
                        .then(user => res.json(user[0]))
                        .catch(err => res.status(400).json('error happened'));
                } else {
                    res.status(400).json('wrong credentials');
                }
            } else {
                res.status(400).json('user not found');
            }
        })
        .catch(err => res.status(400).json('error happened'))
};

module.exports = {
    handleSignin: handleSignin
};