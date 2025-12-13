// Product video data structure with icons
export interface VideoItem {
  src: string;
}

export interface ProductVideoCategory {
  [categoryName: string]: VideoItem[];
}

export interface ProductVideoData {
  categories?: ProductVideoCategory;
  videos?: VideoItem[];
}

export const productVideos: Record<string, ProductVideoData> = {
  'Namkeen': {
    categories: {
      'Batch Fryer': [
        { src: '/product/videos/NAMKIN/VID-20250211-WA0026.mp4' },
        { src: '/product/videos/NAMKIN/VID-20250211-WA0030.mp4' },
        { src: '/product/videos/NAMKIN/VID-20250211-WA0031.mp4' },
        { src: '/product/videos/NAMKIN/VID-20250211-WA0032.mp4' },
        { src: '/product/videos/NAMKIN/VID-20250211-WA0034.mp4' },
        { src: '/product/videos/NAMKIN/VID-20250211-WA0035.mp4' },
        { src: '/product/videos/NAMKIN/VID-20250211-WA0038.mp4' },
        { src: '/product/videos/NAMKIN/VID-20250211-WA0040.mp4' },
        { src: '/product/videos/NAMKIN/VID-20250211-WA0045.mp4' },
        { src: '/product/videos/NAMKIN/VID-20250211-WA0049.mp4' }
      ],
      'Continuous Fryer': [
        { src: '/product/videos/CANTINUS NAMKIN/VID-20250211-WA0028.mp4' },
        { src: '/product/videos/CANTINUS NAMKIN/VID-20250211-WA0046.mp4' },
        { src: '/product/videos/CANTINUS NAMKIN/VID-20250211-WA0047.mp4' }
      ]
    }
  },
  'Peanut': {
    categories: {
      'Batch Roaster': [
        { src: '/product/videos/SING BATCH ROSTAR/VID-20250212-WA0001.mp4' },
        { src: '/product/videos/SING BATCH ROSTAR/VID-20250212-WA0003.mp4' },
        { src: '/product/videos/SING BATCH ROSTAR/VID-20250212-WA0004.mp4' },
        { src: '/product/videos/SING BATCH ROSTAR/VID-20250212-WA0005.mp4' },
        { src: '/product/videos/SING BATCH ROSTAR/VID-20250212-WA0006.mp4' }
      ],
      'Continuous Roaster': [
        { src: '/product/videos/SING CONTINUS ROSTAR/VID-20250212-WA0007.mp4' },
        { src: '/product/videos/SING CONTINUS ROSTAR/VID-20250212-WA0009.mp4' },
        { src: '/product/videos/SING CONTINUS ROSTAR/VID-20250212-WA0010.mp4' },
        { src: '/product/videos/SING CONTINUS ROSTAR/VID-20250212-WA0011.mp4' },
        { src: '/product/videos/SING CONTINUS ROSTAR/VID-20250212-WA0012.mp4' },
        { src: '/product/videos/SING CONTINUS ROSTAR/VID-20250212-WA0013.mp4' }
      ],
      'Bhathhi': [
        { src: '/product/videos/SING BHATHI/VID-20250211-WA0041.mp4' },
        { src: '/product/videos/SING BHATHI/VID-20250211-WA0042.mp4' },
        { src: '/product/videos/SING BHATHI/VID-20250211-WA0043.mp4' },
        { src: '/product/videos/SING BHATHI/VID-20250211-WA0044.mp4' },
        { src: '/product/videos/SING BHATHI/VID-20250212-WA0002.mp4' }
      ]
    }
  },
  'Chana': {
    videos: [
      { src: '/product/videos/CHANA ROSTER/VID-20250212-WA0014.mp4' },
      { src: '/product/videos/CHANA ROSTER/VID-20250212-WA0015.mp4' },
      { src: '/product/videos/CHANA ROSTER/VID-20250212-WA0016.mp4' },
      { src: '/product/videos/CHANA ROSTER/VID-20250212-WA0017.mp4' },
      { src: '/product/videos/CHANA ROSTER/VID-20250212-WA0018.mp4' },
      { src: '/product/videos/CHANA ROSTER/VID-20250212-WA0019.mp4' },
      { src: '/product/videos/CHANA ROSTER/VID-20250212-WA0020.mp4' },
      { src: '/product/videos/CHANA ROSTER/VID-20250212-WA0021.mp4' }
    ]
  },
  'Fryms': {
    videos: [
      { src: '/product/videos/friyams/VID-20250211-WA0033.mp4' },
      { src: '/product/videos/friyams/VID-20250211-WA0050.mp4' },
      { src: '/product/videos/friyams/VID-20250211-WA0052.mp4' },
      { src: '/product/videos/friyams/VID-20250211-WA0053.mp4' }
    ]
  },
  'Chikki': {
    videos: [
      { src: '/product/videos/CHIKI/VID-20250211-WA0004.mp4' },
      { src: '/product/videos/CHIKI/VID-20250211-WA0010.mp4' },
      { src: '/product/videos/CHIKI/VID-20250211-WA0011.mp4' },
      { src: '/product/videos/CHIKI/VID-20250211-WA0012.mp4' },
      { src: '/product/videos/CHIKI/VID-20250211-WA0013.mp4' },
      { src: '/product/videos/CHIKI/VID-20250211-WA0014.mp4' },
      { src: '/product/videos/CHIKI/VID-20250211-WA0015.mp4' }
    ]
  },
  'Banana Chips': {
    videos: [
      { src: '/product/videos/kela wafer/VID-20250211-WA0021.mp4' },
      { src: '/product/videos/kela wafer/VID-20250211-WA0022.mp4' },
      { src: '/product/videos/kela wafer/VID-20250211-WA0023.mp4' },
      { src: '/product/videos/kela wafer/VID-20250211-WA0024.mp4' },
      { src: '/product/videos/kela wafer/VID-20250211-WA0025.mp4' },
      { src: '/product/videos/kela wafer/VID-20250211-WA0051.mp4' }
    ]
  },
  'Papad': {
    videos: [
      { src: '/product/videos/PAPAD/VID-20250211-WA0016.mp4' },
      { src: '/product/videos/PAPAD/VID-20250211-WA0017.mp4' },
      { src: '/product/videos/PAPAD/VID-20250211-WA0019.mp4' },
      { src: '/product/videos/PAPAD/VID-20250211-WA0020.mp4' }
    ]
  },
  'Milk': {
    categories: {
      'Milk Processing': [
        { src: '/product/videos/milk process/milk.mp4' }
      ],
      'Milk Khoya Machine': [
        { src: '/product/videos/milk - khoya machine/VID-20250401-WA0001.mp4' },
        { src: '/product/videos/milk - khoya machine/VID-20250401-WA0002.mp4' },
        { src: '/product/videos/milk - khoya machine/VID-20250401-WA0003.mp4' }
      ]
    }
  },
  'Maida Items': {
    categories: {
      'Panipuri': [
        { src: '/product/videos/panipuri/VID-20250404-WA0005.mp4' }
      ],
      'Menda Puri': [
        { src: '/product/videos/MENDA PURI/VID-20250211-WA0027.mp4' },
        { src: '/product/videos/MENDA PURI/VID-20250211-WA0036.mp4' },
        { src: '/product/videos/MENDA PURI/VID-20250211-WA0037.mp4' },
        { src: '/product/videos/MENDA PURI/VID-20250211-WA0039.mp4' },
        { src: '/product/videos/MENDA PURI/VID-20250211-WA0048.mp4' },
        { src: '/product/videos/CHAKKRI/VID-20250211-WA0029.mp4' }
      ]
    }
  },
  'Murmura': {
    videos: [
      { src: '/product/videos/murmura/VID-20250329-WA0000.mp4' }
    ]
  },
  'Steam Boiler': {
    videos: [
      { src: '/product/videos/STEM BOILER/VID-20250211-WA0001.mp4' },
      { src: '/product/videos/STEM BOILER/VID-20250211-WA0002.mp4' },
      { src: '/product/videos/STEM BOILER/VID-20250211-WA0003.mp4' },
      { src: '/product/videos/STEM BOILER/VID-20250212-WA0000.mp4' }
    ]
  },
  'Hot Water System': {
    videos: [
      { src: '/product/videos/HOT WATER/VID-20250212-WA0022.mp4' },
      { src: '/product/videos/HOT WATER/VID-20250212-WA0023.mp4' },
      { src: '/product/videos/HOT WATER/VID-20250212-WA0024.mp4' },
      { src: '/product/videos/HOT WATER/VID-20250212-WA0025.mp4' },
      { src: '/product/videos/HOT WATER/VID-20250212-WA0026.mp4' }
    ]
  },
  'Aluminium': {
    videos: [
      { src: '/product/videos/Aluminium/VID-20250211-WA0005.mp4' },
      { src: '/product/videos/Aluminium/VID-20250211-WA0006.mp4' },
      { src: '/product/videos/Aluminium/VID-20250211-WA0007.mp4' },
      { src: '/product/videos/Aluminium/VID-20250211-WA0008.mp4' },
      { src: '/product/videos/Aluminium/VID-20250211-WA0009.mp4' },
      { src: '/product/videos/Aluminium/VID-20250414-WA0012.mp4' }
    ]
  },
  'Cello Tape': {
    videos: [
      { src: '/product/videos/CELO TEP/VID-20250211-WA0018.mp4' }
    ]
  }
};

// Product order matching the website sequence
export const productOrder = [
  'Namkeen',
  'Peanut',
  'Chana',
  'Fryms',
  'Chikki',
  'Banana Chips',
  'Papad',
  'Milk',
  'Maida Items',
  'Murmura',
  'Steam Boiler',
  'Hot Water System',
  'Aluminium',
  'Cello Tape'
];

