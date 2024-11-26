const http = require('http')
const UserContoller = require('./controllers/userController')
const setDefaultHeader = require('./middlewares/setDefaultHeader')

function middlewarehandler(req, res) {
    setDefaultHeader(req, res, () => {
        const urlParts = req.url.split('/')
        const id = urlParts[2]
    
        if (req.url.startsWith('/users') && req.method === 'GET') {
            if (id) {
                UserContoller.getUserById(req, res, id)
            } else {
                UserContoller.getAllUsers(req, res)
            }
        } else if (req.url.startsWith('/users') && req.method === 'POST') {
            let body = ''
            req.on('data', chunk => (body += chunk))
            req.on('end', () => {
                const data = JSON.parse(body)
                UserContoller.createUser(req, res, data)
            })
        } else if (req.url.startsWith('/users') && req.method === 'PUT') {
            let body = ''
            req.on('data', chunk => (body += chunk))
            req.on('end', () => {
                const data = JSON.parse(body)
                UserContoller.updateUser(req, res, id, data)
            })
        } else if (req.url.startsWith('/users') && req.method === 'DELETE') {
            UserContoller.deleteUser(req, res, id)
        } else {
            res.status = 404
            res.end('Not Found!')
        }
    })
}

const server = http.createServer(middlewarehandler)

server.listen(3000, () => {
    console.log('Server is running on http://localhost:3000')
})