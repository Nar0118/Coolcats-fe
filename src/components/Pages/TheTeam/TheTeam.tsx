import React from 'react';
import TwitterLogo from '../../../static/images/icons/twitter.png';
import TwitterLogoBlue from '../../../static/images/icons/twitter-blue.png';

export default function TheTeam() {
    const teamMembers = [
        {
            name: "clon",
            twitter: "https://twitter.com/cloncast",
            image: "https://lh3.googleusercontent.com/7GJouMY06HF-SymjBVontnYJQpLj6TdKCHbypk1Wpp-1QcDqVTLbp3MN3nGXmQOaQ43A-69A4QqbkenJwFNtdpKno2nJSuAWuuaN=w600",
            title: "Founder: Artist",
            description: "",
        },
        {
            name: "xtremetom",
            twitter: "https://twitter.com/xtremetom",
            image: "https://lh3.googleusercontent.com/Hx_RBwlwi9WVaxqUVQB0CFmCp_S2nxPmKiaCM5qObJqbdPV9EHL6L5Tl5G15JA-ZO9mJ3pWbRyHLqyrLO1QqJ4mBPIKuP4XheO23J_k=w600",
            title: "Founder: Developer",
            description: "",
        },
        {
            name: "Lynqoid",
            twitter: "https://twitter.com/lynqoid",
            image: "https://lh3.googleusercontent.com/HmbtjcKdsAWDDgTXBUN_aONXbmJsQeVGW7QcE-jH3kRpqEZkMaKSc0HAb16x7DGzb09b5MYCZp5ylWpJX3HtZTNSBE95xXz5XPgS2g=w600",
            title: "Founder: Developer",
            description: "",
        },
        {
            name: "ELU",
            twitter: "https://twitter.com/evanluza",
            image: "https://lh3.googleusercontent.com/SK8FaKpF_FyaQ7aGqxGqAEPT3q7kkR38z_BvPifpHrN9zs75oDfb7pGVG6ewZys4QlU-lwU5vVsQX-QxzA2mSEMLec1ptQWP9QfDCZQ=w600",
            title: "Founder: Pixel Wrangler",
            description: "",
        },
        {
            name: "Kevin F.",
            twitter: "https://twitter.com/KevinF_WGMI",
            image: "https://lh3.googleusercontent.com/ykFMG0s8ndHGGj46yRLIRp7nvRr48EkU0qnRHPZqkvlz5jLwBms-_CTSWeU_-IrJp0Oks7kV7EJuN8K9x_ZJ62V9LqO5izaGhyFn=w600",
            title: "Senior Events Manager",
            description: "",
            cat_id: 327,
        },
        {
            name: "Frex",
            twitter: "https://twitter.com/lilfrecklez",
            image: "https://lh3.googleusercontent.com/8o3grp2A8cyD9g5SixhEkJKZj2ykoJpeZipchsTX6p3z1RMlV9_AQO2xacjt-7ul4uPW3AA-cI-aAB0INf_4bzGYeEg95P9GiNBq=w600",
            title: "Social Media Manager",
            description: "",
            cat_id: 2195,
        },
        {
            name: "becks",
            twitter: "https://twitter.com/itsbecks12",
            image: "https://lh3.googleusercontent.com/AuSonSGZG5XAsWT8qkcJhQWxo_Uo3T61oeF_rwfn5O4bgV1iX4QVz1quYA5rQqI7TZLGOYQy8iZJdC-R4MJCSAwSJvJFOedmy3PpNsU=w600",
            title: "Senior NFT Analyst",
            description: "",
            cat_id: 2538,
        },
        {
            name: "Grampa_Bacon",
            twitter: "https://twitter.com/Grampa_Bacon",
            image: "https://lh3.googleusercontent.com/ezuIrJWpFvd-irdnM-8bGIPmcX-wZSkLNUlyTUF4rbDFRy69QY8uwIFdpYmRdiy6K2hZyqnGmLndxptMDuZMERpUIUtmVj_nTTHw=w600",
            title: "Developer",
            description: "",
            cat_id: 4742,
        },
        {
            name: "Midnight Etude",
            twitter: "https://twitter.com/MidnightEtude",
            image: "https://lh3.googleusercontent.com/v5U1A9GRF7fmlM3FU4rdoB6Mv3M4v2Dn-FFIjfLDPrRhm0foNzho3Bx0a8FHW55ylxiIXeoNMXLVmS_IF6n7x0TF-wcJqhONn2P_aA=w600",
            title: "Illustrator",
            description: "",
            cat_id: 10000,
        },
        {
            name: "pMauz",
            twitter: "https://twitter.com/pMauz_crypto",
            image: "https://lh3.googleusercontent.com/2FJbuSdEsfszgx3V1HXuKyvQZ5vY_uCisqAp_OB08fTN1_mDMRmy32EPvF-Zbwv0J6HPbiZmcUM02W9D01l7d19isM6wRAk2Tjlxsg=w600",
            title: "Narrative Designer",
            description: "",
            cat_id: 5030,
        },
        {
            name: "Amorista",
            twitter: "https://twitter.com/Amorista13",
            image: "https://lh3.googleusercontent.com/_LGWZKp3UXq-x5tt2K8c7KRcux918dR4nZGgsgdo6Yxx359miIuBzDSvuHw5mK9hoZRfz7tyjR-n-zxZnaNfyZ0e0jI40GU5zYb2-g=w600",
            title: "Contacts Relationship Manager",
            description: "",
            cat_id: 7806,
        },
        {
            name: "RePete",
            twitter: "https://twitter.com/RePeteW",
            image: "https://lynqoid.s3.amazonaws.com/26_720.png",
            title: "Business Development",
            description: "",
            cat_id: 10000,
        },
        {
            name: "Mowley",
            twitter: "https://twitter.com/MyCreativeRobot",
            image: "https://lynqoid.s3.amazonaws.com/160.png",
            title: "Motion Graphic Artist",
            description: "",
            cat_id: 10000,
        },
        {
            name: "Emma",
            twitter: "https://twitter.com/_ratpal_",
            image: "https://lynqoid.s3.amazonaws.com/image_from_ios.png",
            title: "Digital Illustrator",
            description: "",
            cat_id: 10000,
        }
    ]

    return (
        <section className="default-page default-page--the-team">
            <div className="inner-container">
                <h1>The Team</h1>
                <p>Say hello to the Cool Cats team!</p>
                <div className="team-members">
                    {teamMembers.map((teamMember) => {
                        return <div className="team-member">
                            <a className="image" href={teamMember.twitter} target="_blank">
                                <img src={teamMember.image} />
                                <img className="twitter non-hover" src={TwitterLogo} />
                                <img className="twitter hover" src={TwitterLogoBlue} />
                            </a>
                            <h2>{teamMember.name}</h2>
                            <p>{teamMember.title}</p>
                        </div>
                    })}
                </div>
            </div>
        </section>
    )
}
