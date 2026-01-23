import prompts from 'prompts';
import kleur from 'kleur';

export async function getProjectConfig() {
  // 1. INFO
  const basics = await prompts([
    {
      type: 'text',
      name: 'projectName',
      message: 'Name your Shadow extraction:',
      initial: 'shadow-app'
    },
    {
      type: 'select',
      name: 'domain',
      message: 'Choose your domain:',
      choices: [
        { title: '📱 Mobile Application', value: 'mobile' },
        { title: '🕸️ Web Application', value: 'web' },
        { title: '🛠️ Custom Application', value: 'custom' }
      ]
    }
  ]);
  
  if (!basics.projectName) {
      console.log(kleur.red('❌ Cancelled.'));
      process.exit(0);
  }

  let config = { ...basics };

  // 2. STACK SELECTION
  if (config.domain === 'mobile') {
      const mobileStats = await prompts([
          {
              type: 'select',
              name: 'stack',
              message: 'Select Mobile Framework:',
              choices: [
                { title: 'Flutter (Dart)', value: 'flutter' },
                { title: 'React Native (Expo)', value: 'expo' }
              ]
          },
          {
              type: 'toggle',
              name: 'needsBackend',
              message: 'Do you need a dedicated Backend?',
              initial: true,
              active: 'YES',
              inactive: 'NO'
          }
      ]);
      config.stack = mobileStats.stack;
      config.needsBackend = mobileStats.needsBackend;

      if (config.needsBackend) {
          const backendRes = await prompts({
              type: 'select',
              name: 'backendStack',
              message: 'Select Backend Stack:',
              choices: [
                  { title: 'Node.js (Express)', value: 'node_express' },
                  { title: 'Python (FastAPI)', value: 'python_fastapi' }
              ]
          });
          config.backendStack = backendRes.backendStack;
      }
  } else if (config.domain === 'web') {
     const webRes = await prompts({
        type: 'select',
        name: 'stack',
        message: 'Select Web Stack:',
        choices: [
            { title: 'Next.js (Monorepo)', value: 'next_node' },
            { title: 'React (Vite)', value: 'react_node' }
        ]
     });
     config.stack = webRes.stack;
  } else {
      config.stack = 'custom';
  }
  
  return config;
}
