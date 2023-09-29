import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainHome from './MainHome/MainHome';
import AdminLogin from './Admin/AdminLogin';
import UserLogin from './User/UserLogin';
import OrganizationLogin from './Organization/OrganizationLogin';
import OrganizationSignup from './Organization/OrganizationSignup';
import AdminSingup from './Admin/AdminSingup';
import UserSingup from './User/UserSingup';
import AdminHome from './Admin/AdminHome';
import UserHome from './User/UserHome';
import ForgetPass from './User/FogetPass';
import OrganizationHome from './Organization/OrganizationHome'
import Publicroute from './Publicroute';
import Privateroute from './Privateroute';


function App() {
	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Publicroute />}>
						<Route index element={<MainHome />} />
						<Route path="/adminsingup" element={<AdminSingup />} />
						<Route path="/adminlogin" element={<AdminLogin />} />
						<Route path='/organizationsingup' element={<OrganizationSignup />} />
						<Route path='/organizationlogin' element={<OrganizationLogin />} />
						<Route path="/userlogin" element={<UserLogin />} />
						<Route path="/userforget" element={<ForgetPass />} />
					</Route>

					<Route path="/" element={<Privateroute />}>
					<Route index element={< OrganizationHome/>} />
						<Route path="/usersingup" element={<UserSingup />} />
						<Route path="/adminhome" element={<AdminHome />} />
						<Route path="/organizationhome" element={<OrganizationHome />} />
						<Route path="/userhome" element={<UserHome />} />
					</Route>
				</Routes>
			</BrowserRouter>

		</>
	);
}

export default App;
