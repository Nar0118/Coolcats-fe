import React from 'react';
import PDFSolidity from './../../../static/pdf/solidity-developer.pdf';
import PDFCommunityManager from './../../../static/pdf/community-manager.pdf';
import PDFReact from './../../../static/pdf/react-developer.pdf';
import PDFWebDesigner from './../../../static/pdf/web-designer.pdf';

export default function Vacancies() {
    const vacancies = [
        {
            title: "Full-time - Lead Solidity Developer",
            description:
                <>
                    <p>A full time lead solidity developer is required by the Cool Cats NFT team. We are looking for someone who is passionate and dedicated to building our future utility.</p>
                    <ul>
                        <li>Organize the entire development process and team</li>
                        <li>Architect  code and team</li>
                        <li>Build and maintain code base</li>
                    </ul>
                    <a className="button green" target="_blank" href={PDFSolidity}>Job Description</a>
                </>,
        },
        {
            title: "Full-time - React Developer",
            description:
                <>
                    <p>We are looking for a full time React developer to join us at Cool Cats NFT. We use the Context API, Pusher, Web3 and SCSS to create our website.</p>
                    <ul>
                        <li>Strong typescript knowledge</li>
                        <li>Build UI/UX from designs</li>
                        <li>Integrate web3</li>
                    </ul>
                    <a className="button green" target="_blank" href={PDFReact}>Job Description</a>
                </>,
        },
        {
            title: "UI/Web Designer",
            description:
                <>
                    <p>Cool Cats NFT are on the look out for experienced web / UI designers to join us and produce high quality, cute looking UIs for the website and future gamification projects.</p>
                    <ul>
                        <li>Conceptualize and formulate fun and quirky UI that can facilitate required functionality</li>
                        <li>Able to work very closely with the dev team</li>
                        <li>Experience designing game UI a major plus</li>
                    </ul>
                    <a className="button green" target="_blank" href={PDFWebDesigner}>Job Description</a>
                </>,
        }
    ]

    return (
        <section className="default-page default-page--vacancies">
            <div className="inner-container">
                <h1>Come Work With Cool Cats!</h1>
                <p>Feel free to reach out to us via <a href="mailto:hello@coolcatsnft.com">hello@coolcatsnft.com</a></p>
                <div className="vacancies">
                    {vacancies.map((vacancy) => {
                        return <div className="vacancy">
                            <h2>{vacancy.title}</h2>
                            <div className="description" >{vacancy.description}</div>
                        </div>
                    })}
                </div>
            </div>
        </section>
    )
}
