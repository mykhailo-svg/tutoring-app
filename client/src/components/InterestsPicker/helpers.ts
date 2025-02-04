import { capitalize } from 'lodash';

const INTERESTS_TRANSLATIONS: Record<string, string> = {
  // Sports & Fitness
  RUNNING: 'Running',
  TRAINING: 'Training',
  VOLLEYBALL: 'Volleyball',
  CYCLING: 'Cycling',
  CHESS: 'Chess',
  MARTIAL_ARTS: 'Martial Arts',
  BASKETBALL: 'Basketball',
  FOOTBALL: 'Football',
  HOCKEY: 'Hockey',
  SWIMMING: 'Swimming',
  DIVING: 'Diving',
  EXTREME_SPORTS: 'Extreme Sports',
  FORMULA_1: 'Formula 1',
  MEDITATION: 'Meditation',
  YOGA: 'Yoga',
  ROCK_CLIMBING: 'Rock Climbing',
  TENNIS: 'Tennis',
  TABLE_TENNIS: 'Table Tennis',
  DANCE_FITNESS: 'Dance Fitness',
  CROSSFIT: 'CrossFit',
  PADDLEBOARDING: 'Paddleboarding',
  SKIING_SNOWBOARDING: 'Skiing/Snowboarding',
  PARKOUR: 'Parkour',
  NUTRITION: 'Nutrition',

  // Entertainment & Leisure
  MOVIES_TV: 'Movies & TV',
  THEATER: 'Theater',
  FOOD: 'Food',
  MUSEUMS: 'Museums',
  CONCERTS: 'Concerts',
  SHOPPING: 'Shopping',
  GAMES: 'Games',
  BOARD_GAMES: 'Board Games',
  TRAVEL: 'Travel',
  HIKING: 'Hiking',
  HUMOR: 'Humor',
  BUSINESS: 'Business',
  FINANCE: 'Finance',
  MANAGEMENT: 'Management',
  MUSIC: 'Music',
  ART_GALLERIES: 'Art Galleries',
  ANIME: 'Anime',
  QUIZZES_PUZZLES: 'Quizzes & Puzzles',

  // Education & Hobbies
  SPACE: 'Space',
  HISTORY: 'History',
  PETS: 'Pets',
  DANCING: 'Dancing',
  PHOTOGRAPHY: 'Photography',
  SINGING: 'Singing',
  ART: 'Art',
  CARS: 'Cars',
  MOTORCYCLES: 'Motorcycles',
  COOKING: 'Cooking',
  ARCHITECTURE: 'Architecture',
  LITERATURE: 'Literature',
  SCIENCE: 'Science',
  PSYCHOLOGY: 'Psychology',
  ECOLOGY: 'Ecology',
  INNOVATION: 'Innovation',
  FASHION: 'Fashion',
  POLITICS: 'Politics',
  WRITING: 'Writing',
  DESIGN: 'Design',
  RELIGION: 'Religion',
  PHILOSOPHY: 'Philosophy',
  MEDICINE: 'Medicine',
  CELEBRITIES: 'Celebrities',
  VOLUNTEERING: 'Volunteering',
  NEWS: 'News',
  PERSONAL_GROWTH: 'Personal Growth',
  GARDENING: 'Gardening',
  DIY_PROJECTS: 'DIY Projects',
  PODCASTS: 'Podcasts',
  ASTRONOMY: 'Astronomy',
  POETRY: 'Poetry',
  GENETICS: 'Genetics',
  WORLD_CULTURES: 'World Cultures',
  ROBOTICS: 'Robotics',
  AI: 'Artificial Intelligence',
  IT_PROGRAMMING: 'IT & Programming',
  FISHING: 'Fishing',
};

export const translateInterest = (interest: string) => {
  return INTERESTS_TRANSLATIONS[interest] ?? interest;
};

export const getInterestIcon = (interest: string) => {
  const formattedInterest = interest
    .toLowerCase()
    .split('_')
    .map((name) => capitalize(name))
    .join('');

  return `/interests/interest${formattedInterest}.png`;
};
