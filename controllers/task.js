const mysql = require('mysql');
const bcrypt = require('bcryptjs');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'harshshelar',
    database: 'todolist'
});

// Logic for adding tasks
exports.addTask = (req, res) => {
    let agent_id = req.query.agent;
    console.log(agent_id);
    let { title, description, category, due_date } = req.body;

    let sql = 'SELECT agent_id FROM agent_data WHERE agent_id = ?';
    db.query(sql, [agent_id], async (err, result) => {
        console.log(result);
        if (err) {
            console.log(err);
        }

        if (!result || result.length == 0) {
            return res.status(401).json({
                'status' : 'failure',
                'status_code' : 401
            });
        }

        

        db.query('INSERT INTO agent_task SET ?', { agent_id : agent_id, title : title, description : description, category : category, due_date : due_date }, (err, result) => {
            if (err) {
                console.log(err);
            }
            return res.json({
                'status': 'success',
                'status_code': 200
            });
        });
    });
};

// Logic for viewing tasks
exports.viewTask = (req, res) => {
    let agent_id = req.query.agent;

    let sql = 'SELECT * FROM agent_task WHERE agent_id = ? ORDER BY due_date';

    db.query(sql, [agent_id], (err, results) => {
        return res.json({
            'tasks' : results
        });        
    });
}