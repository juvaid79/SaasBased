import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function OrganizationNavbar() {
    const navigate = useNavigate()

    const Logout = () => {
        localStorage.clear()
        navigate('/userlogin')
        toast.success('Organization Logout now you can login with user ',{
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
            <div className='Organizationnav'>
                <button onClick={Logout}>Logout</button>
            </div>
        </>
    )
}

export default OrganizationNavbar