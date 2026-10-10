export const profile = {
  name: 'Shaik Jasmine',
  firstName: 'Jasmine',
  email: 'jasminesk410@gmail.com',
  links: {
    linkedin: 'https://www.linkedin.com/in/jasminesk41',
    github: 'https://github.com/Jasu410',
    leetcode: 'https://leetcode.com/u/jasminesk/',
  },
}

export const navItems = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
]

export const stats = [
  { value: 8.28, decimals: 2, label: 'CGPA' },
  { value: 2024, from: 2020, label: 'Graduate' },
  { value: 2, suffix: '+', label: 'Projects' },
  { value: 1, label: 'Internship' },
]

export const skillGroups = [
  {
    id: 'programming',
    label: 'Programming',
    color: '#2f6bff',
    skills: [
      {
        name: 'Java',
        prominent: true,
        description:
          'My primary language — object-oriented design and application logic. The foundation of my Full Stack Java internship and the Railway Ticket Reservation System.',
      },
      {
        name: 'C',
        description:
          'Where I learned to think like a programmer: procedural logic, pointers and memory fundamentals.',
      },
      {
        name: 'SQL',
        description:
          'Structuring tables and writing queries to store and validate data reliably, as in the railway reservation system.',
      },
    ],
  },
  {
    id: 'web',
    label: 'Web',
    color: '#8b7cf6',
    skills: [
      {
        name: 'HTML',
        description: 'Semantic, accessible page structure — used to build web applications during my internship.',
      },
      {
        name: 'CSS',
        description: 'Layouts, responsive design and the visual polish that makes an interface feel considered.',
      },
      {
        name: 'JavaScript',
        description: 'Bringing interactivity and client-side logic to the browser.',
      },
    ],
  },
  {
    id: 'tools',
    label: 'Tools',
    color: '#ff7a85',
    skills: [
      {
        name: 'Git',
        description: 'Version control for tracking changes, branching safely and keeping work organised.',
      },
      {
        name: 'GitHub',
        description: 'Hosting code, collaborating and sharing projects with others.',
      },
      {
        name: 'MS Office',
        description: 'Documentation, reports and presentations that communicate technical work clearly.',
      },
    ],
  },
]

export const experience = {
  role: 'Full Stack Java Intern',
  company: 'Consensus Academy',
  period: 'March 2023 – June 2023',
  months: ['Mar 2023', 'Apr 2023', 'May 2023', 'Jun 2023'],
  points: [
    'Developed web applications using HTML and CSS.',
    'Collaborated with cross-functional teams to improve system functionality and user experience.',
  ],
  tags: ['Java', 'HTML', 'CSS', 'Teamwork'],
}

export const projects = [
  {
    id: 'hrv',
    index: '01',
    title: 'Machine Learning-Based Stress Detection via Heart Rate Variability',
    short: 'Stress Detection via HRV',
    tech: ['Python', 'Machine Learning', 'HRV', '1D CNN'],
    description:
      'Developed a system to detect stress using Heart Rate Variability data and a 1D CNN model.',
    details: ['Data preprocessing', 'Feature extraction', 'Model training', 'Performance evaluation'],
    pipeline: [
      {
        label: 'HRV Data',
        description: 'Heart rate variability signals — the varying time between successive heartbeats.',
      },
      {
        label: 'Preprocessing',
        description: 'Cleaning and preparing the signal, then extracting features the model can learn from.',
      },
      {
        label: '1D CNN',
        description: 'A one-dimensional convolutional network learns patterns across the HRV sequence.',
      },
      {
        label: 'Stress Detection',
        description: 'The trained model classifies stress, and its performance is evaluated.',
      },
    ],
  },
  {
    id: 'railway',
    index: '02',
    title: 'Railway Ticket Reservation System',
    short: 'Railway Reservation',
    tech: ['Java', 'HTML', 'CSS', 'SQL'],
    description:
      'Developed a Java-based railway ticket reservation system with a user-friendly interface.',
    details: [
      'Improved train name visibility and passenger flow accuracy',
      'Improved satisfaction by 20%',
      'Duplicate booking prevention',
      '98% data accuracy',
    ],
    highlights: [
      { value: '20%', label: 'Improved satisfaction' },
      { value: '98%', label: 'Data accuracy' },
    ],
    stations: [
      {
        name: 'Booking',
        description: 'A user-friendly Java interface for reserving railway tickets.',
      },
      {
        name: 'Train Info',
        description: 'Improved train name visibility and passenger flow accuracy — raising satisfaction by 20%.',
      },
      {
        name: 'Validation',
        description: 'Duplicate booking prevention keeps every reservation unique.',
      },
      {
        name: 'Records',
        description: 'SQL-backed passenger records maintained with 98% data accuracy.',
      },
    ],
  },
]

export const education = [
  {
    title: 'B.Tech – Computer Science and Engineering',
    school: 'Geethanjali Institute of Science and Technology, Nellore',
    period: '2020–2024',
    score: 'CGPA 8.28',
    year: '2024',
  },
  {
    title: 'Intermediate',
    school: 'Viswasai Junior College, Nellore',
    period: '2018–2020',
    score: '92%',
    year: '2020',
  },
  {
    title: 'SSC',
    school: 'Sri Raghavendra High School, Dagadarthi',
    period: '2017–2018',
    score: '83%',
    year: '2018',
  },
]

export const languages = [
  { name: 'English', native: 'English' },
  { name: 'Telugu', native: 'తెలుగు' },
  { name: 'Hindi', native: 'हिन्दी' },
]

export const softSkills = ['Time Management', 'Adaptability', 'Problem-Solving', 'Teamwork']
