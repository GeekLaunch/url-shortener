const config = require('./config');

const Koa = require('koa'),
    Router = require('koa-router'),
    shortid = require('shortid');

const app = new Koa(),
    router = new Router();

const knex = require('knex')({
    client: 'mysql',
    connection: {
        host: 'localhost',
        database: 'UrlShortener',
        user: config.username,
        password: config.password,
    },
});

router.post('/new', ctx => {
    const id = shortid.generate(),
        href = ctx.request.body.href;
    
    return knex('Url')
        .insert({
            shortid: id,
            href,
        })
        .then(() => {
            ctx.body = {shortid: id};
        });
});

router.get('/director/:shortid', ctx => {
    return knex('Url')
        .select('href')
        .where({
            shortid: ctx.params.shortid,
        })
        .then(r => {
            const href = r[0].href;
            ctx.redirect(href);
            ctx.status = 302;
        });
});

app
    .use(require('koa-body')())
    .use(router.allowedMethods())
    .use(router.routes());

app.listen(8989);
