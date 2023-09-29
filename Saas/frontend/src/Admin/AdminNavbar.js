import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AdminNavbar() {
    const navigate = useNavigate()
    const Logout = () => {
        localStorage.clear()
        navigate('/adminlogin')
        toast.success('Admin Logout',{
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
                <div>
                    <button onClick={Logout}>Logout</button>
                </div>
            </nav>
        </>
    )
}

export default AdminNavbar