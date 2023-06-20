import React from 'react'
import "./footer.css"
import FacebookIcon from '@mui/icons-material/Facebook';
import { Instagram, LocationOn, Mail, Phone } from '@mui/icons-material';


function FooterComponent() {
    return (
        <div className='footergogo'>
            <div className='footergogo1'>
                <footer className="bg-dark text-white">
                    <div className="p-4 pb-0">
                        <div style={{ float: "left", marginTop: "7px", marginLeft: "20px" }}>
                            <h5>GoGo Gadgets Store </h5>
                        </div>
                        <section className="mb-4" style={{ marginLeft: "1100px" }}>
                            <a className="footerBtn" href="#!" role="button"  >
                                <FacebookIcon />
                            </a>
                            <a className="footerBtn" href="#!" role="button" >
                                <Instagram />
                            </a>
                            <a className="footerBtn" href="#!" role="button">
                                <Mail />
                            </a>
                            <a className="footerBtn" href="#!" role="button">
                                <Phone />
                            </a>
                            <a className="footerBtn" href="#!" role="button">
                                <LocationOn />
                            </a>

                        </section>
                    </div>
                    <div className="text-center p-3" style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}>
                        © 2022 Copyright:
                        <a className="CopyRightMod" href="#">GoGoGadgetsStore</a>
                    </div>

                </footer>

            </div>

        </div>

    )
}

export default FooterComponent;


