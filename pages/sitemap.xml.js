//pages/sitemap.xml.js
const EXTERNAL_DATA_URL = 'https://app.enjoyperu.org/wp-json/wp/v2/posts?_embed=true';

function generateSiteMap(posts) {
  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     <!--We manually set the two URLs we know already-->
     <url>
       <loc>https://enjoyperu.org</loc>
     </url>
     <url>
       <loc>https://enjoyperu.org</loc>
     </url>
     <url>
       <loc>https://enjoyperu.org</loc>
     </url>
     ${posts
       .map(({ slug, _embedded, modified }) => {
         return `
       <url>
           <loc>${`https://www.incajungleperu.com/${_embedded["wp:term"][0][0].slug}/${slug}`}</loc>
           <lastmod>${`${modified}`}</lastmod>
       </url>
     `;
       })
       .join('')}
   </urlset>
 `;
}

function SiteMap() {
  // getServerSideProps will do the heavy lifting
}

export async function getServerSideProps({ res }) {
  // We make an API call to gather the URLs for our site
  const request = await fetch(EXTERNAL_DATA_URL);
  const posts = await request.json();

  // We generate the XML sitemap with the posts data
  const sitemap = generateSiteMap(posts);

  res.setHeader('Content-Type', 'text/xml');
  // we send the XML to the browser
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
}

export default SiteMap;