import Axios from 'axios';
import AuthService from './auth.service';

const authHeader = () => {
    const user = AuthService.getCurrentUser();
    const apiUrl = 'http://localhost:3000/api';

    if (user) {
        return Axios.create({
            baseURL: apiUrl,
            headers: {
                Authorization: `Bearer ${user.token}`,
                'Content-Type': 'multipart/form-data',
                // 'Content-Type': 'application/json'
            }
        });
    } else {
        return Axios.create({
            baseURL: apiUrl,
        });
    }
}

export default authHeader;

