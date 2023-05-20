import { useEffect } from 'react';
import grapesjs from 'grapesjs';
import gsWebpage from 'grapesjs-preset-webpage';
import 'grapesjs/dist/css/grapes.min.css';

export const Editor = () => {
  useEffect(() => {
    grapesjs.init({
      container: '#gjs',
      height: '100vh',
      width: 'auto',
      plugins: [gsWebpage],
      storageManager: {
        type: 'local',
        options: {
          local: { key: `gjsProject` },
        },
        autoload: true,
        stepsBeforeSave: 1,
        contentTypeJson: true,
        storeComponents: true,
        storeStyles: true,
        storeHtml: true,
        storeCss: true,
      },
      deviceManager: {
        devices: [
          {
            id: 'desktop',
            name: 'Desktop',
            width: '100%',
          },
          {
            id: 'tablet',
            name: 'Tablet',
            width: '768px',
            widthMedia: '992px',
          },
          {
            id: 'mobilePortrait',
            name: 'Mobile portrait',
            width: '320px',
            widthMedia: '575px',
          },
        ],
      },
      pluginsOpts: {
        gsWebpage: {
          blocksBasicOpts: {
            flexGrid: 1,
          },
          blocks: [
            'link-block',
            'quote',
            'text-basic',
            'column1',
            'column2',
            'column3',
            'column3-7',
            'text',
            'link',
            'image',
            'video',
          ],
        },
      },
    });
  }, []);

  return (
    <>
      <div id='gjs'> </div>
    </>
  );
};
