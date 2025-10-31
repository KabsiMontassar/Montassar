import { Box, useColorMode } from '@chakra-ui/react'

function App() {
  const { colorMode } = useColorMode()



  return (
    <Box bg={colorMode === 'light' ? 'white' : 'gray.800'}>
      App Component
    </Box>
  )
}

export default App
