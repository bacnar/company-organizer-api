const db = require('../database/mysql')

const getAllRoles = async () => {
    const sql = 'SELECT * FROM roles'

    try {
        const [rows] = await db.query(sql)
        return rows
    } catch (err) {
        throw err
    }
}

const getRoleById = async (id) => {
    const sql = 'SELECT * FROM roles WHERE id=?'

    try {
        const [rows] = await db.query(sql, [id])
        return rows
    } catch (err) {
        throw err
    }
}

const addRole = async (name) => {
    const sql = 'INSERT INTO roles (name) VALUES (?)'

    try {
        await db.query(sql, [name])
    } catch (err) {
        throw err
    }
}

const deleteRole = async (id) => {
    const sql = 'DELETE FROM roles WHERE id=?'

    try {
        await db.query(sql, [id])
    } catch (err) {
        throw err
    }
}

const updateRole = async (id, name) => {
    const sql = 'UPDATE roles SET name=? WHERE id=?'

    try {
        await db.query(sql, [name,id])
    } catch (err) {
        throw err
    }
}

module.exports = {
    getAllRoles,
    getRoleById,
    addRole,
    deleteRole,
    updateRole
}