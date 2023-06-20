import styles from "./style.module.css";
import { AddShoppingCart } from '@mui/icons-material';
import './navBar.css';
import logo from "./images/logo.png";

function NavBarGoGo() {

	function handleScroll() {
		window.scroll({
			top: document.body.scrollHeight,
			left: 0,
			behavior: 'smooth',
		});
	}

	return (
		<header className="fixed-top" >
			<div className={styles.main_container}>
				<nav className={styles.navbar}>
					<img src={logo} style={{ width: "50px", height: "50px", marginLeft: "115px" }}></img>
					<h4 style={{ color: "white", marginLeft: "-480px" }}>Go Go Gadgets Store</h4>
					<nav >
						<a href="/cart/view/" className="space"><AddShoppingCart /></a>
						<a href='/userHome' className="space">SHOP</a>
						<a onClick={handleScroll} className="space">ABOUT US</a>
						<a onClick={handleScroll} className="space">SUPPORT</a>
						<a href='/user-profile' >MY ACCOUNT</a>
					</nav>
				</nav>
			</div>
		</header>

	);
};

export default NavBarGoGo;
