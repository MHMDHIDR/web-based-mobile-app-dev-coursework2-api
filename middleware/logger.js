// logger.js
const logger = format => (req, _res, next) => {
  const { method, url, body } = req
  const dateCommon = new Date().toISOString()
  const dateLocal = new Date(dateCommon).toLocaleDateString()

  const log = `
    Request: ${method}
    From: ${url}
    AT: ${format === 'common' ? dateCommon : format === 'local' ? dateLocal : new Date()}
    ${format === 'full' ? (body.length ? `Body: ${JSON.stringify(body)}` : '') : ''}
  `

  console.log(log)
  next()
}

export default logger
