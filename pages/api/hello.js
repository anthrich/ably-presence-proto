// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import cache from 'memory-cache';

export default (req, res) => {
  const value = cache.get('count');
  let count;

  if(!value) {
    count = 1;
  } else {
    count = parseInt(value)
    count += 1;
  }
  
  cache.put('count', count);
  res.status(200).json({count})
}
