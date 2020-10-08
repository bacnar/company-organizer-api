const Router = require('koa-router');
const stationsController = require('../services/stations')

const router = new Router({
    prefix: '/stations'
});

router.get('/', async (ctx, next) => {
    try {
        ctx.body = await stationsController.getAllStations()
    } catch (error) {
        ctx.body = error
        ctx.response.status = 500
    }

    next()
})

router.get('/:id', async (ctx, next) => {
    try {
        const result = await stationsController.getStationById(ctx.params.id)

        if (result.length === 0) {
            ctx.body = "Station doesn't exists"
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
            await stationsController.addStation(ctx.request.body.name)
            ctx.response.status = 200
            ctx.body = "New station added"
        }
    } catch (error) {
        ctx.body = error
        ctx.response.status = 500
    }

    next()
})

router.delete('/:id', async (ctx, next) => {
    try {
        await stationsController.deleteStation(ctx.params.id)
        ctx.response.status = 200
        ctx.body = "Station deleted"
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
            await stationsController.updateStation(ctx.request.body.id, ctx.request.body.name)
            ctx.response.status = 200
            ctx.body = "Station updated"
        }
    } catch (error) {
        ctx.body = error
        ctx.response.status = 500
    }

    next()
})

module.exports = router