import main from './_main'
import auth from './_auth'
import securities from './_securities'
import comments from './_comments'
import trades from './_trades'

export default Object.assign({}, auth, main, securities, comments, trades);