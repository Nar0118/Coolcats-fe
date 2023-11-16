import React from 'react';
import shopIcon from '../static/images/black-logo.png';

interface QuarterProps {
  items: any,
  title: string
}

const RoadmapQuarter = ({ items, title }: QuarterProps ) => {
  return (
    <div className="roadmap-quarter">
      {items && items.map((roadmapItem: any, i: number) => <RoadmapBlock key={ i } roadmapItem={roadmapItem} />)}
      <h3>{title}</h3>
    </div>
  )
}

interface RoadMapItem {
  icon: string,
  current: boolean,
  title: string,
  content: string
}

interface Props {
  roadmapItem: RoadMapItem
}

const RoadmapBlock = ({ roadmapItem }: Props ) => {
  return (
    <div className={`roadmap-block ${roadmapItem.current ? "current" : ""}`}>
      <span className="line"></span>
      <div className="content-container">
          <img src={roadmapItem.icon} />
          <h2>{roadmapItem.title}</h2>
          <div className="content">
            <p>{roadmapItem.content}</p>
          </div>
      </div>
    </div>
  )
}

export default function Roadmap() {
  const roadmap = [
    {
      title: "Q4 2021",
      items: [
        {
          icon: shopIcon,
          current: true,
          title: 'New Website Launch + Banner Builder',
          content: 'A new Cool Cats website will launch with a few more bits of functionality as well as the long awaited Banner Builder!'
        },
        {
          icon: shopIcon,
          current: false,
          title: 'Launch of Creatures',
          content: 'The creature eggs and evolutions are activated'
        },
        {
          icon: shopIcon,
          current: false,
          title: 'Adventurers Guild',
          content: 'After the creatures we aim to launch stage 2 of our gamification.'
        },
        {
          icon: shopIcon,
          current: false,
          title: 'Paper Cats',
          content: 'NFT released with tutorials focused on new user and developer on-boarding.'
        },
        {
          icon: shopIcon,
          current: false,
          title: 'Winter Wonder',
          content: 'Our winter wonder festivities will begin, stay tuned for more info closer to the time!'
        },
        {
          icon: shopIcon,
          current: false,
          title: 'Cool Charity Event',
          content: 'Large charity donation event, let\'s try and help.'
        },
      ]
    },
    {
      title: "Q1 2022",
      items: [
        {
          icon: shopIcon,
          current: false,
          title: 'Artist Spotlight V2',
          content: 'Our second Artist Spotlight airdrop will happen, artists / collabs to be decided by the team.'
        },
        {
          icon: shopIcon,
          current: false,
          title: 'Additional Gamified Utility for Creatures',
          content: 'Along with the current utility that will be in place, we have plans to introduce another chunky piece of utility for the creatures / cool cats holders.'
        },
        {
          icon: shopIcon,
          current: false,
          title: 'A Place to Call Home',
          content: 'Once we have additional data from the creatures we will be introducing additional utility for them.'
        },
        {
          icon: shopIcon,
          current: false,
          title: 'DAO of Cool',
          content: 'All Cool Cat holders will be able to vote on upcoming events.'
        },
        {
          icon: shopIcon,
          current: false,
          title: 'The Fractures Begin!',
          content: 'The fractures are a story based system / utility we aim to launch in Q2 2022.'
        },
      ]
    },
    {
      title: "Q2 2022",
      items: [
        {
          icon: shopIcon,
          title: 'Launch of Myno Mayhem (Name to be decided)',
          content: 'This is a top secret project, more information closer to the time!'
        },
        {
          icon: shopIcon,
          title: 'Artist Spotlight V3',
          content: 'Our third Artist Spotlight airdrop will happen, artists / collabs to be decided by the team.'
        },
      ]
    }
  ];

  return (
    <>
      { roadmap.map((roadmapQuarter, i) => <RoadmapQuarter key={ i } title={roadmapQuarter.title} items={roadmapQuarter.items} />)}
    </>
  )
}