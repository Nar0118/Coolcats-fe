// Images
import BaseMap from '../assets/cool-town/BaseMap.png';

// Non Hover Images
import TownHall from '../assets/cool-town/TownHall-Idle.png';
import BulletinBoard from '../assets/cool-town/BulletinBoard-NoNotification.png';
import EggField from '../assets/cool-town/Egg-Field-Idle.png';
import House from '../assets/cool-town/House-Idle.png';
import Merch from '../assets/cool-town/Merch-Store-Idle.png';
import Museum from '../assets/cool-town/Museum-Idle.png';
import Ship from '../assets/cool-town/Ship-Idle.png';
import Shop from '../assets/cool-town/Shop-Idle.png';
import MilkShop from '../assets/cool-town/MilkShop-Idle.png';

// Hover Images
import TownHallHover from '../assets/cool-town/TownHall-Hover.png';
import BulletinBoardHover from '../assets/cool-town/BulletinBoard-Hover.png';
import EggFieldHover from '../assets/cool-town/Egg-Field-Hover.png';
import HouseHover from '../assets/cool-town/House-Hover.png';
import MerchHover from '../assets/cool-town/Merch-Store-Moving.png';
import MuseumHover from '../assets/cool-town/Museum-Hover.png';
import ShipHover from '../assets/cool-town/Ship-Hover.png';
import ShopHover from '../assets/cool-town/Shop-Hover.png';
import MilkShopHover from '../assets/cool-town/MilkShop-Hover.png';

class Assets {
    constructor() {
    }

    public fetchAssets() {
        return [
            // Background Asset
            { key: 'background', image: BaseMap },

            // Building Assets
            { key: 'town-hall', image: TownHall },
            { key: 'news', image: BulletinBoard },
            { key: 'egg-field', image: EggField },
            { key: 'house', image: House },
            { key: 'merch', image: Merch },
            { key: 'museum', image: Museum },
            { key: 'ship', image: Ship },
            { key: 'shop', image: Shop },
            { key: 'milk-shop', image: MilkShop },

            // Building Hover Assets
            { key: 'town-hall-hover', image: TownHallHover },
            { key: 'news-hover', image: BulletinBoardHover },
            { key: 'egg-field-hover', image: EggFieldHover },
            { key: 'house-hover', image: HouseHover },
            { key: 'merch-hover', image: MerchHover },
            { key: 'museum-hover', image: MuseumHover },
            { key: 'ship-hover', image: ShipHover },
            { key: 'shop-hover', image: ShopHover },
            { key: 'milk-shop-hover', image: MilkShopHover },
        ];
    }
}

export default Assets;
