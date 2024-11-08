import './App.css'
import TicketPix from './pagamentos/TicketPix'
import { Box } from '@mui/material'

function App() {

  return (
    <Box display= "flex" 
    width="100vw" 
    height="100vh" 
    bgcolor="#4169E1" 
    justifyContent="center"
    alignItems="center" 
    >
       <TicketPix />
    </ Box>
  )
}

export default App