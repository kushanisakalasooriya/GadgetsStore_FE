import React, { useEffect, useState, Fragment } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import styles from "./styles.module.css";
import { PWDRequiesite } from "./PWDRequiesite";
import "./style.css";
import LoginNavBarGoGo from "../../navigatonBar/loginNav";

export default function PasswordReset() {

	const [validUrl, setValidUrl] = useState(false);
	const [password, setPassword] = useState("");
	const [msg, setMsg] = useState("");
	const [error, setError] = useState("");
	const param = useParams();
	const url = `http://localhost:5050/user/password-reset/${param.id}/${param.token}`;

	const [pwdRequisite, setPWDRequisite] = useState(false);
	const [checks, setChecks] = useState({
		capsLetterCheck: false,
		numberCheck: false,
		pwdLengthCheck: false,
		specialCharacterCheck: false,
	});


	const handleOnFocus = () => {
		setPWDRequisite(true);
	};

	const handleOnBlur = () => {
		setPWDRequisite(false);
	};

	const handleOnKeyUp = (e) => {
		const { value } = e.target;
		const capsLetterCheck = /[A-Z]/.test(value);
		const numberCheck = /[0-9]/.test(value);
		const pwdLengthCheck = value.length > 8;
		const specialCharacterCheck = /[!@#$%^&*]/.test(value);
		setChecks({
			capsLetterCheck,
			numberCheck,
			pwdLengthCheck,
			specialCharacterCheck,
		});
	};

	//check valid URL or not
	useEffect(() => {
		const verifyUrl = async () => {
			try {
				await axios.get(url);
				setValidUrl(true);
			} catch (error) {
				setValidUrl(false);
			}
		};
		verifyUrl();
	}, [param, url]);


	const onsubmit = async (e) => {

		e.preventDefault();

		try {

			const { data } = await axios.post(url, { password });
			setMsg(data.message);
			setError("");
			window.location = "/";

		}
		catch (error) {

			if (error.response && error.response.status >= 400 && error.response.status <= 500) {
				setError(error.response.data.message);
				setMsg("");
			}

		}
	};

	const CancelButton = () => {
		window.location = '/';
	}


	return (

		<div>
			<LoginNavBarGoGo />
			<Fragment>

				{validUrl ? (

					<div className={styles.container}>
						<form className={styles.form_container} onSubmit={onsubmit}>
							<h2 style={{ marginTop: "20px", marginBottom: "20px" }}>Add New Password</h2>

							<label style={{ marginLeft: '-290px', fontWeight: "bold" }}>Password    :</label>
							<input
								id="password"
								type="password"
								placeholder='Password'
								name='password'
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								onFocus={handleOnFocus}
								onBlur={handleOnBlur}
								onKeyUp={handleOnKeyUp}
								className={styles.input}
								required

							/>

							{pwdRequisite ? <PWDRequiesite
								capsLetterCheckFlag={checks.capsLetterCheck ? "valid" : "invalid"}
								numberCheckFlag={checks.numberCheck ? "valid" : "invalid"}
								pwdLengthCheckFlag={checks.pwdLengthCheck ? "valid" : "invalid"}
								specialCharacterCheckFlag={checks.specialCharacterCheck ? "valid" : "invalid"}
							/> : null}

							{/* display invalid password message */}
							{error && <div className={styles.err_msg}>{error}</div>}
							{/* display password reset success message */}
							{msg && <div className={styles.success_msg}>{msg}</div>}

							<table style={{ marginBottom: "50px", marginTop: "20px" }}>
								<tr>
									<td><button type="submit" className={styles.g_btn}>Reset Password</button></td>
									<td><button onClick={CancelButton} type='button' className={styles.can_btn}>Cancel</button></td>
								</tr>
							</table>
						</form>
					</div>


				) : (

					<h1>404 Not Found</h1>

				)}

			</Fragment>
		</div>
	)
}
