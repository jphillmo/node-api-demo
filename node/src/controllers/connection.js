export const getAPI = (req, res) => {
  console.log('GET - client is testing connection to API')
  console.log('Sending response back to client...')
  return res.status(200).send('Connected to the API')
}