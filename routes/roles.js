const Router = require('koa-router');
const rolesController = require('../services/roles')

const router = new Router({
    prefix: '/roles'
});

router.get('/', async (ctx, next) => {
    try {
        ctx.body = await rolesController.getAllRoles()
    } catch (error) {
        ctx.body = error
        ctx.response.status = 500
    }

    next()
})

router.get('/:id', async (ctx, next) => {
    try {
        const result = await rolesController.getRoleById(ctx.params.id)

        if (result.length === 0) {
            ctx.body = "Role doesn't exists"
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
        if (!ctx.request.body.name) {
            ctx.body = "Not right format"
            ctx.response.status = 400
        } else {
            await rolesController.addRole(ctx.request.body.name)
            ctx.response.status = 200
            ctx.body = "New role added"
        }
    } catch (error) {
        ctx.body = error
        ctx.response.status = 500
    }

    next()
})

router.delete('/:id', async (ctx, next) => {
    try {
        await rolesController.deleteRole(ctx.params.id)
        ctx.response.status = 200
        ctx.body = "Role deleted"
    } catch (error) {
        ctx.body = error
        ctx.response.status = 500
    }

    next()
})

router.put('/', async (ctx, next) => {
    try {
        if (!ctx.request.body.name ||
            !ctx.request.body.id) {
            ctx.body = "Not right format"
            ctx.response.status = 400
        } else {
            await rolesController.updateRole(ctx.request.body.id, ctx.request.body.name)
            ctx.response.status = 200
            ctx.body = "Role updated"
        }
    } catch (error) {
        ctx.body = error
        ctx.response.status = 500
    }

    next()
})

module.exports = router