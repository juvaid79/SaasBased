import jwtDecode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function UserNavbar() {


    const token = localStorage.getItem("token")
    const decodeToken = jwtDecode(token)
    const username = decodeToken.token.name

    const navigate = useNavigate()
    const Logout = () => {
        localStorage.clear()
        navigate('/userlogin')
        toast.success('UserLogout',{
            style: {
              background: 'lightblue',
              color: 'white',
            },
            progressStyle: {
              background: 'white', 
            },
            icon: '🎉',
            iconTheme: {
              primary: 'white', 
            },
          })
    }

    return (
        <>
            <nav>
                <p> 👤 {username} </p>
                <div>
                    <button onClick={Logout}>Logout</button>
                </div>
            </nav>
        </>
    )
}

export default UserNavbar