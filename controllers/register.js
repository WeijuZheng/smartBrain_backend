const saltRounds = 10;

const handleRegister = (database, bcrypt) => (req, res) => {
    const { email, name, password } = req.body;
    if(!email || !name || !password) {
        return res.status(400).json('incorrect form submission');
    }
    
    const hash = bcrypt.hashSync(password, saltRounds);

    database.transaction(trx => {
        return trx
            .insert({
                email: email,
                name: name,
                joined: new Date()
            }, '*')
            .into('users')
            .then(user => {
                return trx('login')
                    .insert({
                        hash: hash,
                        email: user[0].email
                    })
                    .then(() => res.json(user[0]));
            })
            .then(trx.commit)
            .catch(trx.rollback);
    })
        .catch(err => res.status(400).json('unable to register'));
};

module.exports = {
    handleRegister: handleRegister
};