import React from 'react';
import {ThemeProvider} from 'styled-components/native';

import theme from '@/utilities/theme';
import Navigation from '@/screens';
import AuthContextProvider from '@/components/AuthContextProvider';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <AuthContextProvider>
        <Navigation />
      </AuthContextProvider>
    </ThemeProvider>
  );
};

export default App;
