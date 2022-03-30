const Hapi = require('@hapi/hapi')

const init = async () => {

    const server = Hapi.server({
        port:8080,
        host: 'localhost'
    })

    await server.start();
    console.log(server.info.uri)
}

process.on('unhandledRejection', (err) => {
    console.log(err)
    process.exit(1)
} )

init()
