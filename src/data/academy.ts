import { ContactInfo } from '../types';

export const ACADEMY_INFO = {
  name: 'Trincomalee Kingstars Chess Academy',
  tagline: 'Every move shapes the mind. Shaping futures through Chess.',
  motto: 'Empowering young minds through tactical mastery and intellectual discipline.',
  established: '2020',
  location: 'Trincomalee, Eastern Province, Sri Lanka',
  shortBio: 'Trincomalee Kingstars Chess Academy is Eastern Province’s premier chess institution dedicated to nurturing young minds. We provide structured coaching for beginners, intermediate, and advanced players, helping children achieve academic excellence, emotional maturity, and competitive success.',
  
  pillars: [
    {
      title: 'Chess Skills & Tactical Mastery',
      icon: 'Crown',
      description: 'Mastering opening principles, middlegame tactics, endgame techniques, and deep calculation.'
    },
    {
      title: 'Logical Thinking & Strategic Planning',
      icon: 'Brain',
      description: 'Training young minds to evaluate alternatives, foresee consequences, and construct sound plans.'
    },
    {
      title: 'Problem-Solving Skills',
      icon: 'Puzzle',
      description: 'Developing quick pattern recognition, critical analysis, and creative solutions under pressure.'
    },
    {
      title: 'Discipline & Patience',
      icon: 'ShieldCheck',
      description: 'Building focus, patience, impulse control, and respect for opponent and rules of play.'
    },
    {
      title: 'Deep Concentration',
      icon: 'Target',
      description: 'Expanding attention spans, reducing distractions, and sustaining focus during long analytical tasks.'
    },
    {
      title: 'Confidence & Resilience',
      icon: 'Zap',
      description: 'Learning to overcome setbacks, bounce back from mistakes, and take pride in continuous improvement.'
    },
    {
      title: 'Competitive Excellence',
      icon: 'Trophy',
      description: 'Preparing students for school, regional, national, and international chess championships.'
    }
  ],

  programs: [
    {
      level: 'Beginners Level (Pawn & Knight)',
      ageGroup: 'Ages 5 - 10',
      focus: 'Board orientation, piece movements, special rules, simple mates, and chess etiquette.',
      schedule: 'Saturdays & Sundays (09:00 AM - 11:00 AM)'
    },
    {
      level: 'Intermediate Level (Rook & Queen)',
      ageGroup: 'Ages 8 - 14',
      focus: 'Tactical motifs (forks, pins, skewers), pawn structures, king safety, and endgame basics.',
      schedule: 'Saturdays & Sundays (11:30 AM - 01:30 PM)'
    },
    {
      level: 'Advanced & Tournament Squad (Kingstars)',
      ageGroup: 'FIDE Rated & Selected Players',
      focus: 'Opening repertoire preparation, deep calculation, computer analysis, and tournament psychology.',
      schedule: 'Tuesdays & Thursdays (04:30 PM - 06:30 PM)'
    }
  ]
};

export const CONTACT_DETAILS: ContactInfo = {
  phone: '+94 71 511 9204',
  whatsapp: '+94715119204',
  whatsappDisplay: '+94 71 511 9204',
  email: 'info@kingstarschess.lk',
  facebook: 'https://facebook.com/kingstarschess',
  address: 'Trincomalee',
  workingHours: 'Mon - Sun: 8:00 AM - 7:00 PM'
};
