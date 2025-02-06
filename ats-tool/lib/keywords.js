export async function getKeywords() {
  // From actual job postings (updated weekly)
  return await fetch('https://ats-keywords.s3.eu-west-1.amazonaws.com/top-500-tech.json')
    .then(res => res.json());
}