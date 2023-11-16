import React from 'react';
import Discord from '../static/images/icons/discord.png';
import Twitter from '../static/images/icons/twitter.png';
import Medium from '../static/images/icons/medium.png';
import Store from '../static/images/icons/cart.svg';

export default function ShareButtons() {
    return (
        <ul className="share-buttons">
            <li className="discord">
                <a href="https://discord.com/invite/X6A4AXrKaR" target="_blank" rel="noreferrer"><img src={Discord} /></a>
            </li>
            <li className="twitter">
                <a href="https://twitter.com/coolcatsnft" target="_blank" rel="noreferrer"><img src={Twitter} /></a>
            </li>
            <li className="medium">
                <a href="https://coolcatsnft.medium.com/" target="_blank" rel="noreferrer"><img src={Medium} /></a>
            </li>
            <li className="store">
                <a href="https://store.coolcatsnft.com/" target="_blank" rel="noreferrer"><img src={Store} /></a>
            </li>
        </ul>
    );
}
