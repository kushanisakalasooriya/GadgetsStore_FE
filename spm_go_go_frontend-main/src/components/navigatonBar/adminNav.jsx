import styles from "./style.module.css";
import logo from "./images/logo.png";

function AdminNavBarGoGo() {

	const logoutButton = () => {
		window.location = '/';
		sessionStorage.clear();
	}


	return (
		<header className="fixed-top" >
			<div className={styles.main_container}>
				<nav className={styles.navbar}>
					<img src={logo} style={{ width: "50px", height: "50px", marginLeft: "70px" }}></img>
					<h4
						style={{ color: "white", marginLeft: "-580px", marginTop: "7px" }}
					>
						Go Go Gadgets Store
					</h4>
					<nav>
						<a href='#'>DASHBOARD</a>
						<a href='#'>ABOUT US</a>
						<a href='#' onClick={logoutButton}>LOGOUT</a>
					</nav>
				</nav>
			</div>
		</header>

	);
};

export default AdminNavBarGoGo;
