const { Router } = require('express')
const router = Router()

router.get('/', (req, res) => res.send('Employees init!'))

module.exports = router
