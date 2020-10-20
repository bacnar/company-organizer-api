const db = require('../database/mysql')

const getAllUsers = async () => {
    const sql = `SELECT u.id, u.name, u.role_id, u.station_id, u.username, u.password, u.email, s.name AS station_name, r.name AS role_name FROM users u
    INNER JOIN stations s
    ON s.id = u.station_id
    INNER JOIN roles r
    ON r.id = u.role_id
    ORDER BY u.id ASC`

    try {
        const [rows] = await db.query(sql)
        return rows
    } catch (err) {
        throw err
    }
}

const getUserById = async (id) => {
    const sql = `SELECT u.id, u.name, u.role_id, u.station_id, u.username, u.password, u.email, s.name AS station_name, r.name AS role_name FROM users u
    INNER JOIN stations s
    ON s.id = u.station_id
    INNER JOIN roles r
    ON r.id = u.role_id 
    WHERE u.id=?`

    try {
        const [rows] = await db.query(sql, [id])
        return rows
    } catch (err) {
        throw err
    }
}

const addUser = async (name, roleId, stationId, username, email, password) => {
    const sql = 'INSERT INTO users (name, role_id, station_id, username, password, email) VALUES (?, ?, ?, ?, ?, ?)'

    try {
        await db.query(sql, [name, roleId, stationId,username, password, email])
    } catch (err) {
        throw err
    }
}

const deleteUser = async (id) => {
    const sql = 'DELETE FROM users WHERE id=?'

    try {
        await db.query(sql, [id])
    } catch (err) {
        throw err
    }
}

const updateUser = async (id, name, roleId, stationId, username, email, password) => {
    const sql = 'UPDATE users SET name=?, role_id=?, station_id=?, username=?, email=?, password=? WHERE id=?'

    try {
        await db.query(sql, [name, roleId, stationId, username, email, password, id])
    } catch (err) {
        throw err
    }
}

module.exports = {
    getAllUsers,
    getUserById,
    addUser,
    deleteUser,
    updateUser
}