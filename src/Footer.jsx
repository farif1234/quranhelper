import React from "react";

const Footer = () => {
    return (
        <footer className="footer footer-center p-4 bg-base-300 text-base-content mt-10 mb-4">
            <div>
                <p>
                    Created by Faihaan Arif. Built with{" "}
                    <a
                        href="https://quran.api-docs.io/v4/getting-started/introduction"
                        className=" link link-primary"
                    >
                        Quran.com API
                    </a>
                    .{"  "}
                    <a
                        className=" link link-primary"
                        href="https://github.com/farif1234/quranhelper"
                    >
                        View code
                    </a>
                    .
                </p>
            </div>
        </footer>
    );
};

export default Footer;
