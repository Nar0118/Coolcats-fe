import React, { useState } from 'react';
import CloseIcon from '../../../static/images/icons/times.svg';
import DoorOne from '../../../static/images/winter-wonderland/1.png';
import DoorTwo from '../../../static/images/winter-wonderland/2.png';
import DoorThree from '../../../static/images/winter-wonderland/3.png';
import DoorFour from '../../../static/images/winter-wonderland/4.png';
import DoorFive from '../../../static/images/winter-wonderland/5.png';
import DoorSix from '../../../static/images/winter-wonderland/6.png';
import DoorSeven from '../../../static/images/winter-wonderland/7.png';
import DoorEight from '../../../static/images/winter-wonderland/8.png';
import DoorNine from '../../../static/images/winter-wonderland/9.png';
import DoorTen from '../../../static/images/winter-wonderland/10b.png';
import DoorEleven from '../../../static/images/winter-wonderland/11.png';
import DoorTwelve from '../../../static/images/winter-wonderland/12.png';
import DoorThirteen from '../../../static/images/winter-wonderland/13.png';
import DoorFourteen from '../../../static/images/winter-wonderland/14.png';
import DoorFifteen from '../../../static/images/winter-wonderland/15.png';
import DoorSixteen from '../../../static/images/winter-wonderland/16.png';
import DoorSeventeen from '../../../static/images/winter-wonderland/17.png';
import DoorEighteen from '../../../static/images/winter-wonderland/18.png';
import DoorNineteen from '../../../static/images/winter-wonderland/19.png';
import DoorTwenty from '../../../static/images/winter-wonderland/20.png';

const CALENDAR_DAYS = [
    {
        day: 1,
        description: "",
        image: DoorOne,
        link: "",
        locked: "unlocked",
    },
    {
        day: 2,
        description: "",
        image: DoorTwo,
        link: "",
        locked: "unlocked",
    },
    {
        day: 3,
        description: "",
        image: DoorThree,
        link: "",
        locked: "unlocked",
    },
    {
        day: 4,
        description: "",
        image: DoorFour,
        link: "",
        locked: "unlocked",
    },
    {
        day: 5,
        description: "",
        image: DoorFive,
        link: "",
        locked: "unlocked",
    },
    {
        day: 6,
        description: "",
        image: DoorSix,
        link: "",
        locked: "unlocked",
    },
    {
        day: 7,
        description: "",
        image: DoorSeven,
        link: "",
        locked: "unlocked",
    },
    {
        day: 8,
        description: "",
        image: DoorEight,
        link: "",
        locked: "unlocked",
    },
    {
        day: 9,
        description: "",
        image: DoorNine,
        link: "",
        locked: "unlocked",
    },
    {
        day: 10,
        description: "",
        image: DoorTen,
        link: "",
        locked: "unlocked",
    },
    {
        day: 11,
        description: "",
        image: DoorEleven,
        link: "",
        locked: "unlocked",
    },
    {
        day: 12,
        description: "",
        image: DoorTwelve,
        link: "",
        locked: "unlocked",
    },
    {
        day: 13,
        description: "",
        image: DoorThirteen,
        link: "",
        locked: "unlocked",
    },
    {
        day: 14,
        description: "",
        image: DoorFourteen,
        link: "",
        locked: "unlocked",
    },
    {
        day: 15,
        description: "",
        image: DoorFifteen,
        link: "",
        locked: "unlocked",
    },
    {
        day: 16,
        description: "",
        image: DoorSixteen,
        link: "",
        locked: "unlocked",
    },
    {
        day: 17,
        description: "",
        image: DoorSeventeen,
        link: "",
        locked: "unlocked",
    },
    {
        day: 18,
        description: "",
        image: DoorEighteen,
        link: "",
        locked: "unlocked",
    },
    {
        day: 19,
        description: "",
        image: DoorNineteen,
        link: "",
        locked: "unlocked",
    },
    {
        day: 20,
        description: "",
        image: DoorTwenty,
        link: "",
        locked: "unlocked",
    }
]

export default function WinterWonderland() {
    const [activeImage, setActiveImage] = useState('');
    const [activeDay, setActiveDay] = useState(0);
    const zoomImage = (image: string, day: number, locked: string) => {
        if(locked === "unlocked") {
            setActiveImage(image);
            setActiveDay(day);
        }
    }

    const closeImage = () => {
        setActiveImage('');
    }

    return (
        <section className="default-page default-page--winter-wonderland">
            <h1 style={{marginTop: '0px', paddingTop: '20px', paddingLeft: '20px', paddingRight: '20px'}}>Winter Wonderland</h1>
            <div style={{margin: '20px', maxWidth: '820px', backgroundColor: 'rgba(255,255,255,0.6)', padding: '20px', borderRadius: '10px', marginBottom: '30px'}}><p>Click the images below to see todays puzzle. Each day will bring a new puzzle/question, so check <a target="_blank" href="https://twitter.com/coolcatsnft">twitter</a> each day.</p><p style={{marginBottom: '0px'}}>Submit your puzzle answers to the form on <a target="_blank" href="https://twitter.com/coolcatsnft">twitter</a>. To take part you have to own an NFT from one of our collections: <a target="_blank" href="https://opensea.io/collection/cool-cats-nft">Cool Cats NFT</a>, <a target="_blank" href="https://opensea.io/collection/cool-cats-events">Cool Cats Events</a>, <a target="_blank" href="https://opensea.io/collection/cool-cats-collabs">Cool Cats Collabs</a>, <a target="_blank" href="https://opensea.io/collection/cool-cats-achievements">Cool Cats Achievements</a>, <a target="_blank" href="https://opensea.io/collection/cool-cats-originals">Cool Cats Originals</a>.</p>
            </div>
            <div className="calendar">
                {CALENDAR_DAYS.map((day) => {
                    return <div className={`day ${day.locked}`} onClick={() => zoomImage(day.image, day.day, day.locked)}>
                        <span className="door">{day.day}</span>
                        <span className="content"><img src={day.image} /></span>
                    </div>
                })}
            </div>
            {activeImage && <div className="overlay image-overlay">
                <div className="image">
                    <button className="close" onClick={closeImage}><img src={CloseIcon} /></button>
                    <img src={activeImage} />
                    <p className="puzzle-day">Day {activeDay}</p>
                </div>
            </div>}
        </section>
    )
}
