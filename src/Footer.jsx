import React from "react";

const Footer = () => {
    return (
        <footer className="footer footer-center p-4 bg-base-300 text-base-content mt-10 mb-4">
            <div>
                <p>
                    Created by Faihaan. Built with{" "}
                    <a
                        href="https://api-docs.quran.com/docs/category/quran.com-api"
                        className=" link link-primary"
                        target="_blank"
                    >
                        Quran.com API
                    </a>
                    .{"  "}
                    <a
                        className=" link link-primary"
                        href="https://github.com/farif1234/quranhelper"
                        target="_blank"
                    >
                        Open Source
                    </a>
                    .
                </p>
            </div>
        </footer>
    );
};

export default Footer;
