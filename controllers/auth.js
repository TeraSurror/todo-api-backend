const mysql = require('mysql');
const bcrypt = require('bcryptjs');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'harshshelar',
    database: 'todolist'
});

// Registration logic
exports.register = (req, res) => {
    const { agent_id, password } = req.body;

    let sql = 'SELECT agent_id FROM agent_data WHERE agent_id = ?';
    db.query(sql, [agent_id], async (err, result) => {
        if (err) {
            console.log(err);
        }

        if (result.length > 0) {
            return res.json({
                "message": "Agent ID already exists"
            });
        }

        let hashedPassword = await bcrypt.hash(password, 8);

        db.query('INSERT INTO agent_data SET ?', { agent_id: agent_id, password: hashedPassword }, (err, result) => {
            if (err) {
                console.log(err);
            }
            return res.json({
                'status': 'account created',
                'status_code': 200
            });
        });
    });
};

// Login logic
exports.login = (req, res) => {
    try {
        
        const { agent_id, password } = req.body;

        if(!agent_id || !password) {
            res.status(401).json({
                'status' : 'failure',
                'status_code' : 401
            });
        }

        let sql = 'SELECT agent_id, password FROM agent_data WHERE agent_id = ?';
        db.query(sql, [agent_id], async (err, result) => {
            console.log(result);
            if(!result || result.length == 0 || !(await bcrypt.compare(password, result[0].password))) {
                return res.status(401).json({
                    'status' : 'failure',
                    'status_code' : 401
                });
            } else {
                return res.json({
                    'status' : 'success',
                    'agent_id' : result[0].agent_id,
                    'status_code' : 200
                });
            }
        });
    } catch(err) {
        console.log(err);
    }
}