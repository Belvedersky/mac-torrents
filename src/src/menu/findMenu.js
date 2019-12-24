import { prompt } from 'inquirer';

export default async () => {
  const action = await prompt([
    {
      type: 'input',
      name: 'search',
      message: 'Find: ',
    }]);
  return action.search;
};
