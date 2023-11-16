import React from 'react';
import CoolCatsImage from "../../../static/images/optimized/cool-cats.png";
import CoolCatsStatCards from "../../../static/images/optimized/cool-cats-stat-cards.png";
import Graph from "../Home/components/Graph";
import CoolCatsQuestionMark from "../../../static/images/optimized/cool-cats-question-mark.png";

export default function AboutUs() {
    const googleDriveImages = {
        RoadGif: 'https://drive.google.com/uc?id=1BbJjm8Dfdfq-QLOEtv9qnyCd8xar3a3L',
        UnderARock: 'https://drive.google.com/uc?id=16vY65rYolJQLr-mO4sneGsG81iWQoxCj'
    };

    return (
        <section className="default-page default-page--about">
            <section className="info info--left info--grey">
                <a id="learn-section" />
                <div className="inner-container text-and-image">
                    <div className="text">
                        <h3>What are Cool Cats?</h3>
                        <p>Cool Cats are a collection of programmatically, randomly generated NFTs on the Ethereum blockchain. The 1st generation consists of 10,000 randomly assembled cats from over 300k total options. Cool Cats that have a variety of outfits, faces and colors - all cats are cool, but completed outfit cats are the coolest. Each Cool Cat is comprised of a unique body, hat, face and outfit - the possibilities are endless!</p>
                    </div>
                    <div className="image">
                        <img alt="" src={CoolCatsImage} />
                    </div>
                </div>
            </section>
            <section className="info info--graph info-white">
                <a id="rarity-section" />
                <div className="inner-container">
                    <img alt="" src={CoolCatsStatCards} />
                    <div className="graph-container">
                        <div className="graph-text">
                            <h3>How cool is my cat?</h3>
                            <p>For starters - all cats are cool, remember? That said, Cool Cats are worth between 3 and 10 points. These points are determined by which items your Cool Cat is made up of. Common items like a beanie or a hat are worth fewer points than more rare items like a computer head or an ape outfit.</p>
                            <p>The points of your Cool Cat can contribute to certain contests and raffles, but will be even more useful for breeding in Gen 2!</p>
                        </div>
                        <Graph />
                    </div>
                    <div className="text-and-text">
                        <div className="text">
                            <img alt="" src={CoolCatsQuestionMark} />
                            <h3>Why get a Cool Cat?</h3>
                            <p>Aside from participating in one the freaking coolest, curated but randomized NFT projects to date and getting a kick butt profile picture - you can help us evolve and build the future of Cool Cats. We’re giving back 20% of all ETH raised to the community (through contests, raffles, and more) - because we genuinely want Cool Cats to be a community driven and centric project. By getting a Cool Cat you have a voice in the community and can help guide the direction of the project. We’ll need help from you guys to determining specifics for future developments like breeding, next generation Cool Cats, the app, and much more!</p>
                        </div>
                        <div className="text">
                            <h3>Alright, how much?</h3>
                            <p>Cool Cats are priced at a flat rate (0.02 Ξ), and remember - Blue Cat Skin is exclusive to Gen 1!</p>
                        </div>
                    </div>
                </div>
            </section>
            <section className="info info--yellow">
                <div className="inner-container">
                    <div className="text">
                        <h3>Future of Cool Cats?</h3>
                        <p>Cool Cats are much more than an NFT art project. We have plans and hopes to build a Cool Cat ecosystem comprised of interactivity and utility, community rewards and growth, collaboration with brands, and much more! We want the community to help dictate and determine which features we should be focusing on next - so you guys will be heavily involved in the future of Cool Cats!</p>
                    </div>
                    <img alt="" className="under-a-rock" src={googleDriveImages.UnderARock} />
                    <a id="faq-section" />
                </div>
            </section>
        </section>
    )
}
