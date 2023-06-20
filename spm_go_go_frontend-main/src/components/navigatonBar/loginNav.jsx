import styles from "./style.module.css";
import logo from "./images/logo.png";

function LoginNavBarGoGo() {

	return (
		<header className="fixed-top" >
			<div className={styles.main_container}>
				<nav className={styles.navbar}>
					<img src={logo} style={{ width: "50px", height: "50px", marginLeft: "70px" }}></img>
					<h4 style={{ color: "white", marginLeft: "-1100px", marginTop: '7px' }}>Go Go Gadgets Store</h4>
					<nav>
					</nav>

				</nav>
			</div>
		</header >

	);
};

export default LoginNavBarGoGo;
