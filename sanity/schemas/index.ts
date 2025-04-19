import publicationCategory from "./publication-category";
import articleCategory from "./article-category";
import article from "./article";
import cases from "./cases";
import publication from "./publication";
import blockContent from "./blockContent";
import services from "./services";
import whyus from "./whyus";
import member from "./member";
import faqs from "./faqs";
import career from "./career";
import trainings from "./trainings";
import testimonial from "./testimonial";

const documents = [testimonial, publicationCategory, publication, articleCategory, article, blockContent, services, cases, faqs, whyus, member, career, trainings];

export const schemaTypes = [...documents];
