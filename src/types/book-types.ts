export interface BookSearchResults {
  numFound: number;
  start: number;
  numFoundExact: boolean;
  docs: Book[];
  num_found: number;
  q: string;
  offset: number;
}

export interface Book {
  key: string;
  title: string;
  cover_i?: number;
  cover_edition_key?: string;
  author_name?: string[];
  first_publish_year?: number;
  publisher?: string[];
  isbn?: string[];
  language?: string[];
  subject?: string[];
  ebook_access?: string;
  ebook_count_i?: number;
  edition_count?: number;
  publish_year?: number[];
  has_fulltext?: boolean;
  type?: string;
  id_amazon?: string[];
  id_goodreads?: string[];
  id_librarything?: string[];
  seed?: string[];
}

export interface BookDetails {
  key: string;
  title: string;
  description?: string | { value: string; type?: string };
  covers?: number[];
  subjects?: string[];
  subject_places?: string[];
  subject_times?: string[];
  subject_people?: string[];
  authors?: { author: { key: string } }[];
  first_publish_date?: string;
  excerpts?: { excerpt: string; comment?: string }[];
  links?: { url: string; title: string }[];
}

export interface Author {
  key: string;
  name: string;
  birth_date?: string;
  death_date?: string;
  bio?: string | { value: string; type?: string };
  photos?: number[];
  wikipedia?: string;
  alternate_names?: string[];
}
