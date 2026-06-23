export interface PersonalInfo {
  fullName: string;
  jobTitle: string;
  photo?: string; // Base64 image string
  email: string;
  phone: string;
  location: string;
  website: string;
  linkedin: string;
  summary: string;
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface Education {
  id: string;
  university: string;
  degree: string;
  startDate: string;
  endDate: string;
}

export interface Skill {
  id: string;
  name: string;
}

export interface Language {
  id: string;
  name: string;
  level: string; // e.g. A1, B2, C1, Native
}

export interface Certificate {
  id: string;
  name: string;
  issuer: string;
  date: string;
}

export interface CustomSection {
  id: string;
  title: string;
  content: string;
}

export interface CvData {
  personal: PersonalInfo;
  experience: Experience[];
  education: Education[];
  skills: Skill[];
  languages: Language[];
  certificates: Certificate[];
  customSections: CustomSection[];
  template: string;
  colorPreset: string;
  font: string;
  spacing: 'small' | 'medium' | 'large';
  margin: 'small' | 'medium' | 'large';
}

export interface Template {
  id: string;
  name: string;
}
