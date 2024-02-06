export const scrollX = `
&::-webkit-scrollbar {
    height: 5px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #3498db;
    border-radius: 5px;
  }

  &::-webkit-scrollbar-track {
    background-color: #ecf0f1;
    border-radius: 5px;
  }

  &:hover {
    &::-webkit-scrollbar-thumb {
      background-color: #2980b9;
    }

    &::-webkit-scrollbar-track {
      background-color: #dcdde1;
    }
  }
`;

export const scrollY = `
    &::-webkit-scrollbar {
        width: 5px;
      }
    
      &::-webkit-scrollbar-thumb {
        background-color: #3498db;
        border-radius: 5px;
      }
    
      &::-webkit-scrollbar-track {
        background-color: #ecf0f1;
        border-radius: 5px;
      }
    
      &:hover {
        &::-webkit-scrollbar-thumb {
          background-color: #2980b9;
        }
    
        &::-webkit-scrollbar-track {
          background-color: #dcdde1;
        }
      }
`;