const db = require('../database/mysql')

const getAllStations = async () => {
    const sql = 'SELECT * FROM stations'

    try {
        const [rows] = await db.query(sql)
        return rows
    } catch (err) {
        throw err
    }
}

const getStationById = async (id) => {
    const sql = 'SELECT * FROM stations WHERE id=?'

    try {
        const [rows] = await db.query(sql, [id])
        return rows
    } catch (err) {
        throw err
    }
}

const addStation = async (name) => {
    const sql = 'INSERT INTO stations (name) VALUES (?)'

    try {
        const [rows] = await db.query(sql, [name])
        return rows
    } catch (err) {
        throw err
    }
}

const deleteStation = async (id) => {
    const sql = 'DELETE FROM stations WHERE id=?'

    try {
        const [rows] = await db.query(sql, [id])
        return rows
    } catch (err) {
        throw err
    }
}

const updateStation = async (id, name) => {
    const sql = 'UPDATE stations SET name=? WHERE id=?'

    try {
        const [rows] = await db.query(sql, [name,id])
        return rows
    } catch (err) {
        throw err
    }
}

module.exports = {
    getAllStations,
    getStationById,
    addStation,
    deleteStation,
    updateStation
}