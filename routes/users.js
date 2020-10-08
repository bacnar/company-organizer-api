const Router = require('koa-router');
const usersController = require('../services/users')

const router = new Router({
    prefix: '/users'
});

router.get('/', async (ctx, next) => {
    try {
        ctx.body = await usersController.getAllUsers()
    } catch (error) {
        ctx.body = error
        ctx.response.status = 500
    }

    next()
})

router.get('/:id', async (ctx, next) => {
    try {
        const result = await usersController.getUserById(ctx.params.id)

        if (result.length === 0) {
            ctx.body = "User doesn't exists"
            ctx.response.status = 400
        } else {
            ctx.body = result
        }
    } catch (error) {
        ctx.body = error
        ctx.response.status = 500
    }

    next()
})

router.post('/', async (ctx, next) => {
    try {
        if (!ctx.request.body.name ||
            !ctx.request.body.roleId ||
            !ctx.request.body.stationId) {
            ctx.body = "Not right format"
            ctx.response.status = 400
        } else {
            await usersController.addUser(ctx.request.body.name, ctx.request.body.roleId, ctx.request.body.stationId)
            ctx.response.status = 200
            ctx.body = "New User added"
        }
    } catch (error) {
        ctx.body = error
        ctx.response.status = 500
    }

    next()
})

router.delete('/:id', async (ctx, next) => {
    try {
        await usersController.deleteUser(ctx.params.id)
        ctx.response.status = 200
        ctx.body = "User deleted"
    } catch (error) {
        ctx.body = error
        ctx.response.status = 500
    }

    next()
})

router.put('/', async (ctx, next) => {
    try {
        if (!ctx.request.body.name ||
            !ctx.request.body.id ||
            !ctx.request.body.roleId ||
            !ctx.request.body.stationId) {
            ctx.body = "Not right format"
            ctx.response.status = 400
        } else {
            await usersController.updateUser(ctx.request.body.id, ctx.request.body.name, ctx.request.body.roleId, ctx.request.body.stationId)
            ctx.response.status = 200
            ctx.body = "User updated"
        }
    } catch (error) {
        ctx.body = error
        ctx.response.status = 500
    }

    next()
})

module.exports = router