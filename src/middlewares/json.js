export const getBody = async (req, res) => {
  const buffers = [];
  for await (const chunck of req) {
    buffers.push(chunck);
  }

  const buffersString = Buffer.concat(buffers).toString();
  try {
    req.body = JSON.parse(buffersString);
  } catch (error) {
    req.body = null;
  }

  res.setHeader('Content-type', 'application/json');
};
