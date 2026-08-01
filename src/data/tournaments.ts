import { Tournament } from '../types';

export const ACADEMY_TOURNAMENTS: Tournament[] = [
  {
    id: 'tourney_1',
    title: 'Kingstars Youth Blitz Championship 2026',
    date: 'August 15, 2026',
    time: '09:00 AM - 04:00 PM',
    location: 'Kingstars Indoor Arena, Central Road, Trincomalee',
    category: 'Under 10, Under 14, Under 18 & Open Category',
    format: '7 Rounds Swiss System (FIDE Rated Rules)',
    timeControl: '5 mins + 3 secs increment per move',
    entryFee: 'LKR 1,000 / Free for Academy Students',
    prizes: 'Trophies, Gold/Silver/Bronze Medals, Cash Prizes & Certificates',
    status: 'Registration Open',
    description: 'Annual flagship youth blitz tournament bringing together the top scholastic chess players in Eastern Province.',
    whatsappContact: '94771234567'
  },
  {
    id: 'tourney_2',
    title: 'Trincomalee Open Rapid Chess Classic',
    date: 'September 20, 2026',
    time: '08:30 AM - 05:30 PM',
    location: 'Trincomalee Town Hall Auditorium, Trincomalee',
    category: 'Scholastic & Open Rated Divisions',
    format: '6 Rounds Swiss System',
    timeControl: '15 mins + 10 secs increment per move',
    entryFee: 'LKR 1,500',
    prizes: 'Total Prize Fund LKR 100,000 + Champion Trophies',
    status: 'Upcoming',
    description: 'Premier regional rapid tournament open to players of all ages and rating levels.',
    whatsappContact: '94771234567'
  },
  {
    id: 'tourney_3',
    title: 'Kingstars Beginners & Novice Cup',
    date: 'October 10, 2026',
    time: '10:00 AM - 02:00 PM',
    location: 'Kingstars Training Center, Trincomalee',
    category: 'Novice & First-Time Tournament Players',
    format: '5 Rounds Swiss System',
    timeControl: '10 mins per player',
    entryFee: 'LKR 500',
    prizes: 'Participation Medals for All Children + Top 5 Trophies',
    status: 'Upcoming',
    description: 'Designed specifically to give new academy students friendly tournament experience and build confidence.',
    whatsappContact: '94771234567'
  }
];
