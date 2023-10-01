import { Route } from 'react-router-dom'
import Login from '../pages/Login'
import Register from '../pages/Register'
import Users from '../components/User Module/Users'
import UpdateUser from '../components/User Module/UpdateUser'
import ProtectedRoute from '../middleware/ProtectedRoute'

const routes=(
    <>
        <Route exact path='/' element={<Login />} /> {/*login Route */}
        <Route exact path='/login' element={<Login />} /> {/*login Route */}
        <Route exact path='/register' element={<Register />} /> {/*register Route */}

        <Route exact element={<ProtectedRoute />}>
            <Route exact path='/users' element={<Users />} /> {/*users Route */}
            <Route exact path='/update_user' element={<UpdateUser />} />
        </Route>
    </>
)
export default routes