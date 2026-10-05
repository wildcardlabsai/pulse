import { Fighter, BoxingEvent, Fight, Promotion, AlertNotification, ProviderHealth } from '../types/boxing';

export const PROMOTIONS: Promotion[] = [
  {
    id: 'matchroom',
    name: 'Matchroom Boxing',
    logo: 'https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?w=120&auto=format&fit=crop&q=80',
    website: 'https://matchroomboxing.com',
    fightsCount: 2847,
    description: 'World-leading boxing promoter founded by Barry Hearn and led by Eddie Hearn.'
  },
  {
    id: 'queensberry',
    name: 'Queensberry Promotions',
    logo: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=120&auto=format&fit=crop&q=80',
    website: 'https://queensberry.co.uk',
    fightsCount: 1923,
    description: 'Premier British boxing promotional organisation founded by Hall of Fame promoter Frank Warren.'
  },
  {
    id: 'boxxer',
    name: 'BOXXER',
    logo: 'https://images.unsplash.com/photo-1599058917212-d750089bc07e?w=120&auto=format&fit=crop&q=80',
    website: 'https://boxxer.com',
    fightsCount: 840,
    description: 'Next-generation UK boxing promoter and official broadcast partner of Sky Sports Boxing.'
  },
  {
    id: 'top-rank',
    name: 'Top Rank',
    logo: 'https://images.unsplash.com/photo-1579758629938-03607ccdbaba?w=120&auto=format&fit=crop&q=80',
    website: 'https://toprank.com',
    fightsCount: 1654,
    description: 'Historic American boxing company founded by legendary promoter Bob Arum.'
  },
  {
    id: 'pbc',
    name: 'Premier Boxing Champions',
    logo: 'https://images.unsplash.com/photo-1508215885820-46561a09d664?w=120&auto=format&fit=crop&q=80',
    website: 'https://premierboxingchampions.com',
    fightsCount: 1432,
    description: 'Home to many of the highest rated boxers in the world across Amazon Prime Video.'
  },
  {
    id: 'golden-boy',
    name: 'Golden Boy Promotions',
    logo: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=120&auto=format&fit=crop&q=80',
    website: 'https://goldenboypromotions.com',
    fightsCount: 1120,
    description: 'Founded by ten-time world champion Oscar De La Hoya in Los Angeles, California.'
  },
  {
    id: 'dazn',
    name: 'DAZN Boxing',
    logo: 'https://images.unsplash.com/photo-1517438322307-e67111335449?w=120&auto=format&fit=crop&q=80',
    website: 'https://dazn.com',
    fightsCount: 1281,
    description: 'Global sports streaming entertainment platform and primary global broadcaster for championship boxing.'
  },
  {
    id: 'sky-sports',
    name: 'Sky Sports Boxing',
    logo: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=120&auto=format&fit=crop&q=80',
    website: 'https://skysports.com/boxing',
    fightsCount: 1105,
    description: 'The home of British televised boxing with decades of championship heritage.'
  },
  {
    id: 'mvp',
    name: 'Most Valuable Promotions',
    logo: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=120&auto=format&fit=crop&q=80',
    website: 'https://mostvaluablepromotions.com',
    fightsCount: 320,
    description: 'Founded by Jake Paul and Nakisa Bidarian in 2021, promoting game-changing mega-events.'
  }
];

export const FIGHTERS: Fighter[] = [
  {
    id: 'anthony-joshua',
    name: 'Anthony Joshua',
    nickname: 'AJ',
    aliases: ['AJ', 'Anthony Oluwafemi Olaseni Joshua'],
    image: 'https://images.unsplash.com/photo-1583473848882-f9a5bc7fd2ee?w=500&auto=format&fit=crop&q=80',
    bannerImage: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=1200&auto=format&fit=crop&q=80',
    record: {
      wins: 28,
      losses: 3,
      draws: 0,
      kos: 25,
      koPercentage: 89
    },
    physical: {
      height: "6'6\"",
      heightCm: 198,
      reach: '82.0"',
      reachCm: 208,
      weight: '17 st 6 lb',
      weightKg: 111,
      age: 34,
      division: 'Heavyweight'
    },
    bio: {
      nationality: 'British',
      flag: '🇬🇧',
      born: '15 Oct 1989 (34)',
      hometown: 'Watford, England',
      stance: 'Orthodox',
      turnedPro: 2013,
      trainer: 'Ben Davison',
      manager: '258 MGT',
      promoter: 'Matchroom Boxing'
    },
    stats: {
      punchesLandedPerRound: 58,
      punchesThrownPerRound: 147,
      accuracy: 39,
      jabsLandedPerRound: 18,
      powerLandedPerRound: 39,
      knockdownsPerFight: 5.2
    },
    trends: [
      { fightNumber: 1, opponent: 'Pulev', punchesLanded: 42, punchesThrown: 110, accuracy: 38 },
      { fightNumber: 2, opponent: 'Usyk 1', punchesLanded: 38, punchesThrown: 125, accuracy: 30 },
      { fightNumber: 3, opponent: 'Usyk 2', punchesLanded: 45, punchesThrown: 132, accuracy: 34 },
      { fightNumber: 4, opponent: 'Franklin', punchesLanded: 48, punchesThrown: 140, accuracy: 34 },
      { fightNumber: 5, opponent: 'Helenius', punchesLanded: 52, punchesThrown: 144, accuracy: 36 },
      { fightNumber: 6, opponent: 'Wallin', punchesLanded: 60, punchesThrown: 155, accuracy: 39 },
      { fightNumber: 7, opponent: 'Ngannou', punchesLanded: 65, punchesThrown: 160, accuracy: 41 },
      { fightNumber: 8, opponent: 'Dubois', punchesLanded: 50, punchesThrown: 135, accuracy: 37 }
    ],
    achievements: [
      { title: 'Unified World Heavyweight Champion', organization: 'WBA, IBF, WBO, IBO', year: '2016-2021' },
      { title: 'Olympic Gold Medalist', organization: 'London 2012 Games', year: '2012' },
      { title: 'Commonwealth Heavyweight Champion', organization: 'Commonwealth Boxing Council', year: '2011' },
      { title: 'British Heavyweight Champion', organization: 'BBBofC', year: '2015' },
      { title: 'Multiple Fight of the Year nominations', organization: 'The Ring Magazine', year: '2017' }
    ],
    styleTags: [
      { label: 'Power Puncher', description: 'High knockout percentage and heavy hands.', icon: 'Zap' },
      { label: 'Athleticism', description: 'Excellent footwork and ring generalship for a heavyweight.', icon: 'Activity' },
      { label: 'Composed', description: 'Stays disciplined under pressure in big fights.', icon: 'Shield' },
      { label: 'Jab Heavy', description: 'Uses a strong jab to control range and set up power.', icon: 'Target' }
    ],
    news: [
      { id: 'n1', title: "Joshua: I'm ready for Wilder, it's a massive fight for boxing", time: '2 days ago', source: 'Sky Sports Boxing' },
      { id: 'n2', title: "Ben Davison outlines Joshua's training camp preparations", time: '4 days ago', source: 'Matchroom Media' },
      { id: 'n3', title: "Joshua vs Wilder officially confirmed for December in Riyadh", time: '1 week ago', source: 'Ring Magazine' }
    ],
    isFollowed: true,
    source: {
      provider: 'BBBofC / BoxRec Verified',
      providerId: 'boxrec-659461',
      timestamp: '2026-10-05T12:00:00Z',
      verificationStatus: 'VERIFIED',
      confidence: 'High'
    }
  },
  {
    id: 'deontay-wilder',
    name: 'Deontay Wilder',
    nickname: 'The Bronze Bomber',
    aliases: ['The Bronze Bomber'],
    image: 'https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?w=500&auto=format&fit=crop&q=80',
    record: {
      wins: 43,
      losses: 2,
      draws: 1,
      kos: 42,
      koPercentage: 97
    },
    physical: {
      height: "6'7\"",
      heightCm: 201,
      reach: '83.0"',
      reachCm: 211,
      weight: '15 st 5 lb',
      weightKg: 98,
      age: 38,
      division: 'Heavyweight'
    },
    bio: {
      nationality: 'American',
      flag: '🇺🇸',
      born: '22 Oct 1985 (38)',
      hometown: 'Tuscaloosa, Alabama, USA',
      stance: 'Orthodox',
      turnedPro: 2008,
      trainer: 'Malik Scott',
      manager: 'Shelly Finkel',
      promoter: 'Premier Boxing Champions'
    },
    stats: {
      punchesLandedPerRound: 32,
      punchesThrownPerRound: 98,
      accuracy: 33,
      jabsLandedPerRound: 7,
      powerLandedPerRound: 25,
      knockdownsPerFight: 6.8
    },
    trends: [
      { fightNumber: 1, opponent: 'Fury 2', punchesLanded: 20, punchesThrown: 80, accuracy: 25 },
      { fightNumber: 2, opponent: 'Fury 3', punchesLanded: 35, punchesThrown: 95, accuracy: 36 },
      { fightNumber: 3, opponent: 'Helenius', punchesLanded: 12, punchesThrown: 25, accuracy: 48 },
      { fightNumber: 4, opponent: 'Parker', punchesLanded: 22, punchesThrown: 85, accuracy: 26 },
      { fightNumber: 5, opponent: 'Zhang', punchesLanded: 28, punchesThrown: 90, accuracy: 31 }
    ],
    achievements: [
      { title: 'Former WBC World Heavyweight Champion', organization: 'WBC (10 defences)', year: '2015-2020' },
      { title: 'Olympic Bronze Medalist', organization: 'Beijing 2008 Games', year: '2008' }
    ],
    styleTags: [
      { label: 'Devastating Power', description: 'Arguably the most ferocious one-punch knockout artist in heavyweight history.', icon: 'Zap' },
      { label: 'Long Range Traps', description: 'Sets up trailing right hands from distance.', icon: 'Target' }
    ],
    news: [
      { id: 'w1', title: "Wilder vows explosive return against Joshua in Riyadh blockbuster", time: '3 days ago', source: 'ESPN Ringside' }
    ],
    isFollowed: false,
    source: {
      provider: 'PBC / BoxRec Verified',
      providerId: 'boxrec-468841',
      timestamp: '2026-10-05T12:00:00Z',
      verificationStatus: 'VERIFIED'
    }
  },
  {
    id: 'shakur-stevenson',
    name: 'Shakur Stevenson',
    nickname: 'Sugar',
    aliases: ['Sugar Shakur'],
    image: 'https://images.unsplash.com/photo-1517438322307-e67111335449?w=500&auto=format&fit=crop&q=80',
    record: {
      wins: 22,
      losses: 0,
      draws: 0,
      kos: 10,
      koPercentage: 45
    },
    physical: {
      height: "5'7\"",
      heightCm: 170,
      reach: '68.0"',
      reachCm: 173,
      weight: '9 st 7 lb',
      weightKg: 61.2,
      age: 27,
      division: 'Lightweight'
    },
    bio: {
      nationality: 'American',
      flag: '🇺🇸',
      born: '28 Jun 1997 (27)',
      hometown: 'Newark, New Jersey, USA',
      stance: 'Southpaw',
      turnedPro: 2017,
      trainer: 'Wali Moses',
      manager: 'James Prince',
      promoter: 'Matchroom Boxing'
    },
    stats: {
      punchesLandedPerRound: 46,
      punchesThrownPerRound: 110,
      accuracy: 42,
      jabsLandedPerRound: 16,
      powerLandedPerRound: 30,
      knockdownsPerFight: 0.8
    },
    trends: [
      { fightNumber: 1, opponent: 'Valdez', punchesLanded: 52, punchesThrown: 120, accuracy: 43 },
      { fightNumber: 2, opponent: 'Conceicao', punchesLanded: 48, punchesThrown: 115, accuracy: 41 },
      { fightNumber: 3, opponent: 'Yoshino', punchesLanded: 55, punchesThrown: 124, accuracy: 44 },
      { fightNumber: 4, opponent: 'De Los Santos', punchesLanded: 32, punchesThrown: 88, accuracy: 36 },
      { fightNumber: 5, opponent: 'Harutyunyan', punchesLanded: 62, punchesThrown: 147, accuracy: 42 }
    ],
    achievements: [
      { title: 'WBC World Lightweight Champion', organization: 'WBC', year: '2023-Present' },
      { title: 'Unified WBO & WBC Super Featherweight Champion', organization: 'WBO/WBC', year: '2021-2022' },
      { title: 'WBO Featherweight Champion', organization: 'WBO', year: '2019-2020' },
      { title: 'Olympic Silver Medalist', organization: 'Rio 2016 Games', year: '2016' }
    ],
    styleTags: [
      { label: 'Master Technician', description: 'Elite defensive radar and distance control.', icon: 'Shield' },
      { label: 'Southpaw Precision', description: 'Laser straight left hands and clean check-hooks.', icon: 'Target' }
    ],
    news: [
      { id: 's1', title: "Why Stevenson is in total control through round 6", time: '10 mins ago', source: 'Fight Pulse Live Desk' }
    ],
    isFollowed: true,
    source: {
      provider: 'Compubox / Top Rank / BoxRec',
      providerId: 'boxrec-791784',
      timestamp: '2026-10-05T12:00:00Z',
      verificationStatus: 'VERIFIED'
    }
  },
  {
    id: 'artem-harutyunyan',
    name: 'Artem Harutyunyan',
    nickname: 'The Original',
    aliases: ['The Original'],
    image: 'https://images.unsplash.com/photo-1508215885820-46561a09d664?w=500&auto=format&fit=crop&q=80',
    record: {
      wins: 12,
      losses: 1,
      draws: 0,
      kos: 7,
      koPercentage: 58
    },
    physical: {
      height: "5'7.5\"",
      heightCm: 172,
      reach: '67.0"',
      reachCm: 170,
      weight: '9 st 7 lb',
      weightKg: 61.2,
      age: 33,
      division: 'Lightweight'
    },
    bio: {
      nationality: 'German / Armenian',
      flag: '🇦🇲',
      born: '13 Aug 1990 (33)',
      hometown: 'Hamburg, Germany',
      stance: 'Orthodox',
      turnedPro: 2017,
      trainer: 'Michael Timm',
      manager: 'Universum Box-Promotion',
      promoter: 'Top Rank'
    },
    stats: {
      punchesLandedPerRound: 28,
      punchesThrownPerRound: 89,
      accuracy: 31,
      jabsLandedPerRound: 12,
      powerLandedPerRound: 16,
      knockdownsPerFight: 0.4
    },
    trends: [],
    achievements: [
      { title: 'Olympic Bronze Medalist', organization: 'Rio 2016 Games', year: '2016' },
      { title: 'WBA International Lightweight Champion', organization: 'WBA', year: '2021' }
    ],
    styleTags: [
      { label: 'Aggressive Pressure', description: 'High motor inside fighting and lateral rushes.', icon: 'Activity' }
    ],
    news: [],
    isFollowed: false,
    source: {
      provider: 'Top Rank Verified',
      providerId: 'boxrec-816772',
      timestamp: '2026-10-05T12:00:00Z',
      verificationStatus: 'VERIFIED'
    }
  },
  {
    id: 'ryan-garcia',
    name: 'Ryan Garcia',
    nickname: 'KingRy',
    aliases: ['KingRy', 'Ryan Garcia'],
    image: 'https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?w=500&auto=format&fit=crop&q=80',
    record: {
      wins: 24,
      losses: 1,
      draws: 0,
      kos: 20,
      koPercentage: 80
    },
    physical: {
      height: "5'10\"",
      heightCm: 178,
      reach: '70.5"',
      reachCm: 179,
      weight: '10 st 0 lb',
      weightKg: 63.5,
      age: 25,
      division: 'Super Lightweight'
    },
    bio: {
      nationality: 'American',
      flag: '🇺🇸',
      born: '8 Aug 1998 (25)',
      hometown: 'Victorville, California, USA',
      stance: 'Orthodox',
      turnedPro: 2016,
      trainer: 'Derrick James',
      manager: 'Guadalupe Valencia',
      promoter: 'Golden Boy Promotions'
    },
    stats: {
      punchesLandedPerRound: 6.8,
      punchesThrownPerRound: 15.2,
      accuracy: 44,
      jabsLandedPerRound: 4.2,
      powerLandedPerRound: 62,
      knockdownsPerFight: 0.8
    },
    trends: [],
    achievements: [
      { title: 'WBC Interim Lightweight Champion', organization: 'WBC', year: '2021' }
    ],
    styleTags: [
      { label: 'Lightning Left Hook', description: 'One of the fastest and most explosive counter left hooks in boxing.', icon: 'Zap' }
    ],
    news: [
      { id: 'rg1', title: 'Garcia discusses Haney clash: "I proved everyone wrong"', time: '2 days ago', source: 'DAZN Boxing' }
    ],
    isFollowed: true,
    source: {
      provider: 'NYSAC / BoxRec Verified',
      providerId: 'boxrec-765974',
      timestamp: '2026-10-05T12:00:00Z',
      verificationStatus: 'VERIFIED'
    }
  },
  {
    id: 'devin-haney',
    name: 'Devin Haney',
    nickname: 'The Dream',
    aliases: ['The Dream'],
    image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=500&auto=format&fit=crop&q=80',
    record: {
      wins: 31,
      losses: 0,
      draws: 0,
      kos: 15,
      koPercentage: 48
    },
    physical: {
      height: "5'8\"",
      heightCm: 173,
      reach: '71.0"',
      reachCm: 180,
      weight: '10 st 0 lb',
      weightKg: 63.5,
      age: 25,
      division: 'Super Lightweight'
    },
    bio: {
      nationality: 'American',
      flag: '🇺🇸',
      born: '17 Nov 1998 (25)',
      hometown: 'Henderson, Nevada, USA',
      stance: 'Orthodox',
      turnedPro: 2015,
      trainer: 'Bill Haney',
      manager: 'Bill Haney',
      promoter: 'Matchroom / Top Rank'
    },
    stats: {
      punchesLandedPerRound: 6.1,
      punchesThrownPerRound: 11.8,
      accuracy: 52,
      jabsLandedPerRound: 3.1,
      powerLandedPerRound: 41,
      knockdownsPerFight: 0.4
    },
    trends: [],
    achievements: [
      { title: 'Undisputed World Lightweight Champion', organization: 'WBA, WBC, IBF, WBO', year: '2022-2023' },
      { title: 'WBC World Super Lightweight Champion', organization: 'WBC', year: '2023-Present' }
    ],
    styleTags: [
      { label: 'Masterful Jab', description: 'Textbook pacing, distance management and scoring discipline.', icon: 'Shield' }
    ],
    news: [
      { id: 'dh1', title: 'Haney activates rematch clause, targeting autumn return', time: '3 days ago', source: 'ESPN' }
    ],
    isFollowed: true,
    source: {
      provider: 'NYSAC / BoxRec Verified',
      providerId: 'boxrec-737719',
      timestamp: '2026-10-05T12:00:00Z',
      verificationStatus: 'VERIFIED'
    }
  },
  {
    id: 'jack-catterall',
    name: 'Jack Catterall',
    nickname: 'El Gato',
    aliases: ['El Gato'],
    image: 'https://images.unsplash.com/photo-1599058917212-d750089bc07e?w=500&auto=format&fit=crop&q=80',
    record: {
      wins: 29,
      losses: 1,
      draws: 0,
      kos: 13,
      koPercentage: 43
    },
    physical: {
      height: "5'7\"",
      heightCm: 170,
      reach: '69.0"',
      reachCm: 175,
      weight: '10 st 0 lb',
      weightKg: 63.5,
      age: 30,
      division: 'Super Lightweight'
    },
    bio: {
      nationality: 'British',
      flag: '🇬🇧',
      born: '1 Jul 1993 (30)',
      hometown: 'Chorley, Lancashire, England',
      stance: 'Southpaw',
      turnedPro: 2012,
      trainer: 'Jamie Moore',
      manager: 'Lee Beard',
      promoter: 'Matchroom Boxing'
    },
    stats: {
      punchesLandedPerRound: 42,
      punchesThrownPerRound: 104,
      accuracy: 40,
      jabsLandedPerRound: 14,
      powerLandedPerRound: 28,
      knockdownsPerFight: 0.9
    },
    trends: [],
    achievements: [
      { title: 'British Super Lightweight Champion', organization: 'BBBofC', year: '2015-2018' },
      { title: 'WBO Inter-Continental Champion', organization: 'WBO', year: '2014-2020' }
    ],
    styleTags: [
      { label: 'Crafty Southpaw', description: 'Patient counter-puncher with tight defensive shells.', icon: 'Shield' }
    ],
    news: [
      { id: 'jc1', title: 'Catterall says this is his defining moment against Prograis', time: '2 days ago', source: 'Sky Sports' }
    ],
    isFollowed: true,
    source: {
      provider: 'Matchroom / BBBofC Verified',
      providerId: 'boxrec-625841',
      timestamp: '2026-10-05T12:00:00Z',
      verificationStatus: 'VERIFIED'
    }
  },
  {
    id: 'regis-prograis',
    name: 'Regis Prograis',
    nickname: 'Rougarou',
    aliases: ['Rougarou'],
    image: 'https://images.unsplash.com/photo-1579758629938-03607ccdbaba?w=500&auto=format&fit=crop&q=80',
    record: {
      wins: 29,
      losses: 2,
      draws: 0,
      kos: 24,
      koPercentage: 77
    },
    physical: {
      height: "5'8\"",
      heightCm: 173,
      reach: '67.0"',
      reachCm: 170,
      weight: '10 st 0 lb',
      weightKg: 63.5,
      age: 35,
      division: 'Super Lightweight'
    },
    bio: {
      nationality: 'American',
      flag: '🇺🇸',
      born: '24 Jan 1989 (35)',
      hometown: 'New Orleans, Louisiana, USA',
      stance: 'Southpaw',
      turnedPro: 2012,
      trainer: 'Julian Chua',
      manager: 'Sam Katkovski',
      promoter: 'Matchroom Boxing'
    },
    stats: {
      punchesLandedPerRound: 38,
      punchesThrownPerRound: 112,
      accuracy: 34,
      jabsLandedPerRound: 10,
      powerLandedPerRound: 28,
      knockdownsPerFight: 1.4
    },
    trends: [],
    achievements: [
      { title: 'Two-Time WBC Super Lightweight Champion', organization: 'WBC', year: '2019, 2022-2023' },
      { title: 'WBA World Super Lightweight Champion', organization: 'WBA', year: '2019' }
    ],
    styleTags: [
      { label: 'Heavyweight Puncher', description: 'Hard-hitting body attack with relentless pressure.', icon: 'Zap' }
    ],
    news: [],
    isFollowed: false,
    source: {
      provider: 'BoxRec / Matchroom Verified',
      providerId: 'boxrec-611029',
      timestamp: '2026-10-05T12:00:00Z',
      verificationStatus: 'VERIFIED'
    }
  },
  {
    id: 'daniel-dubois',
    name: 'Daniel Dubois',
    nickname: 'Dynamite',
    aliases: ['Dynamite Dubois'],
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=500&auto=format&fit=crop&q=80',
    record: {
      wins: 20,
      losses: 2,
      draws: 0,
      kos: 19,
      koPercentage: 90
    },
    physical: {
      height: "6'5\"",
      heightCm: 196,
      reach: '78.0"',
      reachCm: 198,
      weight: '17 st 4 lb',
      weightKg: 110,
      age: 26,
      division: 'Heavyweight'
    },
    bio: {
      nationality: 'British',
      flag: '🇬🇧',
      born: '6 Sep 1997 (26)',
      hometown: 'Greenwich, London, England',
      stance: 'Orthodox',
      turnedPro: 2017,
      trainer: 'Don Charles',
      manager: 'Frank Warren',
      promoter: 'Queensberry Promotions'
    },
    stats: {
      punchesLandedPerRound: 48,
      punchesThrownPerRound: 130,
      accuracy: 37,
      jabsLandedPerRound: 19,
      powerLandedPerRound: 29,
      knockdownsPerFight: 2.1
    },
    trends: [],
    achievements: [
      { title: 'IBF World Heavyweight Champion', organization: 'IBF', year: '2024-Present' },
      { title: 'WBA Regular Heavyweight Champion', organization: 'WBA', year: '2022-2023' }
    ],
    styleTags: [
      { label: 'Brutal Power', description: 'Massive right hand punch with heavy piston jab.', icon: 'Zap' }
    ],
    news: [
      { id: 'dd1', title: 'Dubois vs Hrgović: Everything you need to know ahead of clash', time: '3 days ago', source: 'Queensberry Media' }
    ],
    isFollowed: true,
    source: {
      provider: 'Queensberry / BBBofC Verified',
      providerId: 'boxrec-793397',
      timestamp: '2026-10-05T12:00:00Z',
      verificationStatus: 'VERIFIED'
    }
  },
  {
    id: 'filip-hrgovic',
    name: 'Filip Hrgović',
    nickname: 'El Animal',
    aliases: ['El Animal'],
    image: 'https://images.unsplash.com/photo-1517438322307-e67111335449?w=500&auto=format&fit=crop&q=80',
    record: {
      wins: 17,
      losses: 0,
      draws: 0,
      kos: 14,
      koPercentage: 82
    },
    physical: {
      height: "6'6\"",
      heightCm: 198,
      reach: '82.0"',
      reachCm: 208,
      weight: '17 st 6 lb',
      weightKg: 111,
      age: 32,
      division: 'Heavyweight'
    },
    bio: {
      nationality: 'Croatian',
      flag: '🇭🇷',
      born: '4 Jun 1992 (32)',
      hometown: 'Zagreb, Croatia',
      stance: 'Orthodox',
      turnedPro: 2017,
      trainer: 'Ronnie Shields',
      manager: 'Wasserman Boxing',
      promoter: 'Queensberry / Matchroom'
    },
    stats: {
      punchesLandedPerRound: 44,
      punchesThrownPerRound: 122,
      accuracy: 36,
      jabsLandedPerRound: 15,
      powerLandedPerRound: 29,
      knockdownsPerFight: 1.8
    },
    trends: [],
    achievements: [
      { title: 'Olympic Bronze Medalist', organization: 'Rio 2016 Games', year: '2016' },
      { title: 'IBF Mandatory Heavyweight Challenger', organization: 'IBF', year: '2022-2024' }
    ],
    styleTags: [
      { label: 'Punishing Stalker', description: 'Long right cross and relentless forward pressure.', icon: 'Activity' }
    ],
    news: [],
    isFollowed: false,
    source: {
      provider: 'BoxRec / IBF Verified',
      providerId: 'boxrec-809890',
      timestamp: '2026-10-05T12:00:00Z',
      verificationStatus: 'VERIFIED'
    }
  },
  {
    id: 'tyson-fury',
    name: 'Tyson Fury',
    nickname: 'The Gypsy King',
    aliases: ['The Gypsy King'],
    image: 'https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?w=500&auto=format&fit=crop&q=80',
    record: {
      wins: 34,
      losses: 1,
      draws: 1,
      kos: 24,
      koPercentage: 67
    },
    physical: {
      height: "6'9\"",
      heightCm: 206,
      reach: '85.0"',
      reachCm: 216,
      weight: '19 st 0 lb',
      weightKg: 120,
      age: 35,
      division: 'Heavyweight'
    },
    bio: {
      nationality: 'British',
      flag: '🇬🇧',
      born: '12 Aug 1988 (35)',
      hometown: 'Morecambe, Lancashire, England',
      stance: 'Orthodox',
      turnedPro: 2008,
      trainer: 'SugarHill Steward',
      manager: 'Frank Warren',
      promoter: 'Queensberry Promotions'
    },
    stats: {
      punchesLandedPerRound: 49,
      punchesThrownPerRound: 135,
      accuracy: 36,
      jabsLandedPerRound: 20,
      powerLandedPerRound: 29,
      knockdownsPerFight: 1.2
    },
    trends: [],
    achievements: [
      { title: 'Two-Time World Heavyweight Champion', organization: 'WBC / WBA / IBF / WBO', year: '2015, 2020-2024' }
    ],
    styleTags: [
      { label: 'Unorthodox Genius', description: 'Feinting maestro with agility defying his 6ft 9in frame.', icon: 'Activity' }
    ],
    news: [],
    isFollowed: true,
    source: {
      provider: 'Queensberry Verified',
      providerId: 'boxrec-479205',
      timestamp: '2026-10-05T12:00:00Z',
      verificationStatus: 'VERIFIED'
    }
  },
  {
    id: 'katie-taylor',
    name: 'Katie Taylor',
    nickname: 'KT',
    aliases: ['KT'],
    image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=500&auto=format&fit=crop&q=80',
    record: {
      wins: 23,
      losses: 1,
      draws: 0,
      kos: 6,
      koPercentage: 26
    },
    physical: {
      height: "5'5\"",
      heightCm: 165,
      reach: '65.0"',
      reachCm: 165,
      weight: '9 st 12 lb',
      weightKg: 62.5,
      age: 37,
      division: 'Super Lightweight'
    },
    bio: {
      nationality: 'Irish',
      flag: '🇮🇪',
      born: '2 Jul 1986 (37)',
      hometown: 'Bray, County Wicklow, Ireland',
      stance: 'Orthodox',
      turnedPro: 2016,
      trainer: 'Ross Enamait',
      manager: 'Brian Peters',
      promoter: 'Matchroom Boxing'
    },
    stats: {
      punchesLandedPerRound: 52,
      punchesThrownPerRound: 142,
      accuracy: 37,
      jabsLandedPerRound: 18,
      powerLandedPerRound: 34,
      knockdownsPerFight: 0.2
    },
    trends: [],
    achievements: [
      { title: 'Two-Weight Undisputed Champion', organization: 'Lightweight & Super Lightweight', year: '2019-Present' },
      { title: 'Olympic Gold Medalist', organization: 'London 2012 Games', year: '2012' }
    ],
    styleTags: [
      { label: 'Relentless Combinations', description: 'Fast hands, relentless work-rate and warrior heart.', icon: 'Activity' }
    ],
    news: [],
    isFollowed: true,
    source: {
      provider: 'Matchroom / BBBofC Verified',
      providerId: 'boxrec-779836',
      timestamp: '2026-10-05T12:00:00Z',
      verificationStatus: 'VERIFIED'
    }
  },
  {
    id: 'naoya-inoue',
    name: 'Naoya Inoue',
    nickname: 'The Monster',
    aliases: ['The Monster'],
    image: 'https://images.unsplash.com/photo-1599058917212-d750089bc07e?w=500&auto=format&fit=crop&q=80',
    record: {
      wins: 26,
      losses: 0,
      draws: 0,
      kos: 23,
      koPercentage: 88
    },
    physical: {
      height: "5'5\"",
      heightCm: 165,
      reach: '67.5"',
      reachCm: 171,
      weight: '8 st 10 lb',
      weightKg: 55.3,
      age: 31,
      division: 'Super Bantamweight'
    },
    bio: {
      nationality: 'Japanese',
      flag: '🇯🇵',
      born: '10 Apr 1993 (31)',
      hometown: 'Zama, Kanagawa, Japan',
      stance: 'Orthodox',
      turnedPro: 2012,
      trainer: 'Shingo Inoue',
      manager: 'Hideyuki Ohashi',
      promoter: 'Top Rank / Ohashi'
    },
    stats: {
      punchesLandedPerRound: 55,
      punchesThrownPerRound: 125,
      accuracy: 44,
      jabsLandedPerRound: 21,
      powerLandedPerRound: 34,
      knockdownsPerFight: 2.8
    },
    trends: [],
    achievements: [
      { title: 'Two-Weight Undisputed Champion', organization: 'Bantamweight & Super Bantamweight', year: '2022-Present' },
      { title: 'Four-Division World Champion', organization: 'WBA / WBC / IBF / WBO', year: '2014-Present' }
    ],
    styleTags: [
      { label: 'Terrifying Power & Speed', description: 'Pound-for-pound destructive body hooks and lethal precision.', icon: 'Zap' }
    ],
    news: [],
    isFollowed: true,
    source: {
      provider: 'JBC / Top Rank Verified',
      providerId: 'boxrec-628407',
      timestamp: '2026-10-05T12:00:00Z',
      verificationStatus: 'VERIFIED'
    }
  },
  {
    id: 'diego-pacheco',
    name: 'Diego Pacheco',
    nickname: '',
    aliases: [],
    image: 'https://images.unsplash.com/photo-1508215885820-46561a09d664?w=500&auto=format&fit=crop&q=80',
    record: {
      wins: 21,
      losses: 0,
      draws: 0,
      kos: 17,
      koPercentage: 81
    },
    physical: {
      height: "6'4\"",
      heightCm: 193,
      reach: '79.0"',
      reachCm: 201,
      weight: '12 st 0 lb',
      weightKg: 76.2,
      age: 23,
      division: 'Super Middleweight'
    },
    bio: {
      nationality: 'American',
      flag: '🇺🇸',
      born: '8 Mar 2001 (23)',
      hometown: 'Los Angeles, California, USA',
      stance: 'Orthodox',
      turnedPro: 2018,
      trainer: 'Jose Benavidez Sr',
      manager: 'David McWater',
      promoter: 'Matchroom Boxing'
    },
    stats: {
      punchesLandedPerRound: 45,
      punchesThrownPerRound: 115,
      accuracy: 39,
      jabsLandedPerRound: 16,
      powerLandedPerRound: 29,
      knockdownsPerFight: 1.5
    },
    trends: [],
    achievements: [
      { title: 'WBO International Super Middleweight Champion', organization: 'WBO', year: '2023-Present' }
    ],
    styleTags: [
      { label: 'Long Range Sniper', description: 'Towering super middleweight with devastating uppercuts.', icon: 'Target' }
    ],
    news: [],
    isFollowed: false,
    source: {
      provider: 'Matchroom Verified',
      providerId: 'boxrec-852654',
      timestamp: '2026-10-05T12:00:00Z',
      verificationStatus: 'VERIFIED'
    }
  },
  {
    id: 'maciej-sulecki',
    name: 'Maciej Sulecki',
    nickname: 'Striczu',
    aliases: ['Striczu'],
    image: 'https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?w=500&auto=format&fit=crop&q=80',
    record: {
      wins: 32,
      losses: 3,
      draws: 0,
      kos: 12,
      koPercentage: 34
    },
    physical: {
      height: "6'1\"",
      heightCm: 185,
      reach: '72.0"',
      reachCm: 183,
      weight: '12 st 0 lb',
      weightKg: 76.2,
      age: 35,
      division: 'Super Middleweight'
    },
    bio: {
      nationality: 'Polish',
      flag: '🇵🇱',
      born: '2 May 1989 (35)',
      hometown: 'Warsaw, Poland',
      stance: 'Orthodox',
      turnedPro: 2010,
      trainer: 'Piotr Wilczewski',
      manager: 'Andrzej Wasilewski',
      promoter: 'Matchroom / KnockOut'
    },
    stats: {
      punchesLandedPerRound: 32,
      punchesThrownPerRound: 95,
      accuracy: 34,
      jabsLandedPerRound: 11,
      powerLandedPerRound: 21,
      knockdownsPerFight: 0.3
    },
    trends: [],
    achievements: [
      { title: 'Former World Title Challenger', organization: 'WBO Middleweight', year: '2019' }
    ],
    styleTags: [
      { label: 'Tough Veteran', description: 'Experienced European boxer with durable chin.', icon: 'Shield' }
    ],
    news: [],
    isFollowed: false,
    source: {
      provider: 'BoxRec Verified',
      providerId: 'boxrec-541249',
      timestamp: '2026-10-05T12:00:00Z',
      verificationStatus: 'VERIFIED'
    }
  }
];

export const LIVE_FIGHT_STEVENSON_HARUTYUNYAN: Fight = {
  id: 'stevenson-vs-harutyunyan',
  eventId: 'stevenson-harutyunyan-newark',
  fighterA: FIGHTERS.find(f => f.id === 'shakur-stevenson')!,
  fighterB: FIGHTERS.find(f => f.id === 'artem-harutyunyan')!,
  weightClass: 'Lightweight',
  scheduledRounds: 12,
  title: 'WBC LIGHTWEIGHT TITLE',
  status: 'LIVE',
  currentRound: 6,
  roundTimer: '2:15',
  venue: 'Prudential Center',
  location: 'Newark, New Jersey, USA',
  broadcast: 'DAZN / ESPN+',
  date: 'Live Now',
  timeBst: '22:00 BST',
  liveStats: {
    fighterA: {
      totalPunchesThrown: 147,
      totalPunchesLanded: 62,
      accuracy: 42,
      jabsThrown: 58,
      jabsLanded: 16,
      powerThrown: 89,
      powerLanded: 46,
      knockdowns: 0,
      ringControlScore: 78,
      aggressionScore: 68,
      defenceScore: 84
    },
    fighterB: {
      totalPunchesThrown: 89,
      totalPunchesLanded: 28,
      accuracy: 31,
      jabsThrown: 40,
      jabsLanded: 12,
      powerThrown: 49,
      powerLanded: 16,
      knockdowns: 0,
      ringControlScore: 22,
      aggressionScore: 42,
      defenceScore: 56
    },
    currentRoundFighterA: {
      totalPunchesThrown: 24,
      totalPunchesLanded: 11,
      accuracy: 46,
      jabsThrown: 14,
      jabsLanded: 7,
      powerThrown: 10,
      powerLanded: 4,
      knockdowns: 0
    },
    currentRoundFighterB: {
      totalPunchesThrown: 12,
      totalPunchesLanded: 4,
      accuracy: 33,
      jabsThrown: 8,
      jabsLanded: 3,
      powerThrown: 4,
      powerLanded: 1,
      knockdowns: 0
    }
  },
  momentum: {
    fighterAScore: 68,
    fighterBScore: 32,
    history: [
      { round: 1, roundLabel: 'R1', fighterAScore: 54, fighterBScore: 46 },
      { round: 2, roundLabel: 'R2', fighterAScore: 58, fighterBScore: 42 },
      { round: 3, roundLabel: 'R3', fighterAScore: 61, fighterBScore: 39 },
      { round: 4, roundLabel: 'R4', fighterAScore: 64, fighterBScore: 36 },
      { round: 5, roundLabel: 'R5', fighterAScore: 69, fighterBScore: 31 },
      { round: 6, roundLabel: 'R6', fighterAScore: 68, fighterBScore: 32 }
    ],
    explanationTitle: "Why did momentum change?",
    explanationPoints: [
      "Higher jab accuracy (80%)",
      "Increased power punch output",
      "Controlling centre of ring",
      "Harutyunyan's output decreased"
    ],
    harutyunyanExplanation: [
      "Lower punch volume (down 42%)",
      "Back foot for extended period",
      "Defensive posture",
      "Landed only 1 power punch in last 60 seconds"
    ]
  },
  liveOdds: {
    favouriteId: 'shakur-stevenson',
    underdogId: 'artem-harutyunyan',
    fighterAOdds: 1.22,
    fighterBOdds: 4.20,
    fighterAChange: -0.08,
    fighterBChange: +0.62,
    movementHistory: [
      { timestamp: '19:00', label: 'Fight Start', fighterAOdds: 1.35, fighterBOdds: 3.20 },
      { timestamp: '19:15', label: 'R1', fighterAOdds: 1.30, fighterBOdds: 3.40 },
      { timestamp: '19:30', label: 'R2', fighterAOdds: 1.28, fighterBOdds: 3.60 },
      { timestamp: '19:45', label: 'R3', fighterAOdds: 1.25, fighterBOdds: 3.75 },
      { timestamp: '20:00', label: 'R4', fighterAOdds: 1.24, fighterBOdds: 3.90 },
      { timestamp: '20:15', label: 'R5', fighterAOdds: 1.23, fighterBOdds: 4.10 },
      { timestamp: '20:30', label: 'R6', fighterAOdds: 1.22, fighterBOdds: 4.20 }
    ],
    bookmakers: [
      { bookmaker: 'Bet365', homeOdds: 1.22, awayOdds: 4.20, margin: 4.2, movement: 'down', isBestPrice: false },
      { bookmaker: 'William Hill', homeOdds: 1.25, awayOdds: 4.00, margin: 4.5, movement: 'neutral', isBestPrice: false },
      { bookmaker: 'Paddy Power', homeOdds: 1.20, awayOdds: 4.33, margin: 4.8, movement: 'down', isBestPrice: true },
      { bookmaker: 'Unibet', homeOdds: 1.24, awayOdds: 4.10, margin: 4.4, movement: 'neutral', isBestPrice: false },
      { bookmaker: 'Sky Bet', homeOdds: 1.22, awayOdds: 4.20, margin: 4.1, movement: 'down', isBestPrice: false }
    ]
  },
  signals: [
    {
      id: 'sig-1',
      timestamp: '2:15',
      roundTime: 'R6 2:15',
      title: "Stevenson's jab accuracy increasing",
      description: "Landed 8 of last 10 jabs (80%)",
      type: 'jab',
      status: 'Increasing',
      confidence: 'High',
      fighterId: 'shakur-stevenson',
      trend: 'increasing'
    },
    {
      id: 'sig-2',
      timestamp: '1:32',
      roundTime: 'R6 1:32',
      title: "Harutyunyan's output dropping",
      description: "Punch volume down 42% in R6",
      type: 'output',
      status: 'Dropping',
      confidence: 'High',
      fighterId: 'artem-harutyunyan',
      trend: 'decreasing'
    },
    {
      id: 'sig-3',
      timestamp: '1:05',
      roundTime: 'R6 1:05',
      title: "Stevenson controlling centre",
      description: "78% of round spent in centre of ring",
      type: 'control',
      status: 'Stevenson',
      confidence: 'High',
      fighterId: 'shakur-stevenson',
      trend: 'increasing'
    },
    {
      id: 'sig-4',
      timestamp: '0:58',
      roundTime: 'R6 0:58',
      title: "Harutyunyan on the back foot",
      description: "Defensive posture for last 30 seconds",
      type: 'defence',
      status: 'High',
      confidence: 'High',
      fighterId: 'artem-harutyunyan',
      trend: 'decreasing'
    },
    {
      id: 'sig-5',
      timestamp: '0:21',
      roundTime: 'R6 0:21',
      title: "Stevenson's power punches landing",
      description: "3 of last 5 power punches landed",
      type: 'power',
      status: 'Strong',
      confidence: 'Medium',
      fighterId: 'shakur-stevenson',
      trend: 'increasing'
    }
  ],
  keyInsights: [
    {
      title: "Stevenson's jab",
      description: "Landing at 50% in the last 2 rounds.",
      type: 'jab'
    },
    {
      title: "Ring control",
      description: "Stevenson controlling centre ring for 78% of R6.",
      type: 'control'
    },
    {
      title: "Harutyunyan's output",
      description: "Down 32% compared to his first 3 rounds.",
      type: 'output'
    },
    {
      title: "Knockdown risk",
      description: "No knockdowns. Harutyunyan absorbing more clean shots.",
      type: 'pace'
    }
  ],
  shotMap: [
    { id: 'sm1', fighterId: 'shakur-stevenson', round: 6, type: 'jab', target: 'head', landed: true, x: 50, y: 25 },
    { id: 'sm2', fighterId: 'shakur-stevenson', round: 6, type: 'jab', target: 'head', landed: true, x: 54, y: 22 },
    { id: 'sm3', fighterId: 'shakur-stevenson', round: 6, type: 'power', target: 'head', landed: true, x: 44, y: 28 },
    { id: 'sm4', fighterId: 'shakur-stevenson', round: 6, type: 'power', target: 'body', landed: true, x: 48, y: 55 },
    { id: 'sm5', fighterId: 'shakur-stevenson', round: 6, type: 'power', target: 'body', landed: true, x: 52, y: 58 },
    { id: 'sm6', fighterId: 'artem-harutyunyan', round: 6, type: 'jab', target: 'head', landed: true, x: 48, y: 24 },
    { id: 'sm7', fighterId: 'artem-harutyunyan', round: 6, type: 'power', target: 'body', landed: true, x: 50, y: 56 }
  ],
  roundResults: [
    { round: 1, fighterAScore: 10, fighterBScore: 9, winner: 'Stevenson' },
    { round: 2, fighterAScore: 10, fighterBScore: 9, winner: 'Stevenson' },
    { round: 3, fighterAScore: 9, fighterBScore: 10, winner: 'Harutyunyan' },
    { round: 4, fighterAScore: 10, fighterBScore: 9, winner: 'Stevenson' },
    { round: 5, fighterAScore: 10, fighterBScore: 9, winner: 'Stevenson' },
    { round: 6, fighterAScore: 10, fighterBScore: 9, winner: 'Live' }
  ],
  judgesScores: [
    { round: 1, judge1: '10 - 9', judge2: '10 - 9', judge3: '10 - 9', fightPulseScore: '10 - 9' },
    { round: 2, judge1: '10 - 9', judge2: '10 - 9', judge3: '10 - 9', fightPulseScore: '10 - 9' },
    { round: 3, judge1: '9 - 10', judge2: '9 - 10', judge3: '9 - 10', fightPulseScore: '9 - 10' },
    { round: 4, judge1: '10 - 9', judge2: '10 - 9', judge3: '10 - 9', fightPulseScore: '10 - 9' },
    { round: 5, judge1: '10 - 9', judge2: '10 - 9', judge3: '10 - 9', fightPulseScore: '10 - 9' }
  ],
  liveFeed: [
    { id: 'f-1', time: '2:15', text: 'Round 6 in progress — Stevenson controlling the centre of the ring early in the round.', type: 'bell' },
    { id: 'f-2', time: '1:48', text: 'Clean right hand from Stevenson — Stevenson lands a crisp right hand to the head.', type: 'punch' },
    { id: 'f-3', time: '1:32', text: 'Stevenson increases output — Higher punch volume in the last 30 seconds.', type: 'momentum' },
    { id: 'f-4', time: '0:58', text: 'Harutyunyan on the back foot — Stevenson applying consistent pressure.', type: 'punch' },
    { id: 'f-5', time: '0:21', text: 'Good combination from Stevenson — 1-2 lands clean. Harutyunyan covering up.', type: 'punch' }
  ],
  fightPulseScore: 88,
  source: {
    provider: 'Compubox Live / Top Rank Verified',
    providerId: 'cb-live-9921',
    timestamp: '2026-10-05T12:30:00Z',
    verificationStatus: 'VERIFIED',
    confidence: 'High',
    lastUpdatedSecondsAgo: 3
  }
};

export const LIVE_FIGHT_PACHECO_SULECKI: Fight = {
  id: 'pacheco-vs-sulecki',
  eventId: 'pacheco-sulecki-vegas',
  fighterA: FIGHTERS.find(f => f.id === 'diego-pacheco')!,
  fighterB: FIGHTERS.find(f => f.id === 'maciej-sulecki')!,
  weightClass: 'Super Middleweight',
  scheduledRounds: 10,
  title: 'WBO INTERNATIONAL SUPER MIDDLEWEIGHT',
  status: 'LIVE',
  currentRound: 3,
  roundTimer: '1:08',
  venue: 'Caribe Royale Orlando',
  location: 'Orlando, Florida, USA',
  broadcast: 'DAZN',
  date: 'Live Now',
  timeBst: '21:30 BST',
  liveStats: {
    fighterA: {
      totalPunchesThrown: 82,
      totalPunchesLanded: 36,
      accuracy: 44,
      jabsThrown: 38,
      jabsLanded: 14,
      powerThrown: 44,
      powerLanded: 22,
      knockdowns: 0
    },
    fighterB: {
      totalPunchesThrown: 64,
      totalPunchesLanded: 19,
      accuracy: 30,
      jabsThrown: 32,
      jabsLanded: 8,
      powerThrown: 32,
      powerLanded: 11,
      knockdowns: 0
    },
    currentRoundFighterA: {
      totalPunchesThrown: 26,
      totalPunchesLanded: 12,
      accuracy: 46,
      jabsThrown: 12,
      jabsLanded: 5,
      powerThrown: 14,
      powerLanded: 7,
      knockdowns: 0
    },
    currentRoundFighterB: {
      totalPunchesThrown: 18,
      totalPunchesLanded: 5,
      accuracy: 28,
      jabsThrown: 10,
      jabsLanded: 2,
      powerThrown: 8,
      powerLanded: 3,
      knockdowns: 0
    }
  },
  momentum: {
    fighterAScore: 74,
    fighterBScore: 26,
    history: [
      { round: 1, roundLabel: 'R1', fighterAScore: 65, fighterBScore: 35 },
      { round: 2, roundLabel: 'R2', fighterAScore: 71, fighterBScore: 29 },
      { round: 3, roundLabel: 'R3', fighterAScore: 74, fighterBScore: 26 }
    ],
    explanationTitle: "Pacheco Dominating Distance",
    explanationPoints: [
      "Controlling with 79\" reach advantage",
      "Stiff jab pushing Sulecki to the ropes",
      "Landing heavy hooks to the liver"
    ]
  },
  liveOdds: {
    favouriteId: 'diego-pacheco',
    underdogId: 'maciej-sulecki',
    fighterAOdds: 1.36,
    fighterBOdds: 3.10,
    fighterAChange: -0.14,
    fighterBChange: +0.45,
    movementHistory: [
      { timestamp: '19:00', label: 'Fight Start', fighterAOdds: 1.50, fighterBOdds: 2.65 },
      { timestamp: '19:15', label: 'R1', fighterAOdds: 1.44, fighterBOdds: 2.80 },
      { timestamp: '19:30', label: 'R2', fighterAOdds: 1.38, fighterBOdds: 3.00 },
      { timestamp: '19:45', label: 'R3', fighterAOdds: 1.36, fighterBOdds: 3.10 }
    ],
    bookmakers: [
      { bookmaker: 'Bet365', homeOdds: 1.36, awayOdds: 3.10, margin: 4.1 },
      { bookmaker: 'William Hill', homeOdds: 1.35, awayOdds: 3.15, margin: 4.3 },
      { bookmaker: 'Sky Bet', homeOdds: 1.36, awayOdds: 3.05, margin: 4.0 }
    ]
  },
  signals: [],
  keyInsights: [],
  shotMap: [],
  roundResults: [
    { round: 1, fighterAScore: 10, fighterBScore: 9, winner: 'Pacheco' },
    { round: 2, fighterAScore: 10, fighterBScore: 9, winner: 'Pacheco' }
  ],
  judgesScores: [],
  liveFeed: [
    { id: 'pf-1', time: '1:08', text: 'Pacheco lands sweeping left hook behind Sulecki guard.', type: 'punch' }
  ],
  fightPulseScore: 84,
  source: {
    provider: 'Matchroom / DAZN Live Feed',
    providerId: 'dazn-live-7721',
    timestamp: '2026-10-05T12:30:10Z',
    verificationStatus: 'VERIFIED',
    confidence: 'High',
    lastUpdatedSecondsAgo: 5
  }
};

export const UPCOMING_FIGHT_JOSHUA_WILDER: Fight = {
  id: 'joshua-vs-wilder',
  eventId: 'joshua-wilder-riyadh',
  fighterA: FIGHTERS.find(f => f.id === 'anthony-joshua')!,
  fighterB: FIGHTERS.find(f => f.id === 'deontay-wilder')!,
  weightClass: 'Heavyweight',
  scheduledRounds: 12,
  title: 'UNDISPUTED HEAVYWEIGHT ELIMINATOR',
  status: 'NOT_STARTED',
  currentRound: 0,
  roundTimer: '12:00',
  venue: 'Kingdom Arena',
  location: 'Riyadh, Saudi Arabia',
  broadcast: 'DAZN PPV / TNT Sports Box Office',
  date: '21 Dec 2024',
  timeBst: '23:00 BST',
  momentum: {
    fighterAScore: 58,
    fighterBScore: 42,
    history: [],
    explanationTitle: "Pre-Fight Analytical Edge",
    explanationPoints: [
      "Joshua form advantage with 4 consecutive victories under Ben Davison",
      "Wilder retains ultimate one-punch equaliser power (97% KO ratio)"
    ]
  },
  liveOdds: {
    favouriteId: 'anthony-joshua',
    underdogId: 'deontay-wilder',
    fighterAOdds: 1.44,
    fighterBOdds: 3.00,
    fighterAChange: -0.28,
    fighterBChange: +0.48,
    movementHistory: [
      { timestamp: '10 Apr', label: '10 Apr', fighterAOdds: 1.72, fighterBOdds: 2.10 },
      { timestamp: '12 Apr', label: '12 Apr', fighterAOdds: 1.65, fighterBOdds: 2.25 },
      { timestamp: '14 Apr', label: '14 Apr', fighterAOdds: 1.58, fighterBOdds: 2.45 },
      { timestamp: '16 Apr', label: '16 Apr', fighterAOdds: 1.52, fighterBOdds: 2.65 },
      { timestamp: '18 Apr', label: '18 Apr', fighterAOdds: 1.48, fighterBOdds: 2.85 },
      { timestamp: '20 Apr', label: '20 Apr', fighterAOdds: 1.44, fighterBOdds: 3.00 }
    ],
    bookmakers: [
      { bookmaker: 'Bet365', homeOdds: 1.44, awayOdds: 3.00, margin: 4.1 },
      { bookmaker: 'William Hill', homeOdds: 1.45, awayOdds: 2.95, margin: 4.2 },
      { bookmaker: 'Sky Bet', homeOdds: 1.40, awayOdds: 3.25, margin: 4.3, isBestPrice: true },
      { bookmaker: 'Paddy Power', homeOdds: 1.44, awayOdds: 3.00, margin: 4.2 },
      { bookmaker: 'Unibet', homeOdds: 1.42, awayOdds: 3.10, margin: 4.4 }
    ]
  },
  signals: [],
  keyInsights: [
    { title: "Trainer Switch", description: "Joshua refined fundamentals under Ben Davison, scoring stoppage wins over Wallin and Ngannou.", type: 'pace' },
    { title: "Power Threat", description: "Wilder has scored 42 knockouts in 43 wins.", type: 'output' }
  ],
  shotMap: [],
  roundResults: [],
  judgesScores: [],
  liveFeed: [],
  fightPulseScore: 94,
  source: {
    provider: 'Riyadh Season / Matchroom Verified',
    providerId: 'rs-2024-aj-dw',
    timestamp: '2026-10-05T12:00:00Z',
    verificationStatus: 'VERIFIED'
  }
};

export const UPCOMING_FIGHT_GARCIA_HANEY: Fight = {
  id: 'garcia-vs-haney',
  eventId: 'garcia-haney-brooklyn',
  fighterA: FIGHTERS.find(f => f.id === 'ryan-garcia')!,
  fighterB: FIGHTERS.find(f => f.id === 'devin-haney')!,
  weightClass: 'Super Lightweight',
  scheduledRounds: 12,
  title: 'WBC SUPER LIGHTWEIGHT CHAMPIONSHIP',
  status: 'NOT_STARTED',
  currentRound: 0,
  roundTimer: '12:00',
  venue: 'Barclays Center',
  location: 'Brooklyn, New York, USA',
  broadcast: 'DAZN Worldwide',
  date: '20 Apr 2024',
  timeBst: '22:00 BST',
  momentum: {
    fighterAScore: 46,
    fighterBScore: 54,
    history: [],
    explanationTitle: "Fight Pulse Analytical Model",
    explanationPoints: [
      "Haney more consistent in last 5 fights (52% career jab accuracy)",
      "Garcia higher KO rate (80% vs 48%)",
      "Haney stronger ring control and defence metrics",
      "Close reach and size profile"
    ]
  },
  liveOdds: {
    favouriteId: 'devin-haney',
    underdogId: 'ryan-garcia',
    fighterAOdds: 2.10,
    fighterBOdds: 1.72,
    fighterAChange: -0.10,
    fighterBChange: +0.08,
    movementHistory: [
      { timestamp: '20 Mar', label: 'Mar 20', fighterAOdds: 2.45, fighterBOdds: 1.55 },
      { timestamp: '27 Mar', label: 'Mar 27', fighterAOdds: 2.30, fighterBOdds: 1.62 },
      { timestamp: '03 Apr', label: 'Apr 3', fighterAOdds: 2.22, fighterBOdds: 1.68 },
      { timestamp: '10 Apr', label: 'Apr 10', fighterAOdds: 2.15, fighterBOdds: 1.70 },
      { timestamp: '17 Apr', label: 'Apr 17', fighterAOdds: 2.10, fighterBOdds: 1.72 }
    ],
    bookmakers: [
      { bookmaker: 'Bet365', homeOdds: 2.10, awayOdds: 1.72, margin: 4.1 },
      { bookmaker: 'William Hill', homeOdds: 2.00, awayOdds: 1.73, margin: 4.2 },
      { bookmaker: 'Paddy Power', homeOdds: 2.05, awayOdds: 1.75, margin: 4.3 },
      { bookmaker: 'Unibet', homeOdds: 2.12, awayOdds: 1.70, margin: 4.5 },
      { bookmaker: 'Sky Bet', homeOdds: 2.00, awayOdds: 1.73, margin: 4.2 }
    ]
  },
  signals: [],
  keyInsights: [
    { title: "Experience", description: "Haney has handled higher level opposition more consistently.", type: 'control' },
    { title: "Power", description: "Garcia has a significant power advantage with 80% KO rate.", type: 'output' },
    { title: "Defence", description: "Haney defensive metrics are among the best in the division.", type: 'defence' }
  ],
  shotMap: [],
  roundResults: [],
  judgesScores: [],
  liveFeed: [],
  fightPulseScore: 92,
  source: {
    provider: 'Matchroom / NYSAC Verified',
    providerId: 'nysac-gh-2024',
    timestamp: '2026-10-05T12:00:00Z',
    verificationStatus: 'VERIFIED'
  }
};

export const UPCOMING_FIGHT_CATTERALL_PROGRAIS: Fight = {
  id: 'catterall-vs-prograis',
  eventId: 'catterall-prograis-manchester',
  fighterA: FIGHTERS.find(f => f.id === 'jack-catterall')!,
  fighterB: FIGHTERS.find(f => f.id === 'regis-prograis')!,
  weightClass: 'Super Lightweight',
  scheduledRounds: 12,
  title: 'WBO SUPER LIGHTWEIGHT TITLE ELIMINATOR',
  status: 'NOT_STARTED',
  currentRound: 0,
  roundTimer: '12:00',
  venue: 'Co-op Live',
  location: 'Manchester, UK',
  broadcast: 'Live on DAZN Worldwide',
  date: '20 Apr 2024',
  timeBst: '22:00 BST',
  momentum: {
    fighterAScore: 53,
    fighterBScore: 47,
    history: [],
    explanationTitle: "Southpaw Clash",
    explanationPoints: [
      "Catterall holds home advantage at Manchester's brand new Co-op Live arena",
      "Prograis possesses superior championship pedigree and heavy power"
    ]
  },
  liveOdds: {
    favouriteId: 'jack-catterall',
    underdogId: 'regis-prograis',
    fighterAOdds: 1.62,
    fighterBOdds: 2.30,
    fighterAChange: -0.08,
    fighterBChange: +0.12,
    movementHistory: [
      { timestamp: 'Apr 1', label: 'Apr 1', fighterAOdds: 1.80, fighterBOdds: 2.05 },
      { timestamp: 'Apr 8', label: 'Apr 8', fighterAOdds: 1.72, fighterBOdds: 2.15 },
      { timestamp: 'Apr 15', label: 'Apr 15', fighterAOdds: 1.65, fighterBOdds: 2.25 },
      { timestamp: 'Apr 20', label: 'Apr 20', fighterAOdds: 1.62, fighterBOdds: 2.30 }
    ],
    bookmakers: [
      { bookmaker: 'Bet365', homeOdds: 1.90, awayOdds: 1.95, margin: 4.1 },
      { bookmaker: 'William Hill', homeOdds: 1.95, awayOdds: 1.88, margin: 4.2 },
      { bookmaker: 'Paddy Power', homeOdds: 1.88, awayOdds: 1.92, margin: 4.3 },
      { bookmaker: 'Unibet', homeOdds: 1.92, awayOdds: 1.91, margin: 4.4 },
      { bookmaker: 'Sky Bet', homeOdds: 1.91, awayOdds: 1.87, margin: 4.0 },
      { bookmaker: 'Betfred', homeOdds: 1.87, awayOdds: 1.93, margin: 4.2 },
      { bookmaker: 'BoyleSports', homeOdds: 1.93, awayOdds: 1.95, margin: 4.1 }
    ]
  },
  signals: [],
  keyInsights: [],
  shotMap: [],
  roundResults: [],
  judgesScores: [],
  liveFeed: [],
  fightPulseScore: 89,
  source: {
    provider: 'Matchroom / BBBofC Verified',
    providerId: 'mcr-cp-2024',
    timestamp: '2026-10-05T12:00:00Z',
    verificationStatus: 'VERIFIED'
  }
};

export const UPCOMING_FIGHT_DUBOIS_HRGOVIC: Fight = {
  id: 'dubois-vs-hrgovic',
  eventId: 'catterall-prograis-manchester',
  fighterA: FIGHTERS.find(f => f.id === 'daniel-dubois')!,
  fighterB: FIGHTERS.find(f => f.id === 'filip-hrgovic')!,
  weightClass: 'Heavyweight',
  scheduledRounds: 12,
  title: 'IBF INTERIM WORLD HEAVYWEIGHT TITLE',
  status: 'NOT_STARTED',
  currentRound: 0,
  roundTimer: '12:00',
  venue: 'Kingdom Arena / Wembley',
  location: 'Riyadh / London',
  broadcast: 'DAZN / TNT Sports',
  date: '27 Apr 2024',
  timeBst: '20:30 BST',
  momentum: {
    fighterAScore: 48,
    fighterBScore: 52,
    history: [],
    explanationTitle: "Heavyweight Power Collision",
    explanationPoints: []
  },
  liveOdds: {
    favouriteId: 'daniel-dubois',
    underdogId: 'filip-hrgovic',
    fighterAOdds: 1.44,
    fighterBOdds: 2.75,
    fighterAChange: -0.05,
    fighterBChange: +0.10,
    movementHistory: [
      { timestamp: '1 Apr', label: '1 Apr', fighterAOdds: 1.55, fighterBOdds: 2.50 },
      { timestamp: '15 Apr', label: '15 Apr', fighterAOdds: 1.44, fighterBOdds: 2.75 }
    ],
    bookmakers: [
      { bookmaker: 'Bet365', homeOdds: 1.36, awayOdds: 3.30, margin: 4.1 },
      { bookmaker: 'William Hill', homeOdds: 1.33, awayOdds: 3.38, margin: 4.2 }
    ]
  },
  signals: [],
  keyInsights: [],
  shotMap: [],
  roundResults: [],
  judgesScores: [],
  liveFeed: [],
  fightPulseScore: 91,
  source: {
    provider: 'Queensberry Verified',
    providerId: 'qb-dh-2024',
    timestamp: '2026-10-05T12:00:00Z',
    verificationStatus: 'VERIFIED'
  }
};

export const HISTORICAL_FIGHT_GARCIA_HANEY: Fight = {
  id: 'hist-garcia-haney',
  eventId: 'hist-garcia-haney-event',
  fighterA: FIGHTERS.find(f => f.id === 'ryan-garcia')!,
  fighterB: FIGHTERS.find(f => f.id === 'devin-haney')!,
  weightClass: 'Super Lightweight',
  scheduledRounds: 12,
  title: 'WBC SUPER LIGHTWEIGHT SHOWDOWN',
  status: 'FINISHED',
  currentRound: 12,
  roundTimer: '0:00',
  venue: 'Barclays Center',
  location: 'Brooklyn, New York, USA',
  broadcast: 'DAZN',
  date: '20 Apr 2024',
  timeBst: '23:00 BST',
  result: {
    winnerId: 'ryan-garcia',
    method: 'MD',
    round: 12,
    officialScores: '112-112 | 114-110 | 115-109',
    summary: 'Ryan Garcia defeated Devin Haney by majority decision in a contentious fight at the Barclays Center. Garcia dropped Haney in round 7 with a left hook and controlled large portions of the fight with his jab and counter shots. Haney rallied in the championship rounds but fell just short on the scorecards.'
  },
  liveStats: {
    fighterA: {
      totalPunchesThrown: 285,
      totalPunchesLanded: 103,
      accuracy: 36,
      jabsThrown: 95,
      jabsLanded: 8,
      powerThrown: 190,
      powerLanded: 95,
      knockdowns: 3
    },
    fighterB: {
      totalPunchesThrown: 320,
      totalPunchesLanded: 89,
      accuracy: 28,
      jabsThrown: 140,
      jabsLanded: 5,
      powerThrown: 180,
      powerLanded: 84,
      knockdowns: 0
    },
    currentRoundFighterA: { totalPunchesThrown: 0, totalPunchesLanded: 0, accuracy: 0, jabsThrown: 0, jabsLanded: 0, powerThrown: 0, powerLanded: 0, knockdowns: 0 },
    currentRoundFighterB: { totalPunchesThrown: 0, totalPunchesLanded: 0, accuracy: 0, jabsThrown: 0, jabsLanded: 0, powerThrown: 0, powerLanded: 0, knockdowns: 0 }
  },
  momentum: {
    fighterAScore: 81,
    fighterBScore: 74,
    history: [],
    explanationTitle: "Fight Pulse Historical Analysis",
    explanationPoints: [
      "Controlled early rounds with jab and movement",
      "Knockdowns in round 7, 10 and 11 were fight turning moments",
      "Momentum shifted in championship rounds 10-12",
      "Close fight with high output from both fighters"
    ]
  },
  liveOdds: {
    favouriteId: 'devin-haney',
    underdogId: 'ryan-garcia',
    fighterAOdds: 2.10,
    fighterBOdds: 1.72,
    fighterAChange: 0,
    fighterBChange: 0,
    movementHistory: [],
    bookmakers: []
  },
  signals: [],
  keyInsights: [],
  shotMap: [],
  roundResults: [],
  judgesScores: [],
  liveFeed: [],
  fightPulseScore: 81,
  source: {
    provider: 'NYSAC Official Records',
    providerId: 'nysac-official-2024-gh',
    timestamp: '2024-04-21T06:00:00Z',
    verificationStatus: 'VERIFIED'
  }
};

export const RECENT_RESULTS_LIST = [
  {
    date: '20 Apr 2024',
    fight: 'Catterall vs Prograis',
    weightClass: 'Super Lightweight',
    result: 'WIN',
    method: 'UD',
    round: '12/12',
    pulseScore: 78,
    winner: 'Jack Catterall'
  },
  {
    date: '20 Apr 2024',
    fight: 'Dubois vs Hrgović',
    weightClass: 'Heavyweight',
    result: 'WIN',
    method: 'KO',
    round: '8/12',
    pulseScore: 85,
    winner: 'Daniel Dubois'
  },
  {
    date: '20 Apr 2024',
    fight: 'Stevenson vs Zepeda',
    weightClass: 'Lightweight',
    result: 'WIN',
    method: 'UD',
    round: '12/12',
    pulseScore: 72,
    winner: 'Shakur Stevenson'
  },
  {
    date: '20 Apr 2024',
    fight: 'Opetaia vs Zorro',
    weightClass: 'Cruiserweight',
    result: 'WIN',
    method: 'KO',
    round: '4/12',
    pulseScore: 88,
    winner: 'Jai Opetaia'
  },
  {
    date: '20 Apr 2024',
    fight: 'Garcia vs Haney',
    weightClass: 'Super Lightweight',
    result: 'WIN',
    method: 'MD',
    round: '12/12',
    pulseScore: 81,
    winner: 'Ryan Garcia'
  },
  {
    date: '16 Mar 2024',
    fight: 'Joshua vs Ngannou',
    weightClass: 'Heavyweight',
    result: 'WIN',
    method: 'KO',
    round: '2/10',
    pulseScore: 79,
    winner: 'Anthony Joshua'
  },
  {
    date: '8 Mar 2024',
    fight: 'Taylor vs Cameron',
    weightClass: 'Super Lightweight',
    result: 'WIN',
    method: 'SD',
    round: '10/10',
    pulseScore: 76,
    winner: 'Katie Taylor'
  },
  {
    date: '23 Dec 2023',
    fight: 'Nakatani vs Astrolabio',
    weightClass: 'Bantamweight',
    result: 'WIN',
    method: 'TKO',
    round: '1/12',
    pulseScore: 69,
    winner: 'Junto Nakatani'
  },
  {
    date: '23 Dec 2023',
    fight: 'Bivol vs Arthur',
    weightClass: 'Light Heavyweight',
    result: 'WIN',
    method: 'UD',
    round: '12/12',
    pulseScore: 80,
    winner: 'Dmitry Bivol'
  },
  {
    date: '12 Aug 2023',
    fight: 'Crawford vs Spence',
    weightClass: 'Welterweight',
    result: 'WIN',
    method: 'TKO',
    round: '9/12',
    pulseScore: 91,
    winner: 'Terence Crawford'
  }
];

export const EVENTS: BoxingEvent[] = [
  {
    id: 'catterall-prograis-manchester',
    name: 'Catterall vs Prograis',
    subtitle: 'WBO Super Lightweight Title',
    promotion: PROMOTIONS.find(p => p.id === 'matchroom')!,
    date: 'SAT 20 APR 2024',
    doorsTime: 'Doors: 17:00 BST',
    mainCardTime: 'Main Card: 22:00 BST',
    venue: 'Co-op Live',
    location: 'Manchester, UK',
    broadcast: 'Live on DAZN Worldwide',
    status: 'UPCOMING',
    countdownDays: 12,
    countdownHours: 6,
    countdownMins: 24,
    countdownSecs: 18,
    artwork: 'https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?w=1200&auto=format&fit=crop&q=80',
    venueImage: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=600&auto=format&fit=crop&q=80',
    mainFightId: 'catterall-vs-prograis',
    fights: [
      UPCOMING_FIGHT_CATTERALL_PROGRAIS,
      UPCOMING_FIGHT_DUBOIS_HRGOVIC
    ],
    news: [
      { id: 'en1', title: 'Catterall says this is his defining moment against Prograis', time: '2 days ago' },
      { id: 'en2', title: 'Dubois vs Hrgović: Everything you need to know', time: '3 days ago' },
      { id: 'en3', title: 'Full undercard confirmed for Catterall vs Prograis', time: '5 days ago' }
    ],
    source: {
      provider: 'Matchroom Boxing Direct',
      providerId: 'mcr-event-8812',
      timestamp: '2026-10-05T12:00:00Z',
      verificationStatus: 'VERIFIED'
    }
  },
  {
    id: 'dubois-hrgovic-wembley',
    name: 'Dubois vs Hrgović',
    subtitle: 'Queensberry Heavyweight Championship',
    promotion: PROMOTIONS.find(p => p.id === 'queensberry')!,
    date: 'SAT 27 APR 2024',
    doorsTime: '17:30 BST',
    mainCardTime: '21:00 BST',
    venue: 'Wembley Stadium',
    location: 'London, UK',
    broadcast: 'TNT Sports Box Office',
    status: 'UPCOMING',
    countdownDays: 19,
    countdownHours: 8,
    countdownMins: 15,
    countdownSecs: 0,
    artwork: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=1200&auto=format&fit=crop&q=80',
    venueImage: 'https://images.unsplash.com/photo-1508215885820-46561a09d664?w=600&auto=format&fit=crop&q=80',
    mainFightId: 'dubois-vs-hrgovic',
    fights: [UPCOMING_FIGHT_DUBOIS_HRGOVIC],
    news: [],
    source: {
      provider: 'Queensberry Verified',
      providerId: 'qb-event-9941',
      timestamp: '2026-10-05T12:00:00Z',
      verificationStatus: 'VERIFIED'
    }
  },
  {
    id: 'stevenson-zepeda-vegas',
    name: 'Stevenson vs Zepeda',
    subtitle: 'Top Rank Championship Boxing',
    promotion: PROMOTIONS.find(p => p.id === 'top-rank')!,
    date: 'SAT 11 MAY 2024',
    doorsTime: '18:00 PST',
    mainCardTime: '22:00 PST',
    venue: 'T-Mobile Arena',
    location: 'Las Vegas, Nevada, USA',
    broadcast: 'ESPN / ESPN+',
    status: 'UPCOMING',
    countdownDays: 33,
    countdownHours: 14,
    countdownMins: 40,
    countdownSecs: 0,
    artwork: 'https://images.unsplash.com/photo-1579758629938-03607ccdbaba?w=1200&auto=format&fit=crop&q=80',
    venueImage: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&auto=format&fit=crop&q=80',
    mainFightId: 'stevenson-vs-zepeda',
    fights: [],
    news: [],
    source: {
      provider: 'Top Rank Verified',
      providerId: 'tr-event-4401',
      timestamp: '2026-10-05T12:00:00Z',
      verificationStatus: 'VERIFIED'
    }
  },
  {
    id: 'smith-buatsi-riyadh',
    name: 'Smith vs Buatsi 2',
    subtitle: 'BOXXER Light Heavyweight Eliminator',
    promotion: PROMOTIONS.find(p => p.id === 'boxxer')!,
    date: 'SAT 18 MAY 2024',
    doorsTime: '18:00 AST',
    mainCardTime: '22:00 AST',
    venue: 'Kingdom Arena',
    location: 'Riyadh, Saudi Arabia',
    broadcast: 'Sky Sports Boxing / DAZN',
    status: 'UPCOMING',
    countdownDays: 40,
    countdownHours: 4,
    countdownMins: 20,
    countdownSecs: 0,
    artwork: 'https://images.unsplash.com/photo-1599058917212-d750089bc07e?w=1200&auto=format&fit=crop&q=80',
    venueImage: 'https://images.unsplash.com/photo-1517438322307-e67111335449?w=600&auto=format&fit=crop&q=80',
    mainFightId: 'smith-buatsi',
    fights: [],
    news: [],
    source: {
      provider: 'BOXXER / Sky Sports Verified',
      providerId: 'bx-event-7711',
      timestamp: '2026-10-05T12:00:00Z',
      verificationStatus: 'VERIFIED'
    }
  }
];

export const NOTIFICATIONS: AlertNotification[] = [
  {
    id: 'alt-1',
    title: 'Odds Drop Detected',
    category: 'Odds',
    timestamp: '2026-10-05T12:28:00Z',
    timeAgo: '2m ago',
    description: 'Garcia vs Haney: Haney odds shortened from 1.92 → 1.75 (-9%) across major UK bookmakers.',
    isRead: false,
    active: true,
    typeIcon: 'TrendingDown',
    dataRef: { fightId: 'garcia-vs-haney', oddsChange: '-9%' }
  },
  {
    id: 'alt-2',
    title: 'Fight Confirmed',
    category: 'Fight',
    timestamp: '2026-10-05T12:16:00Z',
    timeAgo: '14m ago',
    description: 'Catterall vs Prograis officially announced for 20 Apr 2024 at Co-op Live, Manchester.',
    isRead: false,
    active: true,
    typeIcon: 'Calendar'
  },
  {
    id: 'alt-3',
    title: 'Fight Pulse Signal',
    category: 'Signal',
    timestamp: '2026-10-05T11:58:00Z',
    timeAgo: '32m ago',
    description: 'Stevenson vs Harutyunyan: Strong early momentum for Stevenson with 80% jab accuracy in R6.',
    isRead: false,
    active: true,
    typeIcon: 'Activity'
  },
  {
    id: 'alt-4',
    title: 'News Update',
    category: 'News',
    timestamp: '2026-10-05T11:30:00Z',
    timeAgo: '1h ago',
    description: 'Joshua discusses potential Wilder fight in Riyadh in latest interview with Sky Sports.',
    isRead: true,
    active: true,
    typeIcon: 'FileText'
  },
  {
    id: 'alt-5',
    title: 'Odds Movement',
    category: 'Odds',
    timestamp: '2026-10-05T09:30:00Z',
    timeAgo: '3h ago',
    description: 'Dubois vs Hrgović: Dubois odds drifted from 1.28 → 1.36 (+6%).',
    isRead: true,
    active: true,
    typeIcon: 'TrendingUp'
  }
];

export const PROVIDER_HEALTH_STATUS: ProviderHealth[] = [
  {
    provider: 'Compubox Live Feed',
    service: 'Compubox Stats',
    status: 'HEALTHY',
    latencyMs: 142,
    lastUpdated: '1.2s ago',
    recordsSynced: 12487,
    coverage: '100% of sanctioned championship bouts'
  },
  {
    provider: 'Betfair & Bookmaker Aggregator',
    service: 'Odds Feed',
    status: 'HEALTHY',
    latencyMs: 235,
    lastUpdated: '2.4s ago',
    recordsSynced: 18450,
    coverage: '12 UK/USA licensed bookmakers'
  },
  {
    provider: 'Official Sanctioning Bodies (WBC, WBA, IBF, WBO)',
    service: 'Fighter Records',
    status: 'HEALTHY',
    latencyMs: 310,
    lastUpdated: '12m ago',
    recordsSynced: 3842,
    coverage: 'Global verified championship databases'
  },
  {
    provider: 'Broadcast Telemetry (DAZN, Sky, TNT)',
    service: 'Live Stream',
    status: 'HEALTHY',
    latencyMs: 412,
    lastUpdated: 'Just now',
    recordsSynced: 186,
    coverage: 'Low latency ringside feeds'
  }
];
