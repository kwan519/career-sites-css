interface IImage {
  url: string;
  altText?: string;
}

interface ISearchCriteria {
  fieldName: string;
  fieldValue: string;
}

interface IInfo {
  html: string;
  placeholder: string;
}

interface Ilink {
  url: string;
  text: string;
}
interface IColumn {
  type: string;
  html: string;
  image?: IImage;
  backgroundColor?: string;
  backgroundImage?: IImage;
  videoUrl?: string;
  buttonLink?: Ilink;
}
interface ISection {
  isReadOnly: boolean;
  backgroundColor?: string; 
  backgroundImage?: IImage;
  columns: IColumn[];
  header: IColumn;
  type: string;
  fullWidth: boolean;
}
interface IPage {
  name: string;
  sections: ISection[];
}

interface ISocialMedia {
  facebook: {
    link: string;
  };
  youtube: {
    link: string;
  };
  instagram: {
    link: string;
  };
  twitter: {
    link: string;
  };
  linkedin: {
    link: string;
  };
}
interface ITheme {
  backgroundImage: any;
  font: string;
  color: string;
  buttonColor: string;
  logo: {
    url: string;
    altText: string;
  } | null;
  logoPosition: string;
  headerFont: string;
  headerColor: string;
  headerBackgroundColor: string;
  footerFont: string;
  footerColor: string;
  footerBackgroundColor: string;
}
interface SiteInterface {
  owner: {
    Id: string;
    Type: string;
  };
  domain: string;
  images: IImage[];
  isLive: boolean;
  jobSearchCriteria: ISearchCriteria[];
  publishState: string;

  settings: {
    homepageUrl?: string;
    name: string;
    hideFooter: boolean;
    excludeFromSiteMap: boolean;
  };
  smsKeyword: string;
  contactInfo: {
    phoneInfo: IInfo;
    emailInfo: IInfo;
  };
  footer: {
    sections: ISection[];
  };
  id: string;
  menu: {
    links: Ilink[];
  };
  navigation: {
    name: string;
    page: string;
  }[];
  scripts: {
    name: string;
    attribute: string;
    source: string;
  }[];
  pages: IPage[];
  siteIntro: {
    backgroundColor?: string;
    backgroundImage: IImage;
    html: string;
  };
  socialMedia: ISocialMedia;
  theme: ITheme;
}


// Search Interface
interface FilterInterface  { value: string; label: string }
interface JobInterface {
  jobId: string;
  name: string;
  branch: BranchType;
  category: string;
  type: JobType | string;
category: string;
  shift: ShiftType | string;
  hours: HourType | string;
  postedDate: string; 
  expireDate: string;
  pay: string;
payType: string;
  detailHTML?: string ;
  shortDescriptionHTML?: string ;
fullLocation?: string;
shortLocation?: string;
shortDetail?: string;
}