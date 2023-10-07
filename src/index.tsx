import React from 'react';
import {ThemeProvider} from 'styled-components/native';

import theme from '@/utilities/theme';
import Navigation from '@/screens';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Navigation />
    </ThemeProvider>
  );
};

export default App;
